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

  posts:Post[]=[]
  postSub!:Subscription
  deleteSub!: Subscription
  searchStr = ''
  constructor(private postservice: PostService) { }

  ngOnInit() {

    this.postSub=this.postservice.getAllposts().subscribe(posts=>{
      this.posts=posts
    })
  }
  remove(id: string | undefined = ''): void{
    this.deleteSub = this.postservice.remove(id).subscribe(()=>
    this.posts = this.posts.filter(post=>post.id != id)
)}
  ngOnDestroy() {
    if(this.postSub){
      this.postSub.unsubscribe()
    }
    if(this.deleteSub){
      this.deleteSub.unsubscribe()
    }
  }
}
