import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { EmailService } from 'src/app/core/services/email.service';
import { AutenticacaoService } from '../services/autenticacao.service';
import { PoDynamicFormComponent, PoDynamicFormField } from '@po-ui/ng-components';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  fields: Array<PoDynamicFormField> = [
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
    }

  ]

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AutenticacaoService,
    private emailService: EmailService
  ){}

  ngOnInit() {
    // this.loginForm = this.formBuilder.group({
    //   email: ['', [Validators.required, Validators.email]],
    //   senha: [null, Validators.required]
    // })
  }

  login(dynamicForm: PoDynamicFormComponent){
    const formValues = dynamicForm.form.value;
    const email = formValues.email;
    const senha = formValues.password;

    console.log('E-mail:', email);
    console.log('Senha:', senha);

    // this.authService.autenticar(email, senha).subscribe({
    //   next: (value) => {
    //     console.log('Autenticado', value);
    //     this.router.navigateByUrl('/auth/home');
    //     dynamicForm.form.reset();
    //   },
    //   error: (err) => {
    //     console.log('Problema', err);
    //   }
    // });

    // this.emailService.setEmail(email);
  }
}
