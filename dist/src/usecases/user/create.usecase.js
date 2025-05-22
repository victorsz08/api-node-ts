"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUserUsecase = void 0;
const user_entity_1 = require("../../domain/entities/user.entity");
class CreateUserUsecase {
    constructor(userInterface) {
        this.userInterface = userInterface;
    }
    ;
    static build(userInterface) {
        return new CreateUserUsecase(userInterface);
    }
    ;
    async execute(input) {
        const { username, firstName, lastName, password } = input;
        const user = await user_entity_1.UserEntity.build(username, firstName, lastName, password);
        await this.userInterface.create(user);
        return;
    }
    ;
}
exports.CreateUserUsecase = CreateUserUsecase;
;
