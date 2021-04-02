import { Component, OnInit } from '@angular/core';
import * as services from '../services/authServices';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  
  //atributo
  usuarioAutenticado = false;

  ngOnInit() : void {
    //verificar se o usuario está ou não autenticado..
    this.usuarioAutenticado = services.getToken() !== null;
  }

  logout() : void {

    //verificando se o usuario deseja sair do sistema
    if(window.confirm('Deseja encerrar sua sessão?')){

      //destruir o token do usuario..
      services.removeToken();

      //redirecionar de volta para a página inicial (login)
      services.redirectToLoginPage();
    }

  }

}
