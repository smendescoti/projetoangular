import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as services from '../../services/authServices';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-cadastro-clientes',
  templateUrl: './cadastro-clientes.component.html',
  styleUrls: ['./cadastro-clientes.component.css']
})
export class CadastroClientesComponent implements OnInit {

  //atributos
  isPageRender = false;
  httpHeaders:HttpHeaders;

  //inicializando HttpClient
  constructor(private httpClient:HttpClient) { }

  //objeto para capturar os campos do formulário..
  form = new FormGroup({ //grupo de campos

    nome : new FormControl('', [
        Validators.required,
        Validators.pattern('^[A-Za-zÀ-Üà-ü\\s]{6,150}$')
      ]), //campo

    email : new FormControl('', [
      Validators.required,
      Validators.email
    ]), //campo

    cpf : new FormControl('', [
      Validators.required,
      Validators.pattern('^[0-9]{11}$')
    ]), //campo

    plano : new FormControl('', [
      Validators.required
    ]), //campo

    foto : new FormControl('', [
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
      this.isPageRender = true;
    else
      services.redirectToLoginPage();

    //criando um objeto HttpHeaders contendo um parametro para
    //envio do TOKEN para a API..
    this.httpHeaders = new HttpHeaders()
      .set('Authorization', 'Bearer ' + services.getToken());
  }

  //função executada no SUBMIT do formulário
  cadastrarCliente(){

    //montando o JSON da requisição da API
    var requestBody = {
      nome : this.form.controls.nome.value,
      email : this.form.controls.email.value,
      cpf : this.form.controls.cpf.value,
      plano : this.form.controls.plano.value,
      foto : this.form.controls.foto.value
    }
    
    //executando a chamada para o serviço de cadastro de cliente na API..
    this.httpClient.post(
          environment.apiUrl + "/api/clientes", //URL do serviço
          requestBody, //request body (parametros do formulário)
          { headers : this.httpHeaders } //parametro Authorization com o TOKEN do usuario
        )
        .subscribe( //recebe o PROMISSE da API (retorno)
          (data:any) => {
            console.log(data);
          },
          e => {
            console.log(e);
          }
        )
  }

}
