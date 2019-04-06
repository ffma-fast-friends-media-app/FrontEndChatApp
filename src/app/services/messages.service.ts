import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Config {
  Messages: any[]

}


@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  chatUrl: string;
  getMessages(uid, gid){
    this.chatUrl = 'http://127.0.0.1:5000/FFMA/users/'+uid+'/groupChats/'+gid+'/messages';
    return this.http.get<Config>(this.chatUrl);
  }
  

  constructor(private http:HttpClient) { }
}
