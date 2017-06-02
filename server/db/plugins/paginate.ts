/**
 * 按页查询插件
 *
 * 1.
 * interface IModel extends mongoose.Model<IArticle>, IPaginate {
 *
 * }
 *
 * 2.
 * ArticleSchema.statics.paginate = MongoosePaginate.paginate;
 *
 */
import * as MongoosePaginate from "mongoose-paginate";

export {
    MongoosePaginate
};

/**
 * If specified the callback is called once pagination results are retrieved or when an error has occurred
 */
interface PaginateResult {
    docs: object[]; // - Array of documents
    total: number; //- Total number of documents in collection that match a query
    limit: number; //- Limit that was used
    page?: number; // - Only if specified or default page/offset values were used
    pages?: number; //- Only if page specified or default page/offset values were used
    offset?: number; // - Only if specified or default page/offset values were used
}

interface Options {
    select?: object | String; // - Fields to return (by default returns all fields)
    sort?: object | String; //- Sort order
    populate?: object[] | object | String; // - Paths which should be populated with other documents.
    lean?: boolean; // - Should return plain javascript objects instead of Mongoose documents?
    leanWithId?: boolean; // - If lean and leanWithId are true, adds id field with string representation of _id to every document
    offset?: number; // - Use offset or page to set skip position
    page?: number;
    limit?: number;
}

export interface IPaginate {
    paginate(query: Object,
             options: Options,
             callback?: (err: Error, result?: PaginateResult) => void
    ): Promise<PaginateResult>
}