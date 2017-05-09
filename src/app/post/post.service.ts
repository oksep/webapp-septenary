import {Injectable} from "@angular/core";
import {AuthHttp} from "../auth/angular-jwt.module";
import {Http} from "@angular/http";

@Injectable()
export class PostService {

    constructor(private http: Http, private authHttp: AuthHttp) {
    }

    createPost(post: object) {
        return this.authHttp
            .post('/api/post/create', post)
            .map(response => response.json())
            .map(result => {
                return result;
            });
    }

    getPosts(page: number) {
        return this.http
            .get(`/api/post/page/${page}`)
            .map(response => response.json())
            .map(result => {
                return result;
            });
    }
}
