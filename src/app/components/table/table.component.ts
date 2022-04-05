import { TableService } from './table.service';
import { Component, ViewChild, AfterViewInit, Input, OnInit} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import { People } from './people.model';
import table from './table';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})

export class TableComponent implements /* AfterViewInit, */ OnInit {

  data = table;
  displayedColumns: string[] = ['name', 'phoneNumber'];
  dataSource: any;
  people: People[];

  /* Function to add person and phone number */

  constructor(private tableService: TableService) {}

  ngOnInit(): void {
      this.tableService.read().subscribe(response => {
        this.people = response;
        console.log(this.people)
      })
  }

  

  /* Filter implementation */

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  /* Sort and pagination Implementation */

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  /* To avoid trouble of reponse time, used afterviewinit with liveAnnouncer. Live announcer ensures the display of the sorted table*/

  /* ngAfterViewInit(): void { */
    /* this.dataSource = new MatTableDataSource(this.data); */
    
    /* getting the data of the table.json, to simulate an API consumption */
    /* this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator
  } */
   
}