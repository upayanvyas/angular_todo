import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/http.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user: any = {
    email: 'test@gmail.com',
    password: 'test1234'
  }

  constructor(private router: Router, private http: HttpService, private authService: AuthService) { }

  ngOnInit(): void {
  }

  submitForm(user: any) {
    // console.log('submit: ', user)
    // user['id'] = '1' 
    this.http.post('login', user).subscribe(res => {
      // console.log('login success: ', res)

      let userObj = {
        success: { token: 'JFJd9ijomf9o9p4Rt54R5cm94ccn.FFIcjr4' },
        user: {
          id: res.id,
          email: res.email
        }
      }
      this.authService.setLocalStorage(userObj)
      this.authService.save()
      this.authService.userParse()
      this.router.navigate(['/product'])
    }, err => {
      console.log('error==> ', err)
      this.router.navigate(['/login'])
    })

  }

}
