import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import * as services from '../../services/authServices';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  mensagemsucesso:string;
  mensagemerro:string;

  isPageRender = false;

  constructor(private httpClient:HttpClient) { }

  //objeto para capturar os campos do formulário..
  form = new FormGroup({ //grupo de campos

    nome : new FormControl('', [
      Validators.required
    ]), //campo

    email : new FormControl('', [
      Validators.required,
      Validators.email
    ]), //campo

    senha : new FormControl('', [
      Validators.required
    ]), //campo

    senhaConfirmacao : new FormControl('', [
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

  cadastrarConta(){
  
    this.mensagemsucesso = '';
    this.mensagemerro = '';

    this.httpClient.post(environment.apiUrl + "/api/account", 
      {
        nome : this.form.controls.nome.value,
        email : this.form.controls.email.value,
        senha : this.form.controls.senha.value,
        senhaConfirmacao : this.form.controls.senhaConfirmacao.value
      })
      .subscribe(
        (data:any) => {
          this.mensagemsucesso = data.message;
          this.form.reset(); //limpar os campos do formulário..
        },
        e => {

          switch(e.status){

            case 400:
              this.mensagemerro = "Ocorreram erros de validação no preenchimento do formulário.";
              break;

            case 403:
              this.mensagemerro = e.error.message;
              break;

            case 500:
              this.mensagemerro = "Erro ao realizar o cadastro, tente novamente.";
              console.log(e);
              break;
          }
        }
      )

  }
}
