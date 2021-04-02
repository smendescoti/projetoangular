import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CadastroClientesComponent } from './cadastro-clientes/cadastro-clientes.component';
import { ConsultaClientesComponent } from './consulta-clientes/consulta-clientes.component';

import { HttpClientModule } from '@angular/common/http';

//arquivo de configuração de rotas
import { AppRoutingModule } from './app.routing';
//arquivo de configuração de formulários
import { AppFormsModule } from './app.forms';
//arquivo de configuração de paginação
import { AppPaginationModule } from './app.pagination';
//arquivo de configuração de máscara de campos
import { AppMaskModule } from './app.mask';
import { LoginComponent } from './login/login.component';
import { RecuperarSenhaComponent } from './recuperar-senha/recuperar-senha.component';
import { RegisterComponent } from './register/register.component';
import { AdminComponent } from './admin/admin.component';

@NgModule({
  declarations: [
    AppComponent,
    CadastroClientesComponent,
    ConsultaClientesComponent,
    LoginComponent,
    RecuperarSenhaComponent,
    RegisterComponent,
    AdminComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule, //registrando as rotas do projeto
    AppFormsModule, //registrando a biblioteca de formulários
    AppPaginationModule, //registrando a biblioteca de paginação
    AppMaskModule //registrando a biblioteca de máscara de campos
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
