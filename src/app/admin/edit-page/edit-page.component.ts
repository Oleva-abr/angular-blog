import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Post } from './../shared/interfaces';
import { PostService } from './../shared/services/post.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, switchMap } from 'rxjs';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss']
})
export class EditPageComponent implements OnInit, OnDestroy {
  form!: FormGroup;
  post!: Post;
  submitted=false;

  uSub: Subscription | undefined

  constructor(
    private route: ActivatedRoute,
    private postService: PostService,
  ) { }



  ngOnInit(): void {
    this.route.params
      .pipe(switchMap((params: Params) => {
        return this.postService.getById(params['id'])
      })).subscribe((post: Post) => {
        this.post = post
        this.form = new FormGroup({
          title: new FormControl(post.title, Validators.required),
          text: new FormControl(post.text, Validators.required),
        })
      })
  }
  ngOnDestroy() {
    if (this.uSub) {
      this.uSub.unsubscribe()
    }
  }
  
  submit() {
    if (this.form.invalid) {
      return
    }

    this.submitted = true

    this.uSub = this.postService.update({
      ...this.post,
      text: this.form.value.text,
      title: this.form.value.title
    }).subscribe(() => {
      this.submitted = false
    })
  }
}
