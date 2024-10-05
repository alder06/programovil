import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, retry } from 'rxjs';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  httpOptions = {
    headers: new httoHeaders(¨{
      `content-Type`: `application/json`,
      `Access-Control-Allow-origin`:`*`

  })
}

  apiUrl=`https://jsonplaceholder.typicode.com`


  constructor(private http:httpClient) { }

  getPosts():Observable<any>{
    return this.http.get(this.apiUrl + `/posts/`).pipe(retry(3));

  }
  getPost(id:any):Observable<any>{
    return this,this.http.get(this.apiUrl +`/posts/`+ id ).pipe(retry(3));
  }
  createPost(post:any)Observable<any>{
    return this.http.post(this.apiUrl+`/posts/`, post,this.httpOptions).pipe(retry(3));

  }

  updatePost(id:any,post:any):Observable<any>{
    return this.http.put(this.apiUrl+`/posts/`, id,post,this.httpOptions).pipe(retry(3));
  }

  deletePost(id:any):Observable<any>{
    return this.http.delete(this.apiUrl+`/posts/`, id,this.httpOptions)
  }
}
