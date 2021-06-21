import { model, Schema } from "mongoose";

export class OrdersModel {
    constructor (name?: string, numbrOfHoles?: number, savings?: number, size?: number) {
        this.name = name;
        this.numOfHoles = numbrOfHoles;
        this.savings = savings;
        this.size = size;
    };

    name?: string;
    numOfHoles?: number;
    savings?: number;
    size?: number;
}


const OrdersSchema = new Schema<OrdersModel>({
    name: {
        type: String,
        required: 'An order name is required to create a new order',
    },

    numberOfHoles: {
        type: Number,
        default: 0,
    },
    savings: {
        type: Number,
        default: 0,

    },
    size: {
        type: Number,
        default: 2,
    },
});

export const Orders = model('Orders', OrdersSchema);