import { UserService } from '../services/user-service';
import { FormGroup, FormControl } from '@angular/forms';
import { PostDto } from '../model/post-dto';
import { PostService } from '../services/post-service';
import { Router, ActivatedRoute } from '@angular/router';
import { EmailDto } from '../model/email-dto';

import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

    username: string
    viewProfile: string
    seePosts: boolean
    about: boolean
    editProfile: boolean
    favourite: boolean
    postDto: PostDto = new PostDto()
    user: any
    image: any
    selectedImage: File
    postImages: Array<File> = new Array()
    post: any
    emailDto: EmailDto
    priviewImages: any[] = []
    imageSrc: any

    newPostForm = new FormGroup({
        title: new FormControl(),
        description: new FormControl(),
        amount: new FormControl(),
        start: new FormControl(),
        end: new FormControl(),
        city: new FormControl(),
        country: new FormControl(),
    })

    emailForm = new FormGroup({
        text: new FormControl(),
    })


    constructor(private userService: UserService, private postService: PostService, private router: Router,
        private route: ActivatedRoute) {
        this.username = sessionStorage.getItem('username')
        this.viewProfile = this.route.snapshot.paramMap.get('username');

        this.userService.getUserByUsername(this.viewProfile).subscribe(data => {
            this.user = data
            console.log(this.user)
            if (this.user.imageName != null) {
                this.userService.getImage(this.user.imageName).subscribe(data => {
                    this.image = data
                    console.log(data)
                })
            }
        })

        console.log(this.router.url)

        this.about = true;
        this.seePosts = false;
        this.editProfile = false;
        this.favourite = false;

    }

    ngOnInit() {

    }

    seeAbout() {
   
        this.about = true;
        this.seePosts = false;
        this.editProfile = false;
        this.favourite = false;
    }

    posts() {
        this.about = false;
        this.seePosts = true;
        this.editProfile = false;
        this.favourite = false;
    }

    seeEditProfile() {
        this.about = false;
        this.seePosts = false;
        this.editProfile = true;
        this.favourite = false;
    }

    seeFavourite() {
        this.about = false;
        this.seePosts = false;
        this.editProfile = false;
        this.favourite = true;
    }

    onFileChange(event) {
        this.selectedImage = event.target.files[0];
        this.postImages.push(this.selectedImage)
        console.log(this.postImages)

        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = e => this.imageSrc = reader.result;
        reader.readAsDataURL(file);
        console.log(this.imageSrc)
        this.priviewImages.push(this.imageSrc);
    }

    removeImage(imgIndex) {
        this.postImages.splice(this.postImages.indexOf(imgIndex), 1);
        this.priviewImages.splice(this.priviewImages.indexOf(imgIndex),1);
    }

    addPost() {
        this.postDto.username = this.username
        let startDate = this.newPostForm.get("start").value.year + "-" + this.newPostForm.get("start").value.month + "-" + this.newPostForm.get("start").value.day;
        this.postDto.start = startDate;

        let endDate = this.newPostForm.get("end").value.year + "-" + this.newPostForm.get("end").value.month + "-" + this.newPostForm.get("end").value.day;
        this.postDto.end = endDate;
        this.postDto.city = this.newPostForm.get("city").value;
        this.postDto.country = this.newPostForm.get("country").value;
        this.postDto.title = this.newPostForm.get("title").value;
        this.postDto.description = this.newPostForm.get("description").value;
        this.postDto.amount = this.newPostForm.get("amount").value;

        console.log(this.postDto)
        this.postService.savePost(this.postDto).subscribe(data => {
            console.log(data)
            this.post = data
            if (this.postImages != null) {
                for (let image of this.postImages) {
                    this.postService.pushFileToStorage(image, this.post.id).subscribe(data =>
                        console.log(data));
                }
                this.postImages = new Array()
                this.priviewImages = []
            }
        });
        this.newPostForm.reset();
    }

    sendEmail() {
        this.emailDto = new EmailDto();
        this.emailDto.toUsername = this.viewProfile;
        this.emailDto.text = this.emailForm.get("text").value;
        this.emailDto.fromUsername = sessionStorage.getItem('username');

        this.userService.sendEmail(this.emailDto).subscribe(data => {
            console.log(data)
            this.emailForm.reset()
        })
    }

}
