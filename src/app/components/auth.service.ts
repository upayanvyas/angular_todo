import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public accessTokenId: any;
  public userData: any;
  public uId: any;

  constructor() { }

  setLocalStorage(data: { success: { token: any; }; user: { id: any; }; }) {
    // console.log('setLocalStorage: ', data)
    this.accessTokenId = data.success.token;
    this.userData = JSON.stringify(data.user);
    this.uId = data.user.id;
  }

  save() {
    sessionStorage.setItem('accessTokenId', this.accessTokenId);
    sessionStorage.setItem('userData', this.userData);
    sessionStorage.setItem('uId', this.uId);
  }

  userParse() {
    if (sessionStorage['userData']) {
      this.userData = JSON.parse(sessionStorage['userData']);
    }
  }
}
