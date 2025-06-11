"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderRepository = void 0;
const http_exception_1 = require("../../package/http-exceptions/http-exception");
const http_status_1 = require("../../package/http-exceptions/http-status");
const order_mapper_1 = __importDefault(require("../../patterns/mappers/order.mapper"));
class OrderRepository {
    constructor(repository) {
        this.repository = repository;
    }
    ;
    static build(repository) {
        return new OrderRepository(repository);
    }
    ;
    async create(order) {
        const { id, number, local, schedulingDate, schedulingTime, status, contact, price, userId, createdAt, updatedAt } = order;
        const user = await this.repository.user.findUnique({ where: { id: userId } });
        if (!user) {
            throw new http_exception_1.HttpException("usuário não localizado", http_status_1.HttpStatus.BAD_REQUEST);
        }
        ;
        await this.repository.contract.create({
            data: {
                id,
                number,
                local,
                installationDate: schedulingDate,
                installationHour: schedulingTime,
                products: [""],
                status: status,
                price,
                phone: contact,
                user: { connect: { id: userId } },
                createdAt,
                updatedAt
            }
        });
        return;
    }
    ;
    async find(id) {
        const order = await this.repository.contract.findUnique({ where: { id } });
        if (!order) {
            throw new http_exception_1.HttpException("pedido não localizado com esse id", http_status_1.HttpStatus.NOT_FOUND);
        }
        ;
        const output = order_mapper_1.default.toEntity(order);
        return output;
    }
    ;
    async list(query) {
        const { page, limit, userId, schedulingDateIn, schedulingDateOut, createdDateIn, createdDateOut, status } = query;
        const queryArgs = {
            where: {
                user: { id: userId }
            },
            take: limit,
            skip: (page - 1) * limit,
            orderBy: {
                installationDate: "desc"
            }
        };
        const countArgs = {
            where: {
                user: { id: userId }
            }
        };
        if (createdDateIn && createdDateOut) {
            queryArgs.where = {
                ...queryArgs.where,
                createdAt: {
                    gte: createdDateIn,
                    lte: createdDateOut
                }
            };
            countArgs.where = {
                ...countArgs.where,
                createdAt: {
                    gte: createdDateIn,
                    lte: createdDateOut
                }
            };
        }
        ;
        if (schedulingDateIn && schedulingDateOut) {
            queryArgs.where = {
                ...queryArgs.where,
                installationDate: {
                    gte: schedulingDateIn,
                    lte: schedulingDateOut
                }
            };
            countArgs.where = {
                ...countArgs.where,
                installationDate: {
                    gte: schedulingDateIn,
                    lte: schedulingDateOut
                }
            };
        }
        ;
        if (status) {
            queryArgs.where = {
                ...queryArgs.where,
                status: status
            };
            countArgs.where = {
                ...countArgs.where,
                status: status
            };
        }
        ;
        const [orders, total] = await this.repository.$transaction([
            this.repository.contract.findMany(queryArgs),
            this.repository.contract.count(countArgs)
        ]);
        const orderList = orders.map((order) => {
            return order_mapper_1.default.toEntity(order);
        });
        const pages = Math.ceil(total / limit);
        return {
            orders: orderList,
            total,
            pages,
            limit
        };
    }
    ;
    async updateStatus(id, status, updatedAt) {
        await this.find(id);
        await this.repository.contract.update({
            where: { id },
            data: {
                status,
                updatedAt
            }
        });
        return;
    }
    ;
    async updateScheduling(id, schedulingDate, schedulingTime, updatedAt) {
        await this.find(id);
        await this.repository.contract.update({
            where: { id },
            data: {
                installationDate: schedulingDate,
                installationHour: schedulingTime,
                updatedAt
            }
        });
        return;
    }
    ;
    async update(id, number, local, price, contact, updatedAt) {
        await this.find(id);
        await this.repository.contract.update({
            where: { id },
            data: {
                number,
                local,
                phone: contact,
                price,
                updatedAt
            }
        });
        return;
    }
    ;
    async delete(id) {
        await this.find(id);
        await this.repository.contract.delete({
            where: { id }
        });
        return;
    }
    ;
}
exports.OrderRepository = OrderRepository;
;
