import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.servisre';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit {

  constructor(private auth : AuthService) { }

  ngOnInit(): void {
  }
test(){
  console.log(this.auth.token)
}
}
