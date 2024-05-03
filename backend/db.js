import { connect } from "mongoose";

const connection = connect("mongodb://127.0.0.1:27017/crate&barrel");

export default connection;
