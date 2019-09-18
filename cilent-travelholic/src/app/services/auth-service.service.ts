import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor() { }

  autheticate(username){
    sessionStorage.setItem('username',username);
  }
}
