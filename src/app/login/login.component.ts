import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';

@Component({
  selector: 'pen-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  login: {
    email: string;
    password: string;
  } = {
      email: 'caio@caio.com.br',
    password: '123123'
  };

  // mock

  correct_email = 'caio@caio.com.br';
  correct_pass = '123123';
  constructor(
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private route: Router
  ) {}

  ngOnInit() {
    // /** spinner starts on init */
    // this.spinner.show();

    // setTimeout(() => {
    //   /** spinner ends after 5 seconds */
    //   this.spinner.hide();
    // }, 5000);
  }

  tryLogin() {
    this.spinner.show();
        setTimeout(() => {
          if (this.login.email === this.correct_email && this.login.password === this.correct_pass) {
            console.log('sucesso');
            this.toastr.success('Logado com sucesso', 'Logado');
            this.route.navigate(['/home']);

          } else {
            console.log('erro', [this.login, this.correct_email, this.correct_pass]);
            this.toastr.error('Email/Senha incorretos', 'Temos um problema');
          }
      this.spinner.hide();
    }, 2000);
  }

  clear() {
    this.login.email = '';
    this.login.password = '';
  }
}
