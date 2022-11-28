import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { UserQueries } from '/Users/ibrahimakande/Documents/Perso/iti-community/src/modules/user/services/user.queries';

class UserRegistrationFormModel {
  username = "";
  password = "";
  confirmPassword = "";
}

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.less']
})
export class UserRegistrationComponent implements OnInit {
  @ViewChild("f")
  form: NgForm;

  model = new UserRegistrationFormModel();

  constructor(
    private router: Router,
    private userService: UserService,
    private userQueries: UserQueries
  ) { }

  ngOnInit(): void {
  }

  async submit() {

    // TODO  Vérifier que la confirmation de mot de passe correspond au mot de passe
    if (this.form.form.invalid || this.model.password !== this.model.confirmPassword || this.model.confirmPassword !== this.model.password) {
      alert("Password and Confirm Password are not the same")
      return;
    }

    // TODO Enregistrer l'utilisateur via le UserService
    await this.userQueries.exists(this.model.username)
    if(!await this.userQueries.exists(this.model.username)){
      this.userService.register(this.model.username, this.model.password);
      this.goToLogin();
    }
    else{
      alert("Username already used")
    }
    
  }

  goToLogin() {
    // TODO rediriger l'utilisateur sur "/splash/login"
    this.router.navigate(['/splash/login']);
  }
}
