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

@NgModule({
    declarations:[
        ProdutoComponent,
        CriarProdutoComponent,
        ClienteComponent,
        CriarClienteComponent
    ],
    imports:[
        CommonModule,
        SharedModule,
        ReactiveFormsModule,
        PouiModule,
        PagesRoutingModule
    ],
    exports:[
        ProdutoComponent
    ]
})

export class PagesModule {}