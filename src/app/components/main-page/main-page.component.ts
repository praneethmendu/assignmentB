import { Component } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { NewConversationComponent } from '../new-conversation/new-conversation.component';
import { UserService } from 'src/app/services/api/user.service';
import { User } from 'src/app/model/user';
@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent {
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  userPresent= false;
  userId : string
  userName : string
  conversationId: number = null
  allUsers: User[];
  constructor(
    private breakpointObserver: BreakpointObserver,
    public dialog: MatDialog,
    private userService: UserService) {}

  ngOnInit() {
    this.getUser()
    this.userService.allUsers().subscribe(x => {
      this.allUsers = x})
  }
  getUser() {
    if (localStorage.getItem("cool-id") && localStorage.getItem("cool-name")) {
      this.userId = localStorage.getItem("cool-id")
      this.userName =  localStorage.getItem("cool-name")
      this.userPresent= true
    } else {
      this.userPresent= false
    }
  }
  deleteUser() {
    localStorage.removeItem('cool-id');
    localStorage.removeItem('cool-name');
    this.userPresent= false
  }
  getChat(sentId) {
    this.conversationId = sentId
  }

  openDialog() {
    const dialogRef = this.dialog.open(NewConversationComponent, {
      maxHeight: '80vh',
      maxWidth: '600px',
      data: {'currentUser': this.userId, 'allUsers': this.allUsers}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && 'id' in result) {
        this.conversationId = result.id
      }
      console.log(`Dialog result: ${JSON.stringify(result)}`);
    });
  }

 }
