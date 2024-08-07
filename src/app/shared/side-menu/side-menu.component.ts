import { Component } from '@angular/core';
import { PoMenuItem } from '@po-ui/ng-components';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.scss'
})
export class SideMenuComponent {
  menuItemSelected!: string;

  menus: Array<PoMenuItem> = [
    {label: 'Cadastros', icon: 'ph ph-user',
      subItems:[
        {label: 'Clientes', icon: 'ph ph-user', link: '/pages/clientes'},
        {label: 'Produtos', icon: 'ph ph-user', link: '/pages/produtos'}
      ]
    },
    {
      label: 'Pedidos', icon: 'ph ph-user',
      subItems:[
        {label: 'Realizar pedidos', icon: 'ph ph-user', link: '/pages/pedidos-venda'},
        {label: 'Meus pedidos', icon: 'ph ph-user', link: '/pages/listar-vendas'},
      ]
    }
  ]

  constructor(){}

}
