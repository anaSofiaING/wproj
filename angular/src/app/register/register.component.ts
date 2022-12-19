import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AuthService } from '../_services/auth.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { Observable, Subscriber } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form: any = {
    username: null,
    email: null,
    password: null
  };
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  //login
  formLogin: any = {
    username: null,
    password: null
  };
  isLoggedIn = false;
  isLoginFailed = false;
  roles: string[] = [];

  constructor(private authService: AuthService, private tokenStorage: TokenStorageService,private router: Router) { }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
    }
    if(this.isLoggedIn){
      this.router.navigate(["/home"]);
    }
    const signUpButton = document.getElementById('signUp')as HTMLButtonElement | null;
    const signInButton = document.getElementById('signIn')as HTMLButtonElement | null;
    const container = document.getElementById('container')as HTMLDivElement | null;
    if(signUpButton){
      signUpButton.addEventListener('click', () => {
        if(container!=null)
        container.classList.add("right-panel-active");
      });
    }
    if(signInButton){
      
    signInButton.addEventListener('click', () => {
      if(container!=null)
      container.classList.remove("right-panel-active");
    });
  }
  }

  onSubmit(): void {
    const { username, email, password } = this.form;
    this.getCurrentPosition()
    .subscribe((position: any) => {
      console.log(position.latitude+"longitud:"+position.longitude);
      this.authService.register(username, email, password,position.latitude, position.longitude, "https://marketplace.canva.com/EAEkB8aSmJU/2/0/1600w/canva-rosa-y-amarillo-gato-moderno-dibujado-a-mano-abstracto-imagen-de-perfil-de-twitch-bI-Ixh9fAbQ.jpg", "https://es-la.facebook.com/","https://twitter.com/","https://www.instagram.com/").subscribe({
        next: data => {
          console.log(data);
          this.isSuccessful = true;
          this.isSignUpFailed = false;
          
          window.location.reload();
        },
        error: err => {
          this.errorMessage = err.error.message;
          this.isSignUpFailed = true;
        }
      });
    });
    
    
  }

  private getCurrentPosition(): any {
    return new Observable((observer: Subscriber<any>) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position: any) => {
          observer.next({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
          observer.complete();
        });

      } else {
        observer.error();
      }
    });
  }



  onSubmitLogin(): void {
    const { username, password } = this.formLogin;

    this.authService.login(username, password).subscribe({
      next: data => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getUser().roles;window.location.reload();
      },
      error: err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    });
  }

}
