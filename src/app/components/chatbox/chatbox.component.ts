import { Component, OnInit, Input, ViewChild , ElementRef} from '@angular/core';
import { ConversationService } from 'src/app/services/api/conversation.service';
import { Message } from 'src/app/model/message';
import { User } from 'src/app/model/user';
@Component({
  selector: 'app-chatbox',
  templateUrl: './chatbox.component.html',
  styleUrls: ['./chatbox.component.scss']
})
export class ChatboxComponent implements OnInit {
  @ViewChild('scrollMe') scrollMe: ElementRef;
  @Input() userId: string;
  @Input() conversationId: string;
  @Input() allUsers: User[]
  newMsg='';
  activeUsers=[];
  
  allMessages: Message[]
  constructor(private conversationService: ConversationService) { }

  ngOnInit(): void {
    this.updateChat()
  }

  ngOnChanges(): void {
    this.updateChat()
  }

  ngAfterViewInit(): void {
  }

  updateChat(): void {
    this.conversationService.limitedMessages(parseInt(this.conversationId), 100, 0)
    .subscribe(x => {
      this.allMessages = x.reverse()
      setTimeout(() => this.scrollToBottom(), 10)
      this.getLastSeen()
    })
    this.conversationService.putLastSeen(parseInt(this.conversationId), parseInt(this.userId))


  }

  formatTs(stamp: string): string {
    let splitTs = stamp.split(' ')
    return splitTs[0].slice(-5) + ' ' + splitTs[1].slice(0,5)
  }

  scrollToBottom(): void {
    try {
        this.scrollMe.nativeElement.scrollTop = this.scrollMe.nativeElement.scrollHeight;
    } catch(err) { }    
  }

  sendMsg(): void {
    this.conversationService.sendMsg(parseInt(this.conversationId), {"message":this.newMsg,"senderId":parseInt(this.userId)})
    .subscribe(x => {
      this.newMsg = ''
      this.updateChat()
    })
  }

  getUser(id): string {
    let selected = this.allUsers.find(usrr => usrr.id == id)
    if (selected) return selected.name
    return ''
  }

  getLastSeen() {
    this.activeUsers = this.allUsers.filter(usrr => 
      this.allMessages.map(msg => msg.senderId).includes(usrr.id))
    console.log('act', this.activeUsers);
    Promise.all(
      this.activeUsers
        .map(usrr => this.conversationService
          .getLastSeen(parseInt(this.conversationId), usrr.id)
          .toPromise())
    ).then((values) => {
      this.activeUsers = this.activeUsers.map((usrr, i) => {
          usrr.last = values[i]
          return usrr
      })
      console.log(this.activeUsers);
    })
  }

  getToolTip(id) {
    let hovered = this.activeUsers.find(usrr => usrr.id == id)
    if (hovered && 'name' in hovered && 'last' in hovered)
      return `${hovered.name} was last seen ${hovered.last.lastseen ? this.formatTs(hovered.last.lastseen) : 'never'}`
    return ''
  }
}
