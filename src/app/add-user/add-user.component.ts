import { Component } from '@angular/core';
import { AppUser } from '../shared/services/user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent {

  user: AppUser = new AppUser();

  submitted = false;

  constructor(private userService: UserService) { }
  
  // adicionarUsuario() {
  //   this.userService.addNewUser("62289836", "Jane", "Doe", true).then(() => {
  //     this.submitted = true;
  //   });
  // }

  // async adicionarUsuario() {
  //   let allUsers = await this.userService.getAllUsers();
  //      console.log(allUsers);
  //   }
  adicionarUsuario(): void {   
    
    this.userService.create(this.user)
    .then(() => {
      this.submitted = true;
      console.log('veio')
    },
    (err)=> console.log(err)
    ).catch((err)=> console.log(err));
    
  }

  newUser(): void {
    this.submitted = false;
    this.user = new AppUser();
  }
}
