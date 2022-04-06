import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TableService } from '../table/table.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router,, private tableService: TableService) { }

  ngOnInit(): void {
    /* Finding the element in order to delete*/
    const id = +this.route.snapshot.paramMap.get('id');
    this.tableService.readById(id).subscribe((response) => {
      this.delPerson = response;
    });
  }

  deletePerson(): void {
    this.tableService.delete(this.delPerson.id).subscribe(() => {
      this.router.navigate(['/1'])
      setTimeout(() => window.location.reload(), 500)
    }
    )
  }

}
