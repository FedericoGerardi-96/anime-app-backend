/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { Model, isValidObjectId } from 'mongoose';

import * as bcryptjs from 'bcryptjs';

import {
  CreateUserDto,
  UpdateAuthDto,
  LoginDto,
  UserIdDto,
  OAuthlogin,
  RegisterUserDto,
} from './dto';
import { User } from './entities/user.entity';
import { LoginResponse, RegisterResponse, JwtPayload } from './interfaces';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { UploadApiErrorResponse, UploadApiResponse } from 'cloudinary';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private _userModel: Model<User>,
    private _jwtService: JwtService,
    private _cloudinary: CloudinaryService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const { password, ...userData } = createUserDto;

      const newUser = new this._userModel({
        password: bcryptjs.hashSync(password, 10),
        ...userData,
      });

      await newUser.save();
      const { password: _, ...user } = newUser.toJSON();

      return user;
    } catch (error: any) {
      if (error.code === 11000) {
        throw new BadRequestException(
          `Email: ${createUserDto.email} already exists`,
        );
      }
      throw new InternalServerErrorException('Something terrible happen');
    }
  }

  async updateUserAvatar(id: string, file: Express.Multer.File) {
    const findUser = await this._userModel.findById(id);

    if (!findUser) {
      throw new BadRequestException(`User with id ${id} not found`);
    }

    const { secure_url } = await this._cloudinary.uploadFile(file);

    const updateUser = await this._userModel.findByIdAndUpdate(id, {
      icon: secure_url,
    });

    await updateUser.save();
    const { password: _, ...user } = updateUser.toJSON();

    return {
      user: user,
      token: this.getJwtToken({ id: user._id }),
    };
  }

  async register(registerUserDto: RegisterUserDto): Promise<RegisterResponse> {
    const newUser = await this.create(registerUserDto);

    if (!newUser) {
      throw new BadRequestException(
        'Something terrible happen to register user',
      );
    }
    return {
      user: newUser,
      token: this.getJwtToken({ id: newUser._id }),
    };
  }

  async login(loginDto: LoginDto): Promise<LoginResponse> {
    const { email, password } = loginDto;

    const findUser = await this._userModel.findOne({ email });

    if (!findUser) {
      throw new UnauthorizedException('Not valid credentials');
    }

    if (!bcryptjs.compareSync(password, findUser.password)) {
      throw new UnauthorizedException('Not valid credentials');
    }

    const { password: _, ...userWithoutPassword } = findUser.toJSON();

    return {
      user: userWithoutPassword,
      token: this.getJwtToken({ id: findUser.id }),
    };
  }

  async oAuthlogin(oAuthlogin: OAuthlogin) {
    const { email, name, icon } = oAuthlogin;

    const findUser = await this._userModel.findOne({ email });

    if (findUser) {
      const { password: _, ...userWithoutPassword } = findUser.toJSON();

      return {
        user: userWithoutPassword,
        token: this.getJwtToken({ id: findUser.id }),
      };
    }

    const newUserRegister = await this.register({
      email,
      name,
      icon,
      password: '@',
    });

    if (!newUserRegister)
      throw new BadRequestException(
        'Something terrible happen to register user',
      );

    const { user, token } = newUserRegister;

    const { password: _, ...userRegisterWithoutPassword } = user.toJSON();
    return {
      user: userRegisterWithoutPassword,
      token: token,
    };
  }

  findAll(): Promise<User[]> {
    return this._userModel.find();
  }

  async findById(id: UserIdDto | string) {
    if (!id) throw new BadRequestException('Id must be sent');

    if (!isValidObjectId(id))
      throw new BadRequestException(`${id} is not valid MongoID`);

    const findUser = await this._userModel.findById(id);

    if (!findUser)
      throw new BadRequestException(`User with id ${id} not found`);

    const { password: _, ...userWithoutPassword } = findUser.toJSON();
    return userWithoutPassword;
  }

  async update(id: string, updateAuthDto: UpdateAuthDto) {
    try {
      const { password, ...userData } = updateAuthDto;

      const updateUser = await this._userModel.findByIdAndUpdate(id, {
        password: bcryptjs.hashSync(password, 10),
        ...userData,
      });

      await updateUser.save();
      const { password: _, ...user } = updateUser.toJSON();

      return user;
    } catch (error: any) {
      throw new InternalServerErrorException('Something terrible happen');
    }
  }

  async remove(id: string) {
    const { deletedCount, acknowledged } = await this._userModel.deleteOne({
      _id: id,
    });
    if (deletedCount === 0 || !acknowledged)
      throw new BadRequestException(`User with id ${id} not found`);

    return;
  }

  getJwtToken(payload: JwtPayload) {
    return this._jwtService.sign(payload);
  }
}
