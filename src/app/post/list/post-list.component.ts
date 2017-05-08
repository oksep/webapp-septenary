import {Component, OnInit} from "@angular/core";
import {PostService} from "../post.service";
import {Post} from "../../model/post";

import {ActivatedRoute, ActivatedRouteSnapshot, Router, RouterState, RouterStateSnapshot} from "@angular/router";

@Component({
    selector: 'app-post-list',
    templateUrl: './post-list.component.html',
    styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {
    heroes = [
        {name: 'AAA'},
        {name: 'AAA'}
    ];

    posts: Post[];

    msg: object = null;

    constructor(private postService: PostService,
                private router: Router,
                public activeRoute: ActivatedRoute) {
    }

    ngOnInit() {

        let activatedRouteSnapshot: ActivatedRouteSnapshot = this.activeRoute.snapshot;
        let routerState: RouterState = this.router.routerState;
        let routerStateSnapshot: RouterStateSnapshot = routerState.snapshot;

        console.log('111', activatedRouteSnapshot);
        console.log('222', routerState);
        console.log('333', routerStateSnapshot);

        this.activeRoute.params.subscribe(params => {
            let page = params.page || 1;
            this.postService.getPosts(page).subscribe(result => {
                console.log('Posts:', result);
                this.posts = result.data.list
            });
        });
    }


    get message() {
        return JSON.stringify(this.msg)
    }

}
