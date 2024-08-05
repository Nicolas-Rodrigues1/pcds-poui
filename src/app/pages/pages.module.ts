import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SharedModule } from "../shared/shared.module";
import { ReactiveFormsModule } from "@angular/forms";
import { PouiModule } from "../core/po-ui/poui.module";
import { PagesRoutingModule } from "./pages-routing.module";
import { ProdutoComponent } from "./produtos/produto/produto.component";
import { ExcluirProdutoComponent } from "./produtos/excluir-produto/excluir-produto.component";
import { EditarProdutoComponent } from "./produtos/editar-produto/editar-produto.component";
import { CriarProdutoComponent } from "./produtos/criar-produto/criar-produto.component";

@NgModule({
    declarations:[
        ProdutoComponent,
        ExcluirProdutoComponent,
        EditarProdutoComponent,
        CriarProdutoComponent
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