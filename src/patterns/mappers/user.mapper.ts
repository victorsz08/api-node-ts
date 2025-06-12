import { Mapper } from "./mapper.core";
import { UserEntity, UserType } from "../../domain/entities/user.entity";
import { RoleEnum } from "../../domain/enum/role.enum";
import FormartDatePattern from "../utils/generate-date.pattern";
import { User } from "@prisma/client";

export type UserDto = {
    id: string;
    username: string;
    firstName: string;
    lastName: string;
    role: string;
    createdAt: string;
    updatedAt: string;
};

class UserMapper implements Mapper<UserEntity, UserDto> {
    
    public toDto(user: UserEntity): UserDto {
        return {
            id: user.id,
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            role: user.role,
            createdAt: FormartDatePattern.toString(user.createdAt),
            updatedAt: FormartDatePattern.toString(user.updatedAt)
        }
    };

    public toEntity(user: User): UserEntity {
        return UserEntity.with({
            id: user.id,
            username: user.username,
            firstName: user.name,
            lastName: user.lastname,
            role: user.role as RoleEnum,
            password: user.password,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
        });
    };
};

export default new UserMapper();