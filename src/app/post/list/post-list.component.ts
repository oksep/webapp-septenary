import {Component, OnInit} from "@angular/core";
import {PostService} from "../post.service";

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

    constructor(private postService: PostService) {
    }

    ngOnInit() {
        this.postService.test()
    }

}
