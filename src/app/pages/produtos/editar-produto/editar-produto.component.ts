import { Component, Inject } from '@angular/core';

// import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ExcluirProdutoComponent } from '../excluir-produto/excluir-produto.component';
import { Produto } from 'src/app/core/types/type';
import { ProdutoService } from '../../services/produto.service';

@Component({
  selector: 'app-editar-produto',
  templateUrl: './editar-produto.component.html',
  styleUrls: ['./editar-produto.component.scss']
})
export class EditarProdutoComponent{
  
  produto: Produto = {
    id: 0,
    categoria: '',
    nome: ''
  }
  
  // constructor(
  //   private produtoService: ProdutoService,
  //   public dialogRef: MatDialogRef<ExcluirProdutoComponent>,
  //   @Inject(MAT_DIALOG_DATA) public data: {produto: Produto}
  // ){
  //   this.produto = data.produto
  // }

  // editarProduto(){
  //   this.produtoService.editar(this.produto).subscribe(() => {
  //     this.dialogRef.close('editado')
  //   })
  // }

  // cancelar() {
  //   this.dialogRef.close()
  // }

}