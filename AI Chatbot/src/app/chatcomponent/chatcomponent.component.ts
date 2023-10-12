import { Component ,ViewChild,ElementRef,Input, AfterViewInit} from '@angular/core';
import {FormControl,FormGroup,Validators} from '@angular/forms';
import { ServiceService} from '../service.service';

import jwt_decode from 'jwt-decode';

export interface Message{
  type:string,
  message:string
  image:string
}

@Component({
  selector: 'app-chatcomponent',
  templateUrl: './chatcomponent.component.html',
  styleUrls: ['./chatcomponent.component.css']
})

export class ChatcomponentComponent {
  isopen=false;
  loading= false;
  isopenbtn= true;
  isbtnclicked = false;
  show=true;
  login = true;
  chatimage:string="assets/images/robotic.png";
  chatgirl:string="assets/images/chatgirl.png";
  chatuser:string="assets/images/user.png";
  chatpop:string="assets/images/chatimg.png";
  today = new Date();
  messages:Message[] = [];
  chat:Message[][] = [];
  payload = {message: "",email: ""}
  chatForm = new FormGroup({
    message:new FormControl('',[Validators.required])
  });

  xyz="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbElkIjoiYmhvcGFsQGlyY2xhc3Mub3JnIiwidXNlcm5hbWUiOiJKb2huIERvZSIsIm1vYmlsZV9ubyI6Ijc4OTQ1NjEyMzciLCJpYXQiOjE1MTYyMzkwMjJ9.8Z9sfFgZrldZWtW1CV1m-mHRnGVabYtiXCwv0HHp0a8";
  token=localStorage.getItem('token');
  decoded:any = "";
  emailid: string = '';
  
  

  @ViewChild('scrollMe') private myScrollContainer:any;
  constructor(private chatServiceService:ServiceService){

  }
  ngOnInit():void{
    
    if (this.token){
      this.decoded = jwt_decode(this.token);
      this.emailid=this.decoded.emailId;
      this.messages.push({
        type:'client',
        message:'Hi, '+this.decoded.username +' I am your support agent how may i help you :)',
        image:this.chatgirl
      });
    }else{
      this.messages.push({
        type:'client',
        message:'Hi, I am your support agent how may i help you :)',
        image:this.chatgirl
      });
    }
    
  }

  openSupportPopup(){
    this.chat.push(this.messages)
    console.log(this.chat[0])
    this.isopen=!this.isopen;
    this.isopenbtn=!this.isopenbtn;
  }

  addquestion(val:string){
    this.isbtnclicked=true;
    const sendMessage = val;
    this.loading=true;
    this.messages.push({
      type:'user',
      message: sendMessage,
      image:this.chatuser
    });
    this.payload = {
      message: sendMessage,
      email: this.emailid
    }
    this.chatForm.reset();
    this.chatServiceService.sendMessage(this.payload).subscribe((response:any)=>{
      setTimeout( () => {
            this.loading=false;
            this.messages.push({
              type:'client',
              message: response.answer,
              image:this.chatgirl
            });
        },500)
      
    });
    this.scrollToBottom()
    
  }

  sendMessage(){
    this.isbtnclicked=true;
    const sendMessage = this.chatForm.value.message!;
    this.loading=true;
    this.messages.push({
      type:'user',
      message: sendMessage,
      image:this.chatuser
    });
    this.payload = {
      message: sendMessage,
      email: this.emailid
    }
    this.chatForm.reset();
    this.chatServiceService.sendMessage(this.payload).subscribe((response:any)=>{
      setTimeout( () => {
            this.loading=false;
            this.messages.push({
              type:'client',
              message: response.answer,
              image:this.chatgirl
            });
        },500)
      
    });
    this.scrollToBottom()
  }
  
  scrollToBottom(){
    setTimeout(()=>{
      try{
        this.myScrollContainer.nativeElement.scrollTop=
        this.myScrollContainer.nativeElement.scrollHeight+5000;
      }catch(err){}
    },150);
  }

  ngAfterViewInit() {         
  }  

  ngAfterViewChecked(){
    this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight+500;
  }

  showchat(){
    this.show=!this.show;

  }

}
