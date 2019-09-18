import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { CommentDto } from '../model/comment-dto';
import { PostDto } from '../model/post-dto';
import { SearchDto } from '../model/search-dto';


@Injectable({
    providedIn: 'root'
})
export class PostService {

    constructor(private http: HttpClient) {

    }

    getPosts() {
        let url = environment.backendUrl + "post/getAll";
        return new Observable((o: any) => {
            this.http.get(url, {}).subscribe((data) => {
                o.next(data);
                return o.complete();
            }, (err) => {
                return o.console.error(err);

            });
        });
    }

    saveComment(commentDto: CommentDto) {
        let url = environment.backendUrl + "comment/save";
        return new Observable((o: any) => {
            this.http.post(url, commentDto).subscribe((data) => {
                o.next(data);
                return o.complete();
            }, (err) => {
                return o.console.error(err);
            });
        });
    }

    deleteComment(commentId: number) {
        let url = environment.backendUrl + "comment/delete/" + commentId;
        return new Observable((o: any) => {
            this.http.delete(url, {}).subscribe((data) => {
                o.next(data);
                return o.complete();
            }, (err) => {
                return o.console.error(err);
            });
        });
    }

    savePost(postDto: PostDto) {
        let url = environment.backendUrl + "post/save";
        return new Observable((o: any) => {
            this.http.post(url, postDto).subscribe((data) => {
                o.next(data);
                return o.complete();
            }, (err) => {
                return o.console.error(err);
            });
        });
    }

    getUsersPosts(username: String) {
        let url = environment.backendUrl + "post/get/" + username;
        return new Observable((o: any) => {
            this.http.get(url, {}).subscribe((data) => {
                o.next(data);
                return o.complete();
            }, (err) => {
                return o.console.error(err);

            });
        });
    }

    deletePost(postId: number) {
        let url = environment.backendUrl + "post/delete/" + postId;
        return new Observable((o: any) => {
            this.http.delete(url, {}).subscribe((data) => {
                o.next(data);
                return o.complete();
            }, (err) => {
                return o.console.error(err);
            });
        });
    }

    getPostsWithFilters(searchDto: SearchDto) {
        let url = environment.backendUrl + "post/search";
        return new Observable((o: any) => {
            this.http.post(url, searchDto).subscribe((data) => {
                o.next(data);
                return o.complete();
            }, (err) => {
                return o.console.error(err);

            });
        });
    }

    addFavourite(username, postId) {
        let url = environment.backendUrl + "post/favourite/" + username + "/" + postId;
        return new Observable((o: any) => {
            this.http.get(url, {}).subscribe((data) => {
                o.next(data);
                return o.complete();
            }, (err) => {
                return o.console.error(err);

            });
        });
    }

    getFavouritePosts(username) {
        let url = environment.backendUrl + "post/getFavourite/" + username;
        return new Observable((o: any) => {
            this.http.get(url, {}).subscribe((data) => {
                o.next(data);
                return o.complete();
            }, (err) => {
                return o.console.error(err);

            });
        });
    }

    removeFavourite(username, postId) {
        let url = environment.backendUrl + "post/removeFavourite/" + username + "/" + postId;
        return new Observable((o: any) => {
            this.http.get(url, {}).subscribe((data) => {
                o.next(data);
                return o.complete();
            }, (err) => {
                return o.console.error(err);

            });
        });
    }

    pushFileToStorage(file: File, id): Observable<HttpEvent<{}>> {
        console.log(file, "ovo ide u bazu")
        let fd = new FormData()
        fd.append('file', file)
        let url = environment.backendUrl + "post/uploadImage/" + id;
        const req = new HttpRequest('POST', url, fd, {
            reportProgress: true,
            responseType: 'text'
        });

        return this.http.request(req);
    }


    getImage(image): Observable<any> {
        let url = environment.backendUrl + "post/getImage/" + image;

        return this.http.get(url, {
            observe: 'body',
            responseType: 'text',
        });
    }

}
