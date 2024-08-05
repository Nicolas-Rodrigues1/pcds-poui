import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ForceBooleanComponentEnum, PoDynamicFormComponent, PoDynamicFormField } from '@po-ui/ng-components';
import { FormularioService } from 'src/app/core/services/formulario.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.scss'
})
export class CadastroComponent {
  fields: Array<PoDynamicFormField> = [
    {
      property: 'nome',
      required: true,
      minLength: 3,
      maxLength: 50,
      placeholder: 'Digite seu nome'
    },
    {
      property: 'nascimento',
      label: 'Data de nascimento',
      type: 'date',
      format: 'mm/dd/yyyy',
      required: true
    },
    { 
      property: 'cpf', 
      label: 'CPF', 
      mask: '999.999.999-99',  
      required: true
    },
    {
      property: 'cep',
      label: 'CEP',
      mask: '99999-999',
      required: true
    },
    {
      property: 'Gênero',
      options:['Masculino','Feminino','Outro'],
      required: true
    },
    {
      property: 'Telefone',
      required: true,
      format: '(99) 99999-9999',
      placeholder: '(99) 99999-9999'
    },
    {
      property: 'email',
      divider: 'Dados de login',
      required: true,
      gridColumns: 6, 
      icon: 'ph ph-envelope',
      placeholder: 'Digite seu email'
    },
    {
      property: 'password',
      required: true,
      label: 'Senha',
      secret: true,
      // pattern: '[a-zA]{5}[Z0-9]{3}',
      // errorMessage: 'At least 5 alphabetic and 3 numeric characters are required.',
      placeholder: 'Digite sua senha'
    },
    {
      property: 'termos',
      gridColumns: 12,
      label: 'Você aceita os termos?',
      type: 'boolean',
      forceBooleanComponentType: ForceBooleanComponentEnum.checkbox
    }
  ]

  constructor(
    private formularioService: FormularioService,
    private router: Router
  ){}

  cadastrar(dynamicForm: PoDynamicFormComponent){
    const formCadastro = dynamicForm.form.value && this.formularioService.getCadastro()
    
    console.log(formCadastro)
    this.router.navigate(['/auth/login'])
  }
}
