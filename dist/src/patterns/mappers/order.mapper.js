"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const order_entity_1 = require("../../domain/entities/order.entity");
const transform_date_1 = __importDefault(require("../utils/transform-date"));
class OrderMapper {
    toDto(order) {
        return {
            id: order.id,
            number: order.number,
            local: order.local,
            schedulingDate: transform_date_1.default.toString(order.schedulingDate),
            schedulingTime: order.schedulingTime,
            status: order.status,
            contact: order.contact,
            price: order.price,
            createdAt: transform_date_1.default.toString(order.createdAt),
            updatedAt: transform_date_1.default.toString(order.updatedAt)
        };
    }
    ;
    toEntity(order) {
        return order_entity_1.OrderEntity.with({
            id: order.id,
            number: order.number,
            local: order.local,
            schedulingDate: order.installationDate,
            schedulingTime: order.installationHour,
            status: order.status,
            price: order.price,
            contact: order.phone,
            userId: order.userId,
            createdAt: order.createdAt,
            updatedAt: order.updatedAt
        });
    }
    ;
}
;
exports.default = new OrderMapper();
