import { TableService } from './table.service';
import { Component, ViewChild, OnInit} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort} from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { People } from './people.model';
import { ActivatedRoute, Router } from "@angular/router";


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})

export class TableComponent implements OnInit {

  displayedColumns: string[] = ['name', 'phoneNumber', 'action'];
  dataSource: any;
  people: People[];
  delPerson: People;

  constructor(private tableService: TableService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    /* Consuming API, doing filtering and pagination  */
    this.tableService.read().subscribe(response => {
      this.dataSource = new MatTableDataSource(response);

      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator
    })

    /* Finding the element in order to delete*/
    const id = +this.route.snapshot.paramMap.get('id');
    if (id > 0)
    this.tableService.readById(id).subscribe((response) => {
      this.delPerson = response;
    });

  }

  /* Sort and pagination Implementation */

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  /* Filter implementation */

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  deletePerson(): void {
    this.tableService.delete(this.delPerson.id).subscribe(() => {
      this.router.navigate(['/1'])
      window.location.reload()
    }
    )
  }
   
}