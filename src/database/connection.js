import { config } from "dotenv";
import { connect } from "mongoose";

config()

export const connection = await connect(process.env.MONGO_URI)