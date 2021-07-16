import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { User } from '../../model/user'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @Output() login = new EventEmitter<boolean>();
  showHint= false;
  inText:number;
  @Input() allUsers: User[];
  constructor() { }

  ngOnInit(): void {

  }

  checkUser(): void {
    let userObj = this.allUsers.find(user => user.id == this.inText) 
    if (userObj) {
      this.showHint = false
      localStorage.setItem('cool-id', userObj.id.toString());
      localStorage.setItem('cool-name', userObj.name);
      this.login.emit(true)
    } else {
      this.showHint = true
    }
  }
}
