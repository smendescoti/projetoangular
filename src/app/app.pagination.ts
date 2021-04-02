import { NgModule } from '@angular/core';
import { NgxPaginationModule } from 'ngx-pagination';

//Configurando a biblioteca de paginação..
@NgModule({
    imports : [NgxPaginationModule],
    exports : [NgxPaginationModule]
})

export class AppPaginationModule { }