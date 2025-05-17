import { Mapper } from "./mapper.core";
import { UserEntity, UserType } from "../../domain/entities/user.entity";
import { RoleEnum } from "../../domain/enum/role.enum";
import FormartDatePattern from "../utils/transform-date";

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
};

export default new UserMapper();