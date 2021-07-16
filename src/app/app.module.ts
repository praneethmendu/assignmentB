import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainPageComponent } from './components/main-page/main-page.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConversationService } from './services/api/conversation.service';
import { UserService } from './services/api/user.service';
import { LoginComponent } from './components/login/login.component';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { HttpClientModule } from '@angular/common/http';
import { ConversationsComponent } from './components/conversations/conversations.component';
import { MatExpansionModule} from '@angular/material/expansion';
import { ChatboxComponent } from './components/chatbox/chatbox.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { NewConversationComponent } from './components/new-conversation/new-conversation.component';
import { MatDialogModule} from '@angular/material/dialog';
import { MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatTooltipModule} from '@angular/material/tooltip';
@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    LoginComponent,
    ConversationsComponent,
    ChatboxComponent,
    NewConversationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatExpansionModule,
    ScrollingModule,
    MatDialogModule,
    MatButtonToggleModule,
    MatTooltipModule,
  ],
  exports: [ScrollingModule],
  providers:  [ConversationService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
