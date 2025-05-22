"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_entity_1 = require("../../domain/entities/user.entity");
const transform_date_1 = __importDefault(require("../utils/transform-date"));
class UserMapper {
    toDto(user) {
        return {
            id: user.id,
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            role: user.role,
            createdAt: transform_date_1.default.toString(user.createdAt),
            updatedAt: transform_date_1.default.toString(user.updatedAt)
        };
    }
    ;
    toEntity(user) {
        return user_entity_1.UserEntity.with({
            id: user.id,
            username: user.username,
            firstName: user.name,
            lastName: user.lastname,
            role: user.role,
            password: user.password,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
        });
    }
    ;
}
;
exports.default = new UserMapper();
