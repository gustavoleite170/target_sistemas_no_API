import { Observable } from 'rxjs';
import { People } from './people.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})

export class TableService {

  generalUrl= "assets/table.json"

  constructor(private http: HttpClient) { }

  read(): Observable<People[]>{
    return this.http.get<People[]>(this.generalUrl)
  }

  create(people: People): Observable<People>{
    return this.http.post<People>(this.generalUrl, people)
  }
}
