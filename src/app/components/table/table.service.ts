import { Observable } from 'rxjs';
import { People } from './people.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})

export class TableService {

  generalUrl= "./table.json"

  constructor(private http: HttpClient) { }

  showOnConsole(msg: string): void{
    console.log(msg);
  }

  read(): Observable<People[]>{
    return this.http.get<People[]>(this.generalUrl)
  }
}
