import { Component, ViewChild, AfterViewInit} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import { People } from './people.model';
import table from './table';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})

export class TableComponent implements AfterViewInit {

  person: People = {
    name: "Jubiscreuza Tavares",
    phoneNumber: "(12) 9 9999-9990"
  }

  data = table;

  /* Function to add person and phone number */

  createPerson(){
    this.data.push(this.person)
    console.log(this.data)
  }

  constructor(private _liveAnnouncer: LiveAnnouncer) {}

  displayedColumns: string[] = ['name', 'phoneNumber'];
  dataSource: any;

  /* Filter implementation */

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  /* Sort and pagination Implementation */

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  /* To avoid trouble of reponse time, used afterviewinit with liveAnnouncer. Live announcer ensures the display of the sorted table*/

  ngAfterViewInit(): void {
    this.dataSource = new MatTableDataSource(this.data); /* getting the data of the table.json, to simulate an API consumption */
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }    
}