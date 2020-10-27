import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataSourceService {
  httpHeaders = new HttpHeaders({
    'Content-Type':  'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, DELETE',
    'Access-Control-Allow-Headers':
        'Content-Type,X-Amz-Date,Authorization,X-Api-Key,Origin,Accept,Access-Control-Allow-Headers,Access-Control-Allow-Methods,Access-Control-Allow-Origin'
  })

  constructor(
    private _http: HttpClient
  ) { }

  post(body = {}, url: String): Observable<any> {
    return this._http.post(environment.url_base + url, body, { headers: this.httpHeaders });
  }

  get(url: String): Observable<any> {
    return this._http.get(environment.url_base + url, { headers: this.httpHeaders });
  }

  retrieve(url: String, id: string): Observable<any> {
    return this._http.get<any>(environment.url_base + url + id, { headers: this.httpHeaders });
  }

  delete(url: String): Observable<any> {
    return this._http.delete<any>(environment.url_base + url, { headers: this.httpHeaders });
  }

  update(body, url: String): Observable<any> {
    return this._http.put<any>(environment.url_base + url, body, { headers: this.httpHeaders });
  }
}
