import mongoose from "../db/dbconnection";

export function toObjectId(id: string) {
    return mongoose.Types.ObjectId.createFromHexString(id);
}