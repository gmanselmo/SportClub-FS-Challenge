import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(private _router: Router){}

  ngOnInit(){
    localStorage.setItem('isLogged', 'false');
  }

  mail: string = '';
  contrasenia: string = '';
  loginFalladito: boolean = false;
  error: string = '';

  submitForm() {
    let miLista: any = [];
    let listaJSON: any = JSON.stringify(miLista);
    if (this.mail === 'sportclub' && this.contrasenia === 'sportclub') {
      // Loggeado.
      this.loginFalladito = false;
      localStorage.setItem('isLogged', 'true');
      if (localStorage.getItem("myFavoriteList") === null) {
        localStorage.setItem("myFavoriteList", listaJSON);
      }
      this._router.navigate(['home']);
      console.log('Loggeado.');
    } else {
      // Falló todo nomás.
      this.loginFalladito = true;
      this.error = 'Incorrect data. Please try again or contact support.';
      console.log('Falló todo nomás.');
    }

  }

}
