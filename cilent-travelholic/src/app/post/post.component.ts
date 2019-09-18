import { Component, OnInit } from '@angular/core';
import { PostService } from '../services/post-service';

@Component({
    selector: 'app-post',
    templateUrl: './post.component.html',
    styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

    posts: any

    constructor(private postService: PostService) {
        this.postService.getPosts().subscribe(data => {
            this.posts = data
            console.log("postovi", this.posts)

        });
    }

    ngOnInit() {
    }

}
