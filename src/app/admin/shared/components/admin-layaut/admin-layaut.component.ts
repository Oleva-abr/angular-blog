import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-layaut',
  templateUrl: './admin-layaut.component.html',
  styleUrls: ['./admin-layaut.component.scss']
})
export class AdminLayautComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }
logout(event:Event){
  event.preventDefault()
  this.router.navigate(['/admin','login'])
}
}
