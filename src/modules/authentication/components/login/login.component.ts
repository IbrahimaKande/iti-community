import { Component, OnInit, ViewChild } from '@angular/core';
import { NgControl, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NzMessageService } from "ng-zorro-antd/message";
import { Ok } from 'src/modules/common/Result';
import { AuthenticationService } from '../../services/authentication.service';

class LoginFormModel {
  username = "";
  password = "";
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {
  @ViewChild(NgForm, { static: false })
  ngForm: NgForm;

  model = new LoginFormModel();

  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private nzMessageService: NzMessageService
  ) { }

  ngOnInit(): void {
  }

  goToRegistration() {
    // TODO naviguer vers "/splash/register"
    this.router.navigate(['/splash/register'])
  }

  submit() {
    this.login();
  }

  async login() {
    if (this.ngForm.form.invalid) {
      return;
    }

    try {
      // TODO vérifier le résultat de l'authentification. Rediriger sur "/" en cas de succès ou afficher une erreur en cas d'échec
      if(await (await this.authService.authenticate(this.model.username, this.model.password)).success){
        this.router.navigate(['/'])
      }
      else{
        this.nzMessageService.error("Username or password incorrect");
      };

    } catch (e) {
      this.nzMessageService.error("Une erreur est survenue. Veuillez réessayer plus tard");
    }
  }

  checkValid(input: string) {
    if(input.length == 0) return false;
    else return true;
  }
}
