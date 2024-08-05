import { Component, Inject, Input } from '@angular/core';
import { Produto } from 'src/app/core/types/type';
import { ProdutoService } from '../../services/produto.service';

// import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-excluir-produto',
  templateUrl: './excluir-produto.component.html',
  styleUrls: ['./excluir-produto.component.scss']
})
export class ExcluirProdutoComponent{

  // @Input() produto!: Produto;
  
  produto: Produto = {
    id: 0,
    nome: '',
    categoria: ''
  }

  // constructor(
  //   private produtoService: ProdutoService,
  //   public dialogRef: MatDialogRef<ExcluirProdutoComponent>,
  //   @Inject(MAT_DIALOG_DATA) public data: {produto: Produto}
  // ){
  //   this.produto = data.produto
  // }

  // excluirProduto(){
  //   this.produtoService.excluir(this.produto.id).subscribe(() => {
  //     this.dialogRef.close('excluido')
  //   })
  // }

  // cancelar(){
  //   this.dialogRef.close()
  // }

}