import { Component, OnInit, Output, EventEmitter, Pipe, PipeTransform } from '@angular/core';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import * as _ from 'lodash';
import { GroupChatService } from '../services/group-chat.service';
import { UsersService } from '../services/users.service';
import { MessagesService } from '../services/messages.service';
import { DataService } from '../services/data.service';
import { StatisticsService } from '../services/statistics.service';

export interface Config {
  GroupChats: any[]
  
}
export interface MessageConfig {
  Messages: any[]
  
}
export interface UserConfig {
  Users: any[]
}
export interface StatsConfig {
  Stats: any[]
}

declare var $: any;


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [GroupChatService, UsersService, MessagesService, StatisticsService]
})


export class DashboardComponent implements OnInit {
  public gid: number;
  number: number;
  config: Config = {
    GroupChats: ["No GroupChats to be Shown"]
  };
  Chats: Config = {
    GroupChats: []
  };
  messageConfig: MessageConfig = {
    Messages: ["No Messages to be Shown"]
  };
  userConfig: UserConfig  = {
    Users: ["No Users to be Shown"]
  };
  hashConfig: StatsConfig  = {
    Stats: ["No Hashtags to be Shown"]
  };
  likeConfig: StatsConfig  = {
    Stats: ["No likes to be Shown"]
  };
  dislikeConfig: StatsConfig  = {
    Stats: ["No dislikes to be Shown"]
  };
  replyConfig: StatsConfig  = {
    Stats: ["No replies to be Shown"]
  };
  messageStatConfig: StatsConfig  = {
    Stats: ["No messages to be Shown"]
  };
  userStatConfig: StatsConfig  = {
    Stats: ["No messages to be Shown"]
  };
  userChatConfig: UserConfig = {
    Users: ["No Chats to be shown"]
  };
  test: any;
  user: string;
  GroupChat: any[] = [];
 

  hashStats: any[] = new Array();
  likeStats: any[] = new Array();
  dislikeStats: any[] = new Array();
  replyStats: any[] = new Array();
  messageStats: any[] = new Array();
  userStats: any[] = new Array();

  
  
  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
}

getUsers() {
  (async () => {
    // Do something before delay


    this.userService.getUsers()
      .subscribe((data: UserConfig) => this.userConfig = {

        Users: data['Users']
      });
    await this.delay(50);
  })();

}
  showChats(){
  
    (async () => { 
      // Do something before delay
    
  
      this.service.getAllChats()
      .subscribe((data: Config) => this.config = {

        GroupChats: data['GroupChats']
      });

      await this.delay(50);
      for(var i = 0; i< this.config.GroupChats.length;i++ ){
        this.userService.getUsersInChat(this.config.GroupChats[i].gid)
        .subscribe((data: UserConfig) => this.userChatConfig = {
  
          Users: data['Users']
        });
        await this.delay(50);
        for(var j=0; j<this.userChatConfig.Users.length; j++){
          if(this.user == this.userChatConfig.Users[j].uname){
            this.Chats.GroupChats.push(this.config.GroupChats[i]);
            console.log(this.user);
            break;
          }
        }

    }
      
     
  })();
    
  }

  createChat(name){
    (async () => { 
      // Do something before delay
      for(var i=0;i<this.userConfig.Users.length;i++){
        if(this.user == this.userConfig.Users[i].uname){
          this.number = i;
          break;
        }
      }
      
      this.service.createGroupChat(this.userConfig.Users[this.number].uid, JSON.parse(JSON.stringify({ gname: name, gpicture_id: 'id.jpg' })))
      .subscribe(chat => this.GroupChat.push(chat))  

      await this.delay(50);
      this.showChats();


  })();
  }

  
  showModal(): void {
    $("#myModal").modal('show');
  }
  sendModal(name): void {
    this.createChat(name.value);
    this.hideModal();
  }
  hideModal(): void {
    document.getElementById('close-modal').click();
  }

  
  refresh(): void {
    window.location.reload();
}
  getGid(gid){
    this.data.changeGid(gid);
  }
  constructor(private stats: StatisticsService, private data: DataService, private breakpointObserver: BreakpointObserver, private service: GroupChatService, private messageService: MessagesService, private userService: UsersService) {
  }
  getHashStats(){
    (async () => { 

    this.stats.getHashStats()
    .subscribe((data: StatsConfig) => this.hashConfig = {
      Stats: data['Stats']
      
    });
    await this.delay(50);
    for(var i =0; i<this.hashConfig.Stats.length;i++){
      
        this.hashStats.push([this.hashConfig.Stats[i].Hashtag, this.hashConfig.Stats[i].Times_Used]);
    }
  })();

  } 
  getReplyStats(){
    (async () => { 

    this.stats.getRepliesStats()
    .subscribe((data: StatsConfig) => this.replyConfig = {
      Stats: data['Stats']
      
    });
    await this.delay(50);
    for(var i =0; i<this.replyConfig.Stats.length;i++){
      
        this.replyStats.push([this.replyConfig.Stats[i].Date, this.replyConfig.Stats[i].Amount_Per_Day]);
    }
  })();

  } 
  getDislikeStats(){
    (async () => { 

    this.stats.getDislikeStats()
    .subscribe((data: StatsConfig) => this.dislikeConfig = {
      Stats: data['Stats']
      
    });
    await this.delay(50);
    for(var i =0; i<this.dislikeConfig.Stats.length;i++){
      
        this.dislikeStats.push([this.dislikeConfig.Stats[i].Date, this.dislikeConfig.Stats[i].Amount_Per_Day]);
    }
  })();

  } 

  getLikeStats(){
    (async () => { 

    this.stats.getLikeStats()
    .subscribe((data: StatsConfig) => this.likeConfig = {
      Stats: data['Stats']
      
    });
    await this.delay(50);
    for(var i =0; i<this.likeConfig.Stats.length;i++){
      
        this.likeStats.push([this.likeConfig.Stats[i].Date, this.likeConfig.Stats[i].Amount_Per_Day]);
    }
  })();

  } 
  getMessageStats(){
    (async () => { 

    this.stats.getMessageStats()
    .subscribe((data: StatsConfig) => this.messageStatConfig = {
      Stats: data['Stats']
      
    });
    await this.delay(50);
    for(var i =0; i<this.messageStatConfig.Stats.length;i++){
      
        this.messageStats.push([this.messageStatConfig.Stats[i].Date, this.messageStatConfig.Stats[i].Amount_Per_Day]);
    }
    await this.delay(50);
  })();

  } 
  getUserStats(){
    (async () => { 

    this.stats.getUserStats()
    .subscribe((data: StatsConfig) => this.userStatConfig = {
      Stats: data['Stats']
      
    });
    await this.delay(50);
    for(var i =0; i<this.userStatConfig.Stats.length;i++){
      
    }
    await this.delay(50);
  })();

  } 
 

  ngOnInit() {
   
      this.getHashStats();
      this.getDislikeStats();
      this.getReplyStats();
      this.getLikeStats();
      this.getMessageStats();
      this.getUserStats();
   
    
    // this.data.currentUser.subscribe(user => this.user = user)
    
    this.getUsers();
    this.user = sessionStorage.getItem("user");

   
    this.showChats();
    this.data.currentMessage.subscribe(message => this.gid = message)

  }
}
