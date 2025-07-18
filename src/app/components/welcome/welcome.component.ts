import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  userName: string = '';

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('user_data') || '{}');
    this.userName = user.name || 'User';
  }
}