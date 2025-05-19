import { DeleteUserUsecase } from './../../usecases/user/delete.usecase';
import { UpdatePasswordUserUsecase } from './../../usecases/user/udpate-password.usecase';
import { prisma } from "../../package/prisma/prisma.service";
import { CreateUserUsecase } from "../../usecases/user/create.usecase";
import { FindUserUsecase } from "../../usecases/user/find.usecase";
import { ListUserUsecase } from "../../usecases/user/list.usecase";
import { UpdateUserUsecase } from "../../usecases/user/update.usecase";
import { Route } from "../api/express/routes/route.express";
import { UserRepository } from "../repositories/user.repository.prisma";
import { CreateUserRoute } from '../api/express/routes/user/create.route.express';
import { FindUserRoute } from '../api/express/routes/user/find.route.express';
import { ListUserRoute } from '../api/express/routes/user/list.route.express';
import { UpdateUserRoute } from '../api/express/routes/user/update.route.express';
import { UpdatePasswordUserRoute } from '../api/express/routes/user/update-password.route.express';
import { DeleteUserRoute } from '../api/express/routes/user/delete.route.express';


    // repository
    const repository = UserRepository.build(prisma);

    // usecases
    const createUserUsecase = CreateUserUsecase.build(repository);
    const findUserUsecase = FindUserUsecase.build(repository);
    const listUserUsecase = ListUserUsecase.build(repository);
    const updateUserUsecase = UpdateUserUsecase.build(repository);
    const updatePassworsUserUsecase = UpdatePasswordUserUsecase.build(repository);
    const deleteUserUsecase = DeleteUserUsecase.build(repository);

    // routes
    const createUserRoute = CreateUserRoute.build(createUserUsecase);
    const findUserRoute = FindUserRoute.build(findUserUsecase);
    const listUserRoute = ListUserRoute.build(listUserUsecase);
    const updateUserRoute = UpdateUserRoute.build(updateUserUsecase);
    const updatePasswordUserRoute = UpdatePasswordUserRoute.build(updatePassworsUserUsecase);
    const deleteUserRoute = DeleteUserRoute.build(deleteUserUsecase);

    export const userRoutes = [
        createUserRoute,
        findUserRoute,
        listUserRoute,
        updatePasswordUserRoute,
        updateUserRoute,
        deleteUserRoute
    ];