import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import * as services from '../../services/authServices';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  //atributos
  mensagemsucesso : string;
  mensagemerro : string;
  
  //variavel para definir se a página poderá ou não ser renderizada..
  isPageRender = false;

  //variavel utilizada para exibir o spinner de carregamento
  isLoading = false;

  constructor(private httpClient:HttpClient) { }

  //objeto para capturar os campos do formulário..
  form = new FormGroup({ //grupo de campos

    email : new FormControl('', [
      Validators.required,
      Validators.email
    ]), //campo

    senha : new FormControl('', [
      Validators.required
    ]) //campo

  });

  //função para acessar as validações dos campos
  get f(){
    return this.form.controls;
  }

  ngOnInit(): void {

    //verificar se o usuario ja esta autenticado..
    if(services.getToken() !== null)
      services.redirectToAdminPage();
    else
      this.isPageRender = true;
  }

  autenticarUsuario(){

    this.mensagemerro = "";
    this.mensagemsucesso = "";

    this.isLoading = true;
    
    this.httpClient.post(environment.apiUrl + "/api/login", 
      {
        email : this.form.controls.email.value,
        senha : this.form.controls.senha.value
      })
      .subscribe(
        (data:any) => {
          
          //gravar o TOKEN obtido em sessão..
          services.writeToken(data.accessToken);

          //redirecionar o usuário para a página /admin
          services.redirectToAdminPage();          
        },
        e => {
          switch(e.status){
            case 400:
              this.mensagemerro = "Ocorreram erros de validação no preenchimento dos campos";
              break;

            case 401:
              this.mensagemerro = e.error.message;
              break;

            case 500:
              this.mensagemerro = "Erro ao autenticar o usuário.";
              break;
          }

          this.isLoading = false;
        }
      )
  }

}
