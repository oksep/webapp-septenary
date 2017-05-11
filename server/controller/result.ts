// 接口响应体
export default class Result {
    success: boolean;
    error: any;
    data: any;

    constructor(success, data, error) {
        this.success = success;
        this.error = error;
        this.data = data;
    }

    static success(data: object) {
        return new Result(true, data, null);
    }

    static failed(data: object) {
        return new Result(false, null, data);
    }
}