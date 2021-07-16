import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormArray } from '@angular/forms';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { User } from 'src/app/model/user';
import { MatDialogRef } from '@angular/material/dialog';
import { ConversationService } from 'src/app/services/api/conversation.service';
@Component({
  selector: 'app-new-conversation',
  templateUrl: './new-conversation.component.html',
  styleUrls: ['./new-conversation.component.scss']
})
export class NewConversationComponent {
  users: FormArray
  availableUsers : User[];
  addChatForm: FormGroup;


  constructor(
    private dialogRef: MatDialogRef<NewConversationComponent>,
    private fb: FormBuilder,
    private conversationService: ConversationService,
    @Inject(MAT_DIALOG_DATA) public data: {currentUser: string, allUsers: User[]}
    ) {}

  ngOnInit() {
    this.availableUsers = this.data.allUsers.filter(usr => usr.id != parseInt(this.data.currentUser))
    this.addChatForm = this.fb.group({
      type: 'private',
      name: '',
      users: this.fb.array([])
    });
    this.addChatForm.get('type').valueChanges.subscribe(val => {
      if (this.addChatForm.get('type').value == 'group') {
        this.addChatForm.controls['name'].setValidators([Validators.required]);
      } else {
        this.addChatForm.controls['name'].clearValidators();
      }
      this.addChatForm.controls['name'].updateValueAndValidity();
    });
    this.addUser()
  }

  onSubmit() {
    let userList = this.userForms.value.map(objt => objt.id)
    .filter(this.onlyUnique)
    .concat([this.data.currentUser])
    .join(',')
    
    if (this.chatType.value == 'private') this.conversationService
      .addPersonalConversaion({'users': userList})
      .subscribe(x => this.dialogRef.close(x))
    else  if (this.chatType.value == 'group') this.conversationService
      .addPersonalConversaion({'users': userList, 'name': this.addChatForm.get('name').value})
      .subscribe(x => this.dialogRef.close(x))
  }

  closeDialog() {
    this.dialogRef.close(null);
  }

  get userForms() {
    return this.addChatForm.get('users') as FormArray
  }

  get chatType() {
    return this.addChatForm.get('type')
  }

  addUser() {
    const usrr = this.fb.group({
      id: ''
    });
    usrr.controls['id'].setValidators([Validators.required]);
    this.userForms.push(usrr)
  }
  
  delUser(i) {
    this.userForms.removeAt(i-1)
  }

  onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }

}
