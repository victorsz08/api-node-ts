"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderEntity = void 0;
const generate_id_pattern_1 = __importDefault(require("../../patterns/libs/generate-id.pattern"));
const status_enum_1 = require("../enum/status.enum");
class OrderEntity {
    constructor(props) {
        this.props = props;
    }
    ;
    static build(number, local, schedulingDate, schedulingTime, price, contact, userId) {
        return new OrderEntity({
            id: generate_id_pattern_1.default.generate(),
            number,
            local,
            schedulingDate,
            schedulingTime,
            price,
            status: status_enum_1.StatusEnum.PENDING,
            contact,
            userId,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
    }
    ;
    static with(props) {
        return new OrderEntity(props);
    }
    ;
    get id() {
        return this.props.id;
    }
    ;
    get number() {
        return this.props.number;
    }
    ;
    get local() {
        return this.props.local;
    }
    ;
    get schedulingDate() {
        return this.props.schedulingDate;
    }
    ;
    get schedulingTime() {
        return this.props.schedulingTime;
    }
    ;
    get price() {
        return this.props.price;
    }
    ;
    get status() {
        return this.props.status;
    }
    ;
    get contact() {
        return this.props.contact;
    }
    ;
    get userId() {
        return this.props.userId;
    }
    ;
    get createdAt() {
        return this.props.createdAt;
    }
    ;
    get updatedAt() {
        return this.props.updatedAt;
    }
    ;
}
exports.OrderEntity = OrderEntity;
;
