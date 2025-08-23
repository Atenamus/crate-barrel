import { Schema, model } from "mongoose";

const orderSchema = new Schema(
  {
    userID: {
      type: Schema.Types.ObjectId, ref: 'user'
    },
    products: Array,
    date_of_purchase: String,
  },
);

const orderModel = model("order", orderSchema);

export default orderModel;
