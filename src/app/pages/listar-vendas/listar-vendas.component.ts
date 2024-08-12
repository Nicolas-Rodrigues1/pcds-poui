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
    detail: [],
    precoPedido: 0
  }

  @Input() produto: Produto = {
    id: 0,
    nome: '',
    categoria: '',
    preco: 0
  }

  columns!: Array<PoTableColumn>;
  items: Pedido[] = []
  detail: PedidoDetail[] = [] 
  currentPedido: Pedido = {
    id: 0,
    status: '',
    cliente: 0,
    produto: [],
    detail: [],
    precoPedido: 0
  };

  fields: Array<PoDynamicFormField> = [
    {
    property: 'status',
    label: 'Status',
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
        { property: 'categoria', label: 'Categoria' },
        { property: 'preco', label: 'Preço'}
      ],
      typeHeader: 'top'
    }
    return [
      {property: 'detail', label: 'Detalhes', type:'detail', detail: columnsDetail},
      {property: 'id', label: 'ID'},
      {property: 'status', label: 'Status'},
      {property: 'precoPedido', label: 'Preço total'}
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
  
    // Obtém o e-mail do usuário logado
    this.emailService.email$.subscribe(email => {
      this.emailLogado = email;
  
      // Obtém o cliente com base no e-mail
      this.clienteService.getClientePorEmail(this.emailLogado!).subscribe(cliente => {
        
        // Filtra os pedidos para mostrar apenas os do cliente logado
        this.pedidoService.getItems().subscribe((listaPedidos) => {
          this.items = listaPedidos.filter(pedido => pedido.cliente === cliente.id);
          console.log('Pedidos do cliente logado:', this.items);
        });
      });
    });
  
    // Obtém a lista de produtos
    this.produtoService.getProdutos().subscribe((produtos) => {
      this.produtos = produtos;
    });
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
    // console.log('edit: item',item);
    this.currentPedido = item; // Atualize para o pedido completo
    this.detail = item.detail; // Mantenha os detalhes separados
    this.modalEditar.open();
    // console.log('currentPedido', this.currentPedido)
    // console.log('detail', this.detail)
  }
  
  editarPedido(currentPedido: Pedido) {
    // console.log( currentPedido)
    if (this.currentPedido) {
      this.pedidoService.editar(this.currentPedido).subscribe(() => {
        console.log('Pedido editado');
        this.modalEditar.close();
      });
    }
  }

}
