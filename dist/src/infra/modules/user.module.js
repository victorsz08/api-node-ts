"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const delete_usecase_1 = require("./../../usecases/user/delete.usecase");
const udpate_password_usecase_1 = require("./../../usecases/user/udpate-password.usecase");
const prisma_service_1 = require("../../package/prisma/prisma.service");
const create_usecase_1 = require("../../usecases/user/create.usecase");
const find_usecase_1 = require("../../usecases/user/find.usecase");
const list_usecase_1 = require("../../usecases/user/list.usecase");
const update_usecase_1 = require("../../usecases/user/update.usecase");
const user_repository_prisma_1 = require("../repositories/user.repository.prisma");
const create_route_express_1 = require("../api/express/routes/user/create.route.express");
const find_route_express_1 = require("../api/express/routes/user/find.route.express");
const list_route_express_1 = require("../api/express/routes/user/list.route.express");
const update_route_express_1 = require("../api/express/routes/user/update.route.express");
const update_password_route_express_1 = require("../api/express/routes/user/update-password.route.express");
const delete_route_express_1 = require("../api/express/routes/user/delete.route.express");
// repository
const repository = user_repository_prisma_1.UserRepository.build(prisma_service_1.prisma);
// usecases
const createUserUsecase = create_usecase_1.CreateUserUsecase.build(repository);
const findUserUsecase = find_usecase_1.FindUserUsecase.build(repository);
const listUserUsecase = list_usecase_1.ListUserUsecase.build(repository);
const updateUserUsecase = update_usecase_1.UpdateUserUsecase.build(repository);
const updatePassworsUserUsecase = udpate_password_usecase_1.UpdatePasswordUserUsecase.build(repository);
const deleteUserUsecase = delete_usecase_1.DeleteUserUsecase.build(repository);
// routes
const createUserRoute = create_route_express_1.CreateUserRoute.build(createUserUsecase);
const findUserRoute = find_route_express_1.FindUserRoute.build(findUserUsecase);
const listUserRoute = list_route_express_1.ListUserRoute.build(listUserUsecase);
const updateUserRoute = update_route_express_1.UpdateUserRoute.build(updateUserUsecase);
const updatePasswordUserRoute = update_password_route_express_1.UpdatePasswordUserRoute.build(updatePassworsUserUsecase);
const deleteUserRoute = delete_route_express_1.DeleteUserRoute.build(deleteUserUsecase);
exports.userRoutes = [
    createUserRoute,
    findUserRoute,
    listUserRoute,
    updatePasswordUserRoute,
    updateUserRoute,
    deleteUserRoute
];
