import { Component, OnInit } from '@angular/core';
import * as services from '../../services/authServices';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  isPageRender = false;

  constructor() { }

  ngOnInit(): void {

    //verificar se o usuario ja esta autenticado..
    if (services.getToken() !== null)
      this.isPageRender = true;
    else
      services.redirectToLoginPage();
  }

}
