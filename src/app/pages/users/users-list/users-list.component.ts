import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../../utils/services/users.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {
   
  
  users: any = []; 

  constructor(private userService : UsersService , private toastr: ToastrService ) { }

  ngOnInit(): void {
    this.refreshUsers();
  }

  
 
  refreshUsers(){
    this.userService.getAllUsers().subscribe(res => {
      console.log(res);
      this.users = res;
    });
  }

  deleteMethod(id){
    if(confirm("T'es sûr de supprimer cet utilisateur? ")) {
        this.userService.DeleteUser(id).subscribe((res) => {
          this.refreshUsers(); 
          this.toastr.success('Supprimé avec succés');
        }, (e) => {
          this.toastr.error(e.error.message);
        })
     }
  }



}
