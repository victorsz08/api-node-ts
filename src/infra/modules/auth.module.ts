import { prisma } from "../../package/prisma/prisma.service";
import { AuthLoginUsecase } from "../../usecases/auth/login.usecase";
import { AuthLoginRoute } from "../api/express/routes/auth/login.route.express";
import { AuthSessionRoute } from "../api/express/routes/auth/session.route.express";
import { AuthRepository } from "../repositories/auth.repository";



const authRepository = AuthRepository.build(prisma);

const authLoginUsecase = AuthLoginUsecase.build(authRepository);


const authLoginRoute = AuthLoginRoute.build(authLoginUsecase);
const authSessionRoute = AuthSessionRoute.build();


export const authRoutes = [
    authLoginRoute,
    authSessionRoute
];