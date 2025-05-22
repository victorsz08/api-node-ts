"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderRoutes = void 0;
const prisma_service_1 = require("../../package/prisma/prisma.service");
const create_usecase_1 = require("../../usecases/order/create.usecase");
const delete_usecase_1 = require("../../usecases/order/delete.usecase");
const find_usecase_1 = require("../../usecases/order/find.usecase");
const list_usecase_1 = require("../../usecases/order/list.usecase");
const update_scheduling_usecase_1 = require("../../usecases/order/update-scheduling.usecase");
const update_status_usecase_1 = require("../../usecases/order/update-status.usecase");
const update_usecase_1 = require("../../usecases/order/update.usecase");
const create_route_express_1 = require("../api/express/routes/order/create.route.express");
const delete_route_express_1 = require("../api/express/routes/order/delete.route.express");
const find_route_express_1 = require("../api/express/routes/order/find.route.express");
const list_route_express_1 = require("../api/express/routes/order/list.route.express");
const update_scheduling_route_express_1 = require("../api/express/routes/order/update-scheduling.route.express");
const update_status_route_express_1 = require("../api/express/routes/order/update-status.route.express");
const update_route_express_1 = require("../api/express/routes/order/update.route.express");
const order_repository_1 = require("../repositories/order.repository");
const repository = order_repository_1.OrderRepository.build(prisma_service_1.prisma);
// usecases
const createOrderUsecase = create_usecase_1.CreateOrderUsecase.build(repository);
const findOrderUsecase = find_usecase_1.FindOrderUsecase.build(repository);
const listOrderUsecase = list_usecase_1.ListOrderUsecase.build(repository);
const updateOrderUsecase = update_usecase_1.UpdateOrderUsecase.build(repository);
const updateStatusOrderUsecase = update_status_usecase_1.UpdateStatusOrderUsecase.build(repository);
const updateSchedulingOrderUsecase = update_scheduling_usecase_1.UpdateSchedulingOrderUsecase.build(repository);
const deleteOrderUsecase = delete_usecase_1.DeleteOrderUsecase.build(repository);
// routes
const createOrderRoute = create_route_express_1.CreateOrderRoute.build(createOrderUsecase);
const findOrderRoute = find_route_express_1.FindOrderRoute.build(findOrderUsecase);
const listOrderRoute = list_route_express_1.ListOrderRoute.build(listOrderUsecase);
const updateOrderRoute = update_route_express_1.UpdateOrderRoute.build(updateOrderUsecase);
const updateStatusOrderRoute = update_status_route_express_1.UpdateStatusOrderRoute.build(updateStatusOrderUsecase);
const updateSchedulingOrderRoute = update_scheduling_route_express_1.UpdateSchedulingOrderRoute.build(updateSchedulingOrderUsecase);
const deleteOrderRoute = delete_route_express_1.DeleteOrderRoute.build(deleteOrderUsecase);
exports.orderRoutes = [
    createOrderRoute,
    findOrderRoute,
    updateOrderRoute,
    listOrderRoute,
    updateSchedulingOrderRoute,
    updateStatusOrderRoute,
    deleteOrderRoute
];
