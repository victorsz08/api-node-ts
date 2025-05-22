"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserEntity = void 0;
const generate_hash_pattern_1 = __importDefault(require("../../patterns/libs/generate-hash.pattern"));
const generate_id_pattern_1 = __importDefault(require("../../patterns/libs/generate-id.pattern"));
const role_enum_1 = require("../enum/role.enum");
class UserEntity {
    constructor(props) {
        this.props = props;
    }
    ;
    static async build(username, firstName, lastName, password) {
        return new UserEntity({
            id: generate_id_pattern_1.default.generate(),
            username,
            firstName,
            lastName,
            role: role_enum_1.RoleEnum.USER,
            password: await generate_hash_pattern_1.default.generate(password),
            createdAt: new Date(),
            updatedAt: new Date()
        });
    }
    ;
    static with(props) {
        return new UserEntity(props);
    }
    ;
    get id() {
        return this.props.id;
    }
    ;
    get username() {
        return this.props.username;
    }
    ;
    get firstName() {
        return this.props.firstName;
    }
    ;
    get lastName() {
        return this.props.lastName;
    }
    ;
    get role() {
        return this.props.role;
    }
    ;
    get password() {
        return this.props.password;
    }
    ;
    get createdAt() {
        return this.props.createdAt;
    }
    ;
    get updatedAt() {
        return this.props.updatedAt;
    }
    ;
}
exports.UserEntity = UserEntity;
;
