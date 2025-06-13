import moment from "moment-timezone";
import generateIdPattern from "../../patterns/libs/generate-id.pattern";
import { StatusEnum } from "../enum/status.enum";
import generateDatePattern from "../../patterns/utils/generate-date.pattern";



export type OrderType = {
    id: string;
    number: number;
    local: string;
    schedulingDate: Date;
    schedulingTime: string;
    price: number;
    status: string;
    contact: string;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
};

export class OrderEntity {
    private constructor(private readonly props: OrderType) {};

    public static build(
        number: number, 
        local: string, 
        schedulingDate: Date, 
        schedulingTime: string, 
        price: number,  
        contact: string, 
        userId: string
    ) {
        return new OrderEntity({
            id: generateIdPattern.generate(),
            number,
            local,
            schedulingDate: generateDatePattern.parseDate(schedulingDate),
            schedulingTime,
            price,
            status: StatusEnum.PENDING,
            contact,
            userId,
            createdAt: generateDatePattern.generateDate(),
            updatedAt: generateDatePattern.generateDate(),
        });
    };

    public static with(props: OrderType) {
        return new OrderEntity(props);
    };

    public get id() {
        return this.props.id;
    };

    public get number() {
        return this.props.number;
    };

    public get local() {
        return this.props.local;
    };

    public get schedulingDate() {
        return this.props.schedulingDate;
    };

    public get schedulingTime() {
        return this.props.schedulingTime;
    };

    public get price() {
        return this.props.price;
    };

    public get status() {
        return this.props.status;
    };

    public get contact() {
        return this.props.contact;
    };

    public get userId() {
        return this.props.userId;
    };

    public get createdAt() {
        return this.props.createdAt;
    };

    public get updatedAt() {
        return this.props.updatedAt;
    };
};