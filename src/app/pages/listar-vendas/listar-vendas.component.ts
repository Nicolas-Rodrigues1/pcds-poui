import { Component, Input, OnInit } from '@angular/core';
import { EmailService } from 'src/app/core/services/email.service';
import { Pedido, Produto } from 'src/app/core/types/type';
import { ClienteService } from '../services/cliente.service';
import { PedidoService } from '../services/pedido.service';
import { ProdutoService } from '../services/produto.service';
import { PoTableColumn, PoTableDetail } from '@po-ui/ng-components';

@Component({
  selector: 'app-listar-vendas',
  templateUrl: './listar-vendas.component.html',
  styleUrl: './listar-vendas.component.scss'
})
export class ListarVendasComponent implements OnInit{

  listaPedidos: Pedido[] = []
  produtos: Produto[] = []
  emailLogado: string | null = null;
  nomeCliente = '';

  @Input() title = 'Essas são seus pedidos'
  @Input() pedido: Pedido = {
    id: 0,
    status: '',
    cliente: 0,
    produto: []
  }

  @Input() produto: Produto = {
    id: 0,
    nome: '',
    categoria: ''
  }

  columns: Array<PoTableColumn> = []
  columnsDefault: Array<PoTableColumn> = []
  items!: Array<Pedido>;
  detail: any;
  totalExpanded = 0;

  getColumns(): Array<PoTableColumn>{
    return [
      {
        property: 'detail', 
        label: 'Details',
        detail: 
        { 
          columns: [
        { property: 'nome', label: 'Nome' },
        { property: 'categoria', label: 'Categoria' }
      ],
      typeHeader: 'top'
    }
    },
      {property: 'id'},
      {property: 'status'}
    ]
  }

  constructor(
    private pedidoService: PedidoService,
    private produtoService: ProdutoService,
    private emailService: EmailService,
    private clienteService: ClienteService
  ){}

  ngOnInit(): void {
    this.columns = this.getColumns();
    
    this.pedidoService.getItems().subscribe((items: Pedido[]) => {
      this.items = items;
      console.log(this.items)
    });
    // this.emailService.email$.subscribe(email => {
    //   this.emailLogado = email;
      
    //   this.clienteService.getClientePorEmail(this.emailLogado!).subscribe(cliente => {
    //     this.pedidoService.listarPedidos().subscribe((listaPedidos)=> {
    //       this.listaPedidos = listaPedidos.filter(pedido => pedido.cliente === cliente.id)
    //     })
    //   })
    // })
    // this.produtoService.getProdutos().subscribe((produtos) => {
    //   this.produtos = produtos
    // })
  }

  onExpandDetail() {
    this.totalExpanded += 1;
  }


  onCollapseDetail(){

  }

  getProdutoNome(produtoId: number): string{
    const produto = this.produtos.find(p => p.id === produtoId)
    return produto ? produto.nome : 'Produto não encontrado';
  }

  getProdutoCategoria(produtoId: number): string{
    const produto = this.produtos.find(p => p.id === produtoId)
    return produto ? produto.categoria : 'Produto não encontrado';
  }

}
