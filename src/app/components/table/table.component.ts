import { People } from './people.model';
import { TableService } from './table.service';
import { Observable } from 'rxjs';
import { Component, ViewChild, AfterViewInit} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import {LiveAnnouncer} from '@angular/cdk/a11y';


export class User {
  userName: string;
  age: number;
}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements AfterViewInit {

  constructor(private tableService: TableService, private _liveAnnouncer: LiveAnnouncer) {}

  displayedColumns: string[] = ['position', 'name', 'phoneNumber'];
  dataSource: any;

  /* Filter implementation */

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  /* Sort Implementation */

  @ViewChild(MatSort) sort: MatSort;

  /* For avoiding trouble of reponse time, used afterviewinit with liveAnnouncer. Live announcer ensures the display of the sorted table*/

  ngAfterViewInit() {
    this.tableService.read().subscribe((response: any) =>
    {this.dataSource = new MatTableDataSource(response) /* getting the data of the table.json, to simulate an API consumption */
    this.dataSource.sort = this.sort})
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