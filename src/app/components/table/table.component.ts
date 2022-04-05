import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import {LiveAnnouncer} from '@angular/cdk/a11y';

export interface Person {
  name: string;
  position: number;
  phoneNumber: string;
}

export class User {
  userName: string;
  age: number;
}

const ELEMENT_DATA: Person[] = [
  {position: 1, name: "Maria Dolores", phoneNumber: "(27) 3496-4172"},
  {position: 2, name: "Reginaldo Soares", phoneNumber: "(84) 2353-7216"},
  {position: 3, name: "Francisco Silva", phoneNumber: "(15) 3797-4431"},
  {position: 4, name: "Raimundo Reis", phoneNumber: "(43) 2312-1248"},
  {position: 5, name: "Sérgio Fagundes", phoneNumber: "(34) 2878-5688"},
  {position: 6, name: "Hanna Spector", phoneNumber: "(54) 3700-1787"},
  {position: 7, name: "Manoel Souza", phoneNumber: "(69) 2858-7155"},
  {position: 8, name: "Felipe Mendez", phoneNumber: "(61) 3218-2586"},
  {position: 9, name: "Ricardo Patriota", phoneNumber: "(38) 2336-7087"},
  {position: 10, name: "José Ferreira Leite", phoneNumber: "(94) 2347-4826"},
];


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements AfterViewInit {

  displayedColumns: string[] = ['position', 'name', 'phoneNumber'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);


  /* Filter implementation */

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  /* Sort Implementation */

  @ViewChild(MatSort) sort: MatSort;

  constructor(private _liveAnnouncer: LiveAnnouncer) { 
    
  }

  /* For avoiding trouble of reponse time, used afterviewinit with liveAnnouncer. Live announcer ensures the display of the sorted table*/

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

/* Trying to make the adder */


  columnsToDisplay: string[] = ["userName", "age"];
  user = new User();
  userData: User[]= [
      { userName: "Wacco", age: 12 },
      { userName: "Wacca", age: 13 },
      { userName: "Waccu", age: 14 }
  ];
  myDataArray = new MatTableDataSource(this.userData);

  addName() {
      let newUser : User = {
        userName: this.user.userName,
        age: this.user.age
      }
      this.userData.push(newUser);
      this.myDataArray.data = this.userData;
      console.log(this.user)
      console.log(this.userData)
  }
    
}