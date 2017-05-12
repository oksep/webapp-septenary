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

    static failed(message: string) {
        return new Result(false, null, {message: message});
    }
}