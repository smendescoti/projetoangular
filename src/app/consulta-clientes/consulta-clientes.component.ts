import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as services from '../../services/authServices';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-consulta-clientes',
  templateUrl: './consulta-clientes.component.html',
  styleUrls: ['./consulta-clientes.component.css']
})
export class ConsultaClientesComponent implements OnInit {

  isPageRender = false;

  page = 1;

  listagemClientes = []; //array vazio

  clienteSelecionado = {
    nome : '',
    cpf : '',
    email : '',
    plano : ''
  };

  httpHeaders:HttpHeaders;

  //inicializando o httpClient no construtor da classe..
  constructor(private httpClient:HttpClient) { }

  //objeto para capturar o conteudo do formulario
  form = new FormGroup({

    filtro : new FormControl('', [
      Validators.required, 
      Validators.minLength(3),
      Validators.maxLength(150)
    ]) //campo

  });

  //função para acessar as validações dos campos
  get f(){ //utilizado na exibição das mensagens de validação..
    return this.form.controls;
  }

  ngOnInit(): void {

    //verificar se o usuario ja esta autenticado..
    if(services.getToken() !== null)
      this.isPageRender = true;
    else
      services.redirectToLoginPage();

    //criando o parametro que irá enviar o TOKEN no cabeçalho
    //da requisição para a API..
    this.httpHeaders = new HttpHeaders()
      .set('Authorization', 'Bearer ' + services.getToken());

    this.consultarClientes();
  }

  //função para ler os dados dos clientes..
  consultarClientes() : void {

    this.httpClient.get(
      environment.apiUrl + "/api/clientes",
      { headers : this.httpHeaders }
      )
      .subscribe(
        (data:any[]) => {
          console.log(data);
        }, 
        e => {
          console.log(e);
        }
      )
  }

  //função executada no SUBMIT do formulário
  filtrarClientes(){
   
      var filtro = this.form.controls.filtro.value;

      this.httpClient.get(
        environment.apiUrl + "/api/clientes/" + filtro,
        { headers : this.httpHeaders }
        )
        .subscribe(
          (data:any[]) => {
            console.log(data);
          }, 
          e => {
            console.log(e);
          }
        )
  }

  //realizar a paginação
  handlePageChange(event) {
    this.page = event;
  }

  //função para exibir os dados do cliente na edição / exclusão..
  obterDados(item) : void {
    this.clienteSelecionado = item;
  }

}
