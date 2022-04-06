import { Observable } from 'rxjs';
import { People } from './people.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})

export class TableService {

  generalUrl= "http://localhost:3001/people"

  constructor(private http: HttpClient) { }

  read(): Observable<People[]>{
    return this.http.get<People[]>(this.generalUrl)
  }

  readById(id: number): Observable<People> {
    const url = `${this.generalUrl}/${id}`;
    return this.http.get<People>(url);
  }

  create(people: People): Observable<People>{
    return this.http.post<People>(this.generalUrl, people)
  }

  delete(id: number): Observable<People>{
    const url = `${this.generalUrl}/${id}`
    return this.http.delete<People>(url)
  }
}
