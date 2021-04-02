import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as services from '../../services/authServices';

@Component({
  selector: 'app-recuperar-senha',
  templateUrl: './recuperar-senha.component.html',
  styleUrls: ['./recuperar-senha.component.css']
})
export class RecuperarSenhaComponent implements OnInit {

  isPageRender = false;

  constructor() { }

  //objeto para capturar os campos do formulário..
  form = new FormGroup({ //grupo de campos

    email: new FormControl('', [
      Validators.required,
      Validators.email
    ])

  });

  //função para acessar as validações dos campos
  get f() {
    return this.form.controls;
  }

  ngOnInit(): void {

    //verificar se o usuario ja esta autenticado..
    if (services.getToken() !== null)
      services.redirectToAdminPage();
    else
      this.isPageRender = true;
  }

  recuperarSenha() {
    //imprimir os valores preenchidos nos campos do formulário..
    console.log(this.form.controls);
  }

}
