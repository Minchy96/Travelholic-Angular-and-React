import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user-service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-about',
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

    otherUsername: string
    username: string
    user: any

    constructor(private userService: UserService, private router: Router, private route: ActivatedRoute) {
        this.username = sessionStorage.getItem('username')
        if (this.router.url != "/profile")
            this.otherUsername = this.route.snapshot.paramMap.get('username');
        else
            this.otherUsername = this.username

        console.log(this.otherUsername)

        this.userService.getUserByUsername(this.otherUsername).subscribe(data => {
            this.user = data
            console.log(this.user)
        })
    }

    ngOnInit() {
    }

   
}
