import { UserServiceService } from './../../Core/Service/UserService/user-service.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {

  constructor(private _userService:UserServiceService) { }

  public validateRecaptcha:boolean = true;

  ngOnInit(): void {
  }

  resolved(captchaResponse:string) {
    this._userService.validateReCaptcha(captchaResponse).subscribe(res => {
      res['success'] == true ? this.validateRecaptcha=false : this.validateRecaptcha=true; })
    
  }

}
