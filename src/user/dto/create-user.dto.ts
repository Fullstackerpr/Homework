import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    description: "Ismingizni kiriting",
    example: "John Doe"
})
  name: string;

  @ApiProperty({
    description: "Emailingizni kiriting",
    example: "JohnDoe@gmail.com"
  })
  email: string;

  @ApiProperty({
    description: "Yoshingizni kiriting",
    example: "12"
  })
  age: number;
}
