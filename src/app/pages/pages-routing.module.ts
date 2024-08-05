import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ProdutoComponent } from "./produtos/produto/produto.component";
import { EditarProdutoComponent } from "./produtos/editar-produto/editar-produto.component";
import { CriarProdutoComponent } from "./produtos/criar-produto/criar-produto.component";
import { ExcluirProdutoComponent } from "./produtos/excluir-produto/excluir-produto.component";

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
        path:'editarProduto',
        component: EditarProdutoComponent
    },
    {
        path:'excluirProduto',
        component: ExcluirProdutoComponent
    }
]

@NgModule({
    imports:[RouterModule.forChild(routes)],
    exports:[RouterModule]
})

export class PagesRoutingModule{}