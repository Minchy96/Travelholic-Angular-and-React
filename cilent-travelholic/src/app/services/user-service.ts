import { Injectable } from '@angular/core';
import { UserDto } from '../model/user-dto';
import { HttpClient, HttpEvent, HttpRequest, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { LoginDto } from '../model/login-dto';
import { Observable } from 'rxjs';
import { EmailDto } from '../model/email-dto';

@Injectable({
    providedIn: 'root'
})
export class UserService {


    constructor(private http: HttpClient) {
        
    }

    saveUser(userDto: UserDto) {
        let url = environment.backendUrl + "user/save";
        return this.http.post<any>(url, userDto);

    }

    getAllUsers(){
        let url = environment.backendUrl + "user/all";
        return new Observable((o: any) => {
            this.http.get(url,{}).subscribe((data) => {
                o.next(data);
                return o.complete();
            }, (err) => {
                return o.console.error(err);

            });
        });
    }

    getUsers(name){
        let url = environment.backendUrl + "user/all/"+name;
        return new Observable((o: any) => {
            this.http.get(url,{}).subscribe((data) => {
                o.next(data);
                return o.complete();
            }, (err) => {
                return o.console.error(err);

            });
        });
    }

    loginUser(loginDto: LoginDto) {
        let url = environment.backendUrl + "user/login";
        return new Observable((o: any) => {
            this.http.post(url, loginDto).subscribe((data) => {
                o.next(data);
                return o.complete();
            }, (err) => {
                return o.console.error(err);

            });
        });
    }

    getUserByUsername(username) {
        let url = environment.backendUrl + "user/get/" + username;
        return new Observable((o: any) => {
            this.http.get(url, {}).subscribe((data) => {
                o.next(data);
                return o.complete();
            }, (err) => {
                return o.console.error(err);

            });
        });

    }

    getActiveUser() {
        let url = environment.backendUrl + "user/get/" + sessionStorage.getItem('username');
        return new Observable((o: any) => {
            this.http.get(url, {}).subscribe((data) => {
                o.next(data);
                return o.complete();
            }, (err) => {
                return o.console.error(err);

            });
        });
    }

    editUser(userDto: UserDto) {
        let url = environment.backendUrl + "user/update";
        return new Observable((o: any) => {
            this.http.post(url, userDto).subscribe((data) => {
                o.next(data);
                return o.complete();
            }, (err) => {
                return o.console.error(err);

            });
        });
    }

    tryUsername(username) {
        let url = environment.backendUrl + "user/try/" + username;
        return new Observable((o: any) => {
            this.http.get(url, {}).subscribe((data) => {
                o.next(data);
                return o.complete();
            }, (err) => {
                return o.console.error(err);

            });
        });
    }

    pushFileToStorage(file: FormData, username): Observable<HttpEvent<{}>> {
        
        let url = environment.backendUrl+"user/uploadImage/"+username;
        const req = new HttpRequest('POST', url, file, {
          reportProgress: true,
          responseType: 'text'
        });
     
        return this.http.request(req);
      }


   getImage(image) : Observable<any>{
        let url = environment.backendUrl + "user/getImage/" + image;

        return this.http.get(url, {
            observe: 'body',
            responseType: 'text',
        });
    } 

    sendEmail(emailDto : EmailDto) {
        let url = environment.backendUrl + "user/sendEmail/";
        return new Observable((o: any) => {
            this.http.post(url, emailDto).subscribe((data) => {
                o.next(data);
                return o.complete();
            }, (err) => {
                return o.console.error(err);

            });
        });
    }

}
