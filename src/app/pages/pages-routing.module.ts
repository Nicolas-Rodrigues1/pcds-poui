import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ProdutoComponent } from "./produtos/produto/produto.component";
import { CriarProdutoComponent } from "./produtos/criar-produto/criar-produto.component";
import { CriarClienteComponent } from "./clientes/criar-cliente/criar-cliente.component";
import { ClienteComponent } from "./clientes/cliente/cliente.component";
import { PedidoVendaComponent } from "./pedido-venda/pedido-venda.component";
import { ListarVendasComponent } from "./listar-vendas/listar-vendas.component";

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
    },
    {
        path: 'pedidos-venda',
        component: PedidoVendaComponent
    },
    {
        path: 'listar-vendas',
        component: ListarVendasComponent
    }
]

@NgModule({
    imports:[RouterModule.forChild(routes)],
    exports:[RouterModule]
})

export class PagesRoutingModule{}