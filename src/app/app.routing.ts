import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CadastroClientesComponent } from './cadastro-clientes/cadastro-clientes.component';
import { ConsultaClientesComponent } from './consulta-clientes/consulta-clientes.component';
import { LoginComponent } from './login/login.component';
import { RecuperarSenhaComponent } from './recuperar-senha/recuperar-senha.component';
import { RegisterComponent } from './register/register.component';
import { AdminComponent } from './admin/admin.component';

//mapeamento das rotas
const routes:Routes = [
    { path : 'cadastro-clientes', component : CadastroClientesComponent },
    { path : 'consulta-clientes', component : ConsultaClientesComponent }, 
    { path : 'recuperar-senha', component : RecuperarSenhaComponent },
    { path : 'cadastrar-conta', component : RegisterComponent },
    { path : 'admin', component : AdminComponent },   
    { path : '', component : LoginComponent }
];

//registrando o modulo de configuração
@NgModule({
    imports : [RouterModule.forRoot(routes)],
    exports : [RouterModule]
})

export class AppRoutingModule {}
