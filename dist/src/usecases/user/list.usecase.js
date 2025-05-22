"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListUserUsecase = void 0;
const user_mapper_1 = __importDefault(require("../../patterns/mappers/user.mapper"));
class ListUserUsecase {
    constructor(userInterface) {
        this.userInterface = userInterface;
    }
    ;
    static build(userInterface) {
        return new ListUserUsecase(userInterface);
    }
    ;
    async execute(input) {
        const { page, limit, search } = input;
        const data = await this.userInterface.list({ page, limit, search });
        const output = this.present(data);
        return output;
    }
    ;
    present(data) {
        return {
            users: data.users.map((user) => {
                return user_mapper_1.default.toDto(user);
            }),
            total: data.total,
            pages: data.pages,
            limit: data.limit
        };
    }
    ;
}
exports.ListUserUsecase = ListUserUsecase;
;
