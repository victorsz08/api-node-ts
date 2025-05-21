import { prisma } from "../../package/prisma/prisma.service";
import { CreateOrderUsecase } from "../../usecases/order/create.usecase";
import { DeleteOrderUsecase } from "../../usecases/order/delete.usecase";
import { FindOrderUsecase } from "../../usecases/order/find.usecase";
import { ListOrderUsecase } from "../../usecases/order/list.usecase";
import { UpdateSchedulingOrderUsecase } from "../../usecases/order/update-scheduling.usecase";
import { UpdateStatusOrderUsecase } from "../../usecases/order/update-status.usecase";
import { UpdateOrderUsecase } from "../../usecases/order/update.usecase";
import { CreateOrderRoute } from "../api/express/routes/order/create.route.express";
import { DeleteOrderRoute } from "../api/express/routes/order/delete.route.express";
import { FindOrderRoute } from "../api/express/routes/order/find.route.express";
import { ListOrderRoute } from "../api/express/routes/order/list.route.express";
import { UpdateSchedulingOrderRoute } from "../api/express/routes/order/update-scheduling.route.express";
import { UpdateStatusOrderRoute } from "../api/express/routes/order/update-status.route.express";
import { UpdateOrderRoute } from "../api/express/routes/order/update.route.express";
import { OrderRepository } from "../repositories/order.repository";





const repository = OrderRepository.build(prisma);

// usecases
const createOrderUsecase = CreateOrderUsecase.build(repository);
const findOrderUsecase = FindOrderUsecase.build(repository);
const listOrderUsecase = ListOrderUsecase.build(repository);
const updateOrderUsecase = UpdateOrderUsecase.build(repository);
const updateStatusOrderUsecase = UpdateStatusOrderUsecase.build(repository);
const updateSchedulingOrderUsecase = UpdateSchedulingOrderUsecase.build(repository);
const deleteOrderUsecase = DeleteOrderUsecase.build(repository);

// routes
const createOrderRoute = CreateOrderRoute.build(createOrderUsecase);
const findOrderRoute = FindOrderRoute.build(findOrderUsecase);
const listOrderRoute = ListOrderRoute.build(listOrderUsecase);
const updateOrderRoute = UpdateOrderRoute.build(updateOrderUsecase);
const updateStatusOrderRoute = UpdateStatusOrderRoute.build(updateStatusOrderUsecase);
const updateSchedulingOrderRoute = UpdateSchedulingOrderRoute.build(updateSchedulingOrderUsecase);
const deleteOrderRoute = DeleteOrderRoute.build(deleteOrderUsecase);

export const orderRoutes = [
    createOrderRoute,
    findOrderRoute,
    updateOrderRoute,
    listOrderRoute,
    updateSchedulingOrderRoute,
    updateStatusOrderRoute,
    deleteOrderRoute
];