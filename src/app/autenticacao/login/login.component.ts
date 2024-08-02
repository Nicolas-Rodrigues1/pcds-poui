import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EmailService } from 'src/app/core/services/email.service';
import { AutenticacaoService } from '../services/autenticacao.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm!: FormGroup;


  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AutenticacaoService,
    private emailService: EmailService
  ){}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required]],
      senha: [null, Validators.required]
    })
  }

  login(){
    if(this.loginForm.valid){
      const email = this.loginForm.value.email;
      const senha = this.loginForm.value.senha;
      this.authService.autenticar(email, senha).subscribe({
        next: (value) => {
          console.log('Autenticado', value);
          this.router.navigateByUrl('/auth/home');
          this.loginForm.reset();
        },
        error: (err) => {
          console.log('Problema', err)
        }
      })
      this.emailService.setEmail(email);

    }
  }
}
