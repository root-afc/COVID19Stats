import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Covid19} from '../entities/covid19';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class Covid19Service {
  info: Covid19[];
  constructor(private http: HttpClient) { }
  CargarInfo(): Observable<Covid19[]>{
    const ruta = 'http://localhost/Api.php';
    return this.http.post<Covid19[]>(ruta, null).pipe(
      map((res) => {
        this.info = res;
        return res;
      })
    );
  }
}
