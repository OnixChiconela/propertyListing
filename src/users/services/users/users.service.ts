import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateUserDto } from 'src/users/dtos/createUser.dto';
import * as bcrypt from 'bcrypt'
import { UpdateUserDto } from 'src/users/dtos/updateUser.dto';

@Injectable()
export class UsersService {
    constructor(
        private readonly prisma: PrismaClient,
    ) {}

    //create new user in DB
    async createUser(createUserDto: CreateUserDto) {
        try {
            const { email } = createUserDto

            const existingUser = await this.prisma.user.findFirst({
                where: {
                    email
                }
            })
            if (existingUser) {
                throw new Error("email is already in use")
            }
            const hashedPassword = await bcrypt.hash(createUserDto.hashedPassword, 10)
            const newUser = await this.prisma.user.create({
                data: {
                    ...createUserDto,
                    hashedPassword: hashedPassword
                }
            })
            console.log("new User: ", newUser)
            return newUser
        } catch (error) {
            throw new Error(error)
        }
    }

    findMany() {
        try {
            return this.prisma.user.findMany()
        } catch (error) {
            console.log("Something went wrong: ")
            throw new Error(error)
        }
    }
    //
    async findOne(email: string) {
        try {
            const user = await this.prisma.user.findUnique({ where: { email: email } })

            //-------------------
            if (!user) {
                return null
            }

            return user;
        } catch (error) {
            console.log(" Unable to find user")
            throw new Error(error)
        }
    }

    async updateUser(updateUserDto: UpdateUserDto) {
        const { email, firstName, lastName, birthDate } = updateUserDto
        try {
            const user = await this.prisma.user.update({
                where: {
                    email
                },
                data: {
                    ...updateUserDto
                }
            })

            return user
        } catch (error) {
            console.log("User wasn't updated")
        }
    }

    async deleteUser(id: string) {
        try {
            const user = await this.prisma.user.delete({
                where: {
                    id
                }
            })

            return user
        } catch (error) {
            console.log(error)
        }
    }

}
