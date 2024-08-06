import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SharedModule } from "../shared/shared.module";
import { ReactiveFormsModule } from "@angular/forms";
import { PouiModule } from "../core/po-ui/poui.module";
import { PagesRoutingModule } from "./pages-routing.module";
import { ProdutoComponent } from "./produtos/produto/produto.component";
import { CriarProdutoComponent } from "./produtos/criar-produto/criar-produto.component";
import { ClienteComponent } from "./clientes/cliente/cliente.component";
import { CriarClienteComponent } from "./clientes/criar-cliente/criar-cliente.component";
import { PedidoVendaComponent } from "./pedido-venda/pedido-venda.component";

@NgModule({
    declarations:[
        ProdutoComponent,
        CriarProdutoComponent,
        ClienteComponent,
        CriarClienteComponent,
        PedidoVendaComponent
    ],
    imports:[
        CommonModule,
        SharedModule,
        ReactiveFormsModule,
        PouiModule,
        PagesRoutingModule
    ],
    exports:[
    ]
})

export class PagesModule {}