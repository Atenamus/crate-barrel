import { connect } from "mongoose";

const connection = connect("mongodb://localhost:27017/create&barrel");

export default connection;
