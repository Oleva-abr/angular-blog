import { environment } from './../../../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { Post } from '../interfaces';
import {map } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class PostService{
constructor(private http: HttpClient){}
create(post: Post): Observable<Post>{
return this.http.post<Post>(`${environment.fbDbUrl}/posts.json`, post)
.pipe(
    map((response: Post )=>{
    return ({
        ...post,
        id: response.name,
        date: new Date(post.date)
    }) ;
}))
}
getAllposts(): Observable<Post[]>{
    return this.http.get(`${environment.fbDbUrl}/posts.json`)
    .pipe(map((response:{[key:string]: any})=>{ 
       return  Object.keys(response)
        .map(key=>({
            ...response[key],
            id:key,
            date: new Date(response[key].date)
        }))
     
    }))
}
}