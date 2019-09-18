import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post-service';
import { Router, ActivatedRoute } from '@angular/router';
import { CommentDto } from 'src/app/model/comment-dto';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
    selector: 'app-favourite',
    templateUrl: './favourite.component.html',
    styleUrls: ['./favourite.component.scss']
})
export class FavouriteComponent implements OnInit {

    username: string
    posts: any
    otherUsername: string
    deleteSure: number
    commentDto: CommentDto
    postImages : any[]

    commentForm = new FormGroup({
        text: new FormControl(),
    })

    constructor(private postService: PostService, private router: Router, private route: ActivatedRoute) {
        this.username = sessionStorage.getItem("username");
        this.getAllPosts()
        this.username = sessionStorage.getItem('username');
        if (this.router.url != "/profile")
            this.otherUsername = this.route.snapshot.paramMap.get('username');
        else
            this.otherUsername = this.username

        this.deleteSure = -1;
    }

    ngOnInit() {
    }

    getAllPosts() {
        this.postService.getFavouritePosts(this.username).subscribe(data => {
            console.log(data)
            this.posts = data
            this.getImages()
        })
    }

    getImages() {
        this.postImages = []
        let images: any[] = []
        for (let i = 0; i < this.posts.length; i++) {
            let post = this.posts[i]
            this.postImages[i] = []
            for (let j = 0; j < post.photos.length; j++) {
                let photo = post.photos[j]
                this.postService.getImage(photo.name).subscribe(response => {
                    this.postImages[i][j] = response;
                })
                console.log(images)
            }
        }

        console.log("slike", this.postImages)
    }

    addComment(postId: number) {
        this.commentDto = new CommentDto()
        this.commentDto.username = this.username
        this.commentDto.postId = postId
        this.commentDto.text = this.commentForm.get("text").value;

        console.log(this.commentDto)
        this.postService.saveComment(this.commentDto).subscribe(data => {
            console.log(data)
            this.commentForm.get("text").setValue("");
            this.getAllPosts();
        })
    }

    removeComm(commId: number) {
        this.postService.deleteComment(commId).subscribe(data => {
            console.log(data)
            this.getAllPosts()
        })
    }

    removeFavoutire(postId){
        this.postService.removeFavourite(this.username,postId).subscribe( data => {
            console.log(data)
            this.getAllPosts()
        })
    }

}
