"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoutes = void 0;
const prisma_service_1 = require("../../package/prisma/prisma.service");
const login_usecase_1 = require("../../usecases/auth/login.usecase");
const login_route_express_1 = require("../api/express/routes/auth/login.route.express");
const logout_route_express_1 = require("../api/express/routes/auth/logout.route.express");
const session_route_express_1 = require("../api/express/routes/auth/session.route.express");
const auth_repository_1 = require("../repositories/auth.repository");
const authRepository = auth_repository_1.AuthRepository.build(prisma_service_1.prisma);
const authLoginUsecase = login_usecase_1.AuthLoginUsecase.build(authRepository);
const authLoginRoute = login_route_express_1.AuthLoginRoute.build(authLoginUsecase);
const authSessionRoute = session_route_express_1.AuthSessionRoute.build();
const authLogoutRoute = logout_route_express_1.AuthLogoutRoute.build();
exports.authRoutes = [
    authLoginRoute,
    authSessionRoute,
    authLogoutRoute
];
