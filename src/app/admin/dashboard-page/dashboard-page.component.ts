import { PostService } from './../shared/services/post.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Post } from '../shared/interfaces';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit, OnDestroy {

  posts!:Post[]
  postSub!:Subscription
  constructor(private postservice: PostService) { }

  ngOnInit() {
    this.postSub=this.postservice.getAllposts().subscribe(posts=>{
      this.posts=posts
    })
  }
  remove(id: string){

  }
  ngOnDestroy() {
    if(this.postSub){
      this.postSub.unsubscribe()
    }
  }
}
