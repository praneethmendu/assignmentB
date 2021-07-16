import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { ConversationService } from 'src/app/services/api/conversation.service';
import { Conversation } from 'src/app/model/conversation';

@Component({
  selector: 'app-conversations',
  templateUrl: './conversations.component.html',
  styleUrls: ['./conversations.component.scss']
})
export class ConversationsComponent implements OnInit {
  @Input() userId: string;
  @Output() change = new EventEmitter<number>();
  @Output() newConversation = new EventEmitter<void>();
  priv: Conversation[]
  group: Conversation[]
  constructor(private conversationService:ConversationService ) { }

  ngOnInit(): void {
    this.conversationService.conversationByUser(parseInt(this.userId))
    .subscribe(allConvs=> {
      this.priv = allConvs.filter(conv => conv.conversation.type == 1)
      this.group = allConvs.filter(conv => conv.conversation.type == 2)
    })
  }

  redirect(convId: number): void {
    this.change.emit(convId)
  }

  addChat(): void {
    this.newConversation.emit()
  }

}
