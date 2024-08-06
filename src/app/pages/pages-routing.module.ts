import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ProdutoComponent } from "./produtos/produto/produto.component";
import { CriarProdutoComponent } from "./produtos/criar-produto/criar-produto.component";
import { CriarClienteComponent } from "./clientes/criar-cliente/criar-cliente.component";
import { ClienteComponent } from "./clientes/cliente/cliente.component";

const routes: Routes = [
    {
        path:'produtos',
        component: ProdutoComponent
    },
    {
        path:'criarProduto',
        component: CriarProdutoComponent
    },
    {
        path: 'criarCliente',
        component: CriarClienteComponent
    },
    {
        path:'clientes',
        component:ClienteComponent
    }
]

@NgModule({
    imports:[RouterModule.forChild(routes)],
    exports:[RouterModule]
})

export class PagesRoutingModule{}