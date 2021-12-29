import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.servisre';

@Component({
  selector: 'app-admin-layaut',
  templateUrl: './admin-layaut.component.html',
  styleUrls: ['./admin-layaut.component.scss']
})
export class AdminLayautComponent implements OnInit {

  constructor(
    private router:Router,
    public auth: AuthService) { }

  ngOnInit(): void {
  }
logout(event:Event){
  event.preventDefault()
  this.auth.logout()
  this.router.navigate(['/admin','login'])
}
}
