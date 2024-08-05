import { Component, Input, OnInit } from '@angular/core';

// import { MatDialog } from '@angular/material/dialog';
import { ExcluirProdutoComponent } from '../excluir-produto/excluir-produto.component';
import { MensagemService } from 'src/app/core/services/mensagem.service';
import { EditarProdutoComponent } from '../editar-produto/editar-produto.component';
import { Produto } from 'src/app/core/types/type';
import { ProdutoService } from '../../services/produto.service';
import { PoModalComponent } from '@po-ui/ng-components';


@Component({
  selector: 'app-produto',
  templateUrl: './produto.component.html',
  styleUrls: ['./produto.component.scss']
})
export class ProdutoComponent implements OnInit{
  listaProdutos: Produto[] = [];
  produtoSelecionado: Produto | null = null;
  page = 1;
  pageSize = 12;

  @Input() title = 'Como gostaria de manejar os produtos?';
  @Input() produto: Produto = {
    id: 0,
    categoria: '',
    nome: ''
  }

  constructor(
    private produtoService: ProdutoService,
    // private dialog: MatDialog,
    private mensagemService: MensagemService,
    // private modal: PoModalComponent
  ){}

  ngOnInit():void {
    this.listarProdutos();
  }

  listarProdutos(): void{
    this.produtoService.listar(this.page, this.pageSize).subscribe((listaProdutos) => {
      this.listaProdutos = listaProdutos
    })  
  }

  selecionarProduto(produto: Produto){
    this.produtoSelecionado = produto
  }

  openExcluir(){
    // this.modal.open()
    // // const dialogRef = this.dialog.open(ExcluirProdutoComponent, {
    // //   width: '50%',
    // //   data: { produto: this.produtoSelecionado }
    // // })

    // dialogRef.afterClosed().subscribe(result => {
    //   if(result === 'excluido'){
    //     console.log('Produto excluído com sucesso')
    //     // this.mensagemService.openSnackBar('Produto excluído com sucesso')
    //     this.listarProdutos()
    //   }
    // })
  }

  openEditar(){

    // const dialogRef = this.dialog.open(EditarProdutoComponent,{
    //   width: '50%',
    //   data: { produto: this.produtoSelecionado }
    // })

    // dialogRef.afterClosed().subscribe(result => {
    //   if(result === 'editado'){
    //     console.log('Produto editado com sucesso')
    //     // this.mensagemService.openSnackBar('Produto editado com sucesso')
    //   }
    // })
  }

  proximaPagina(): void{
    this.page++;
    this.listarProdutos();
  }

  paginaAnterior(): void{
    if (this.page > 1) {
      this.page--;
      this.listarProdutos();
    }
  }
}