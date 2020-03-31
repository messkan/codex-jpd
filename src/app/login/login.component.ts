import { Component, OnInit, OnDestroy, Renderer2 } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from '../utils/services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  public loginForm: FormGroup;
  username: string;
  password: string;

  constructor(
    private renderer: Renderer2,
    private toastr: ToastrService,
    private loginService: LoginService,
    private router: Router
  ) {
    if(this.loginService.loggedIn() ){

      if(localStorage.getItem('ROLE_COMMERCIAL')){
      this.router.navigate(['/dashboard/commercant']);
      }else{
      this.router.navigate(['/dashboard/users']);

       }
    }

  }

  ngOnInit() {

    
    this.renderer.addClass(document.body, 'login-page');
    this.loginForm = new FormGroup({
      username: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required)
    });
  }

  logIn() {
    if (this.loginForm.valid) {

      this.loginService.login(this.username, this.password).subscribe(
        (response) => {
          if(response.status === 200){
               localStorage.setItem('token' , response.body.token);
               localStorage.setItem('role' , response.body._doc.role);
               localStorage.setItem('username' , response.body._doc.username);
               
              if(response.body._doc.role == 'ROLE_RESPONSABLE') this.router.navigate(['/dashboard/users']);
              if(response.body._doc.role == 'ROLE_COMMERCANT') this.router.navigate(['/dashboard/commercant']);
              }  
        } , (err) =>{
            this.toastr.error('mot de passe ou username incorrect');
        }
      );
    } else {
      this.toastr.error('Tous les champs sont obligatoires');
    }
  }

  ngOnDestroy() {
    this.renderer.removeClass(document.body, 'login-page');
  }
}
