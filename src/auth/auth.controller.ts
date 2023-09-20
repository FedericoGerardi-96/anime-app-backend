import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  UploadedFile,
  ParseFilePipe,
  FileTypeValidator,
  MaxFileSizeValidator,
  UseInterceptors,
} from '@nestjs/common';

import { AuthService } from './auth.service';
import {
  CreateUserDto,
  UpdateAuthDto,
  LoginDto,
  RegisterUserDto,
  OAuthlogin,
} from './dto';
import { AuthGuard } from './guards/auth.guard';
import { User } from './entities/user.entity';
import { ParseMongoIdPipe } from 'src/common/pipes/parse-mongo-id.pipe';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.authService.create(createUserDto);
  }

  @Post('/login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post('/OAuthlogin')
  oAuthlogin(@Body() oAuthlogin: OAuthlogin) {
    return this.authService.oAuthlogin(oAuthlogin);
  }

  @Post('/register')
  @UseInterceptors(FilesInterceptor('file'))
  register(@Body() registerUserDto: RegisterUserDto) {
    return this.authService.register(registerUserDto);
  }

  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  @Post('/updateAvatar/:id')
  updateUserAvatar(
    @Param('id', ParseMongoIdPipe) id: string,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new FileTypeValidator({ fileType: '.(png|jpeg|jpg)' }),
          new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 4 }),
        ],
        fileIsRequired: true,
      }),
    )
    file: Express.Multer.File,
  ) {
    return this.authService.updateUserAvatar(id, file);
  }

  @UseGuards(AuthGuard)
  @Get()
  findAll() {
    return this.authService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get('/user/:id')
  findById(@Param('id', ParseMongoIdPipe) id: string) {
    console.log('oAuthlogin');
    return this.authService.findById(id);
  }

  @UseGuards(AuthGuard)
  @Get('/check-token')
  checkToken(@Request() req: Request) {
    const user = req['user'] as User;

    return {
      user,
      token: this.authService.getJwtToken({ id: user._id }),
    };
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
    return this.authService.update(id, updateAuthDto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authService.remove(id);
  }
}
