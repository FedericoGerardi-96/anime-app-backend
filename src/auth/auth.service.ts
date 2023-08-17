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

import { CreateUserDto, UpdateAuthDto, LoginDto, UserIdDto } from './dto';
import { User } from './entities/user.entity';
import { LoginResponse, RegisterResponse, JwtPayload } from './interfaces';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private _userModel: Model<User>,
    private _jwtService: JwtService,
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
        throw new BadRequestException(`${createUserDto.email} already exists`);
      }
      throw new InternalServerErrorException('Something terrible happen');
    }
  }

  async register(createUserDto: CreateUserDto): Promise<RegisterResponse> {
    const newUser = await this.create(createUserDto);

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

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  async remove(id: number) {
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
