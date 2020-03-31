import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/User';
import { ToastrService } from 'ngx-toastr';
import { UsersService } from '../../../utils/services/users.service';

import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-users-add',
  templateUrl: './users-add.component.html',
  styleUrls: ['./users-add.component.scss']
})
export class UsersAddComponent implements OnInit {

  user: User = new User();

  constructor(private userService: UsersService, private toastr: ToastrService, private router: Router) { }


  username = new FormControl(this.user.username, [
    Validators.required
  ]);

  password = new FormControl(this.user.password, [
    Validators.required,
    Validators.minLength(4)
  ]);

  role = new FormControl(this.user.role, [
    Validators.required
  ]);

  objectif = new FormControl(this.user.Objectif_De_Chiffre, [
    Validators.required,
  ]);

  montant = new FormControl(this.user.Montant_Signe);


  userForm: FormGroup;

  ngOnInit(): void {


    this.userForm = new FormGroup({
      'username': this.username,
      'password': this.password,
      'role': this.role,
      'objectif': this.objectif,
      'montant': this.montant
    });
  }


  addNewUser() {

    if (this.userForm.invalid) {
      return this.toastr.error('Veuillez saisir les champs manquants');
    }

    this.user.username = this.username.value;
    this.user.password = this.password.value;
    this.user.role = this.role.value;
    this.user.Montant_Signe = this.montant.value;
    this.user.Objectif_De_Chiffre = this.objectif.value;

    this.userService.AddUser(this.user).subscribe(res => {
      this.user = res;


      this.toastr.success('Membre ajouté avec succès');
      this.router.navigate(['/dashboard/users/']);
    }, (err) => {
      console.log(err);
      this.toastr.error(err.error.message);

    })
  }




}
