import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { EmailService } from 'src/app/core/services/email.service';
import { Pedido, PedidoDetail, Produto } from 'src/app/core/types/type';
import { ClienteService } from '../services/cliente.service';
import { PedidoService } from '../services/pedido.service';
import { ProdutoService } from '../services/produto.service';
import { PoDynamicFormField, PoModalComponent, PoTableAction, PoTableColumn, PoTableComponent, PoTableDetail } from '@po-ui/ng-components';

@Component({
  selector: 'app-listar-vendas',
  templateUrl: './listar-vendas.component.html',
  styleUrl: './listar-vendas.component.scss'
})
export class ListarVendasComponent implements OnInit{
  @ViewChild('modalShow', { static: true }) modalShow!: PoModalComponent;
  @ViewChild(PoTableComponent, { static: true }) poTable!: PoTableComponent;
  @ViewChild('modalEditar', { static: true }) modalEditar!: PoModalComponent;


  listaPedidos: Pedido[] = []
  produtos: Produto[] = []
  emailLogado: string | null = null;
  nomeCliente = '';

  @Input() title = 'Essas são seus pedidos'
  @Input() pedido: Pedido = {
    id: 0,
    status: '',
    cliente: 0,
    produto: [],
    detail: []
  }

  @Input() produto: Produto = {
    id: 0,
    nome: '',
    categoria: ''
  }

  columns!: Array<PoTableColumn>;
  items: Pedido[] = []
  detail: PedidoDetail[] = [] 
  currentPedido: Pedido | null = null; 

  fields: Array<PoDynamicFormField> = [
    {
    property: 'status',
    label: 'Status do pedido',
    required: true,
    options: [
      { label: 'Pendente', value: 'Pendente' },
      { label: 'Processando', value: 'Processando' },
      { label: 'Concluído', value: 'Concluído' },
      { label: 'Cancelado', value: 'Cancelado' }
    ]
  },
    {
      property: 'nome',
      required: true
    },
    {
      property: 'categoria',
      required: true,
      options: [
        {categoria: 'Processador', code: 'processador'},
        {categoria: 'Placa Mãe', code: 'placaMae'},
        {categoria: 'Memória Ram', code: 'memoriaRam'},
        {categoria: 'Armazenamento', code: 'armazenamento'},
        {categoria: 'Mouse', code: 'mouse'},
        {categoria: 'Teclado', code: 'teclado'},
        {categoria: 'Monitor', code: 'monitor'},
      ],
      fieldLabel: 'categoria',
      fieldValue: 'code'
    }
  ]

  readonly actions: Array<PoTableAction> = [
    { action: this.details.bind(this), icon: 'ph ph-info', label: 'Details' },
    { action: this.remove.bind(this), icon: 'po-icon ph ph-trash', label: 'Remove'},
    { action: this.edit.bind(this), icon: 'po-icon po-icon-edit', label: 'Editar'}
  ]

  getColumns(): PoTableColumn[]{
    let columnsDetail: PoTableDetail = {
      columns: [
        { property: 'nome', label: 'Nome' },
        { property: 'categoria', label: 'Categoria' }
      ],
      typeHeader: 'top'
    }
    return [
      {property: 'detail', label: 'Detalhes', type:'detail', detail: columnsDetail},
      {property: 'id', label: 'ID'},
      {property: 'status', label: 'Status'}
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

  remove(item: Pedido){
    this.poTable.removeItem(item)
    console.log(item.id)
    this.pedidoService.excluir(item.id).subscribe(()=>{
      console.log('Pedido excluído')
    })
  }

  details(item: Pedido) {
    this.currentPedido = item; // Atualize para o pedido completo
    this.detail = item.detail; // Mantenha os detalhes separados
    this.modalShow.open();
  }

  edit(item: Pedido) {
    console.log(item);
    this.currentPedido = item; // Atualize para o pedido completo
    this.detail = item.detail; // Mantenha os detalhes separados
    this.modalEditar.open();
  }
  
  editarPedido() {
    if (this.currentPedido) {
      this.pedidoService.editar(this.currentPedido).subscribe(() => {
        console.log('Pedido editado');
        this.modalEditar.close();
      });
    }
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
