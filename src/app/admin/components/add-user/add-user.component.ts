import { Component } from '@angular/core';
import { AppUser } from '../../../shared/models/user';
import { UserService } from '../../../shared/services/user.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent {

  user: AppUser = new AppUser();

  submitted = false;

  constructor(private userService: UserService) { }
  
  
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
