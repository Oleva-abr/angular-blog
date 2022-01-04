import { environment } from './../../../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { FbCreateResponse, Post } from '../interfaces';
import {map } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class PostService{
constructor(private http: HttpClient){}
create(post: Post): Observable<Post>{
return this.http.post(`${environment.fbDbUrl}/posts.json`, post)
.pipe(
    map((response)=> response as FbCreateResponse ),
    map((response: FbCreateResponse )=>{
    return ({
        ...post,
        id: response.name,
        date: new Date(post.date)
    }) ;
}))
}
}