import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CommentsApiService {

  baseUrl: string = 'http://localhost:3000/api';

  constructor(private readonly http: HttpClient) { }

}
