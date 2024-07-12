import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/enviroments/enviroments.local';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private httpClient: HttpClient) {}

  search(keyword: string): Observable<any> {
    return this.httpClient.get(`${environment.baseUrl}/search?q=${keyword}`);
  }
}
