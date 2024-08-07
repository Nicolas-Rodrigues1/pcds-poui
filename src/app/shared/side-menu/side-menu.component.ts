import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PoMenuItem } from '@po-ui/ng-components';
import { UserService } from 'src/app/autenticacao/services/user.service';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.scss'
})
export class SideMenuComponent {
  menuItemSelected!: string;

  menus: Array<PoMenuItem> = [
    {label: 'Cadastros', icon: 'ph ph-user', shortLabel: 'Home',
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

  constructor(
    private userService: UserService,
    private router: Router
  ){}

  logout(){
    this.userService.logout();
    this.router.navigateByUrl('/auth/login');
  }

}
