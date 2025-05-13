import { User } from "@prisma/client";
import { Mapper } from "./mapper.core";
import { UserEntity, UserType } from "../../domain/entities/user.entity";
import { RoleEnum } from "../../domain/enum/role.enum";

export type UserDto = {
    id: string;
    username: string;
    firstName: string;
    lastName: string;
    role: string;
    createdAt: string;
    updatedAt: string;
};

class UserMapper implements Mapper<User, UserEntity> {
    
    public toDto(input: User): UserEntity {
        return UserEntity.with({
            id: input.id,
            username: input.username,
            firstName: input.name,
            lastName: input.lastname,
            role: input.role as RoleEnum,
            password: input.password,
            createdAt: input.createdAt,
            updatedAt: input.updatedAt
        })
    };

    public toEntity(input: UserType): User {
        return {
            id: input.id,
            username: input.username,
            name: input.firstName,
            lastname: input.lastName,
            role: input.role,
            password: input.password,
            createdAt: input.createdAt,
            updatedAt: input.updatedAt
        };
    };

    public toOutputDto(input: UserEntity): UserDto {
        return {
            id: input.id,
            username: input.username,
            firstName: input.firstName,
            lastName: input.lastName,
            role: input.role,
            createdAt: input.createdAt.toISOString(),
            updatedAt: input.updatedAt.toISOString()
        }
    };
};

export default new UserMapper();