import { TableService } from './table.service';
import { Component, ViewChild, OnInit} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort} from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { People } from './people.model';
import people from './tgt_sistemas_back.json';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';


/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})

export class TableComponent implements OnInit {

  /* +=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+ */
  /* +=+=+=+=+=+ FORM PART =+=+=+=+=+= */
  /* +=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+ */

  /* Required error */
  nameFormControl = new FormControl('', [Validators.required]);
  phoneFormControl = new FormControl('', [Validators.required]);

  matcher = new MyErrorStateMatcher();

  /* Clear buttons */
  person: People = {
    name: "",
    phoneNumber: ""
  }

  regexp = new RegExp(/^1\d\d(\d\d)?$|^0800 ?\d{3} ?\d{4}$|^(\(0?([1-9a-zA-Z][0-9a-zA-Z])?[1-9]\d\) ?|0?([1-9a-zA-Z][0-9a-zA-Z])?[1-9]\d[ .-]?)?(9|9[ .-])?[2-9]\d{3}[ .-]?\d{4}$/gm)

  clearName(){
    this.person.name= '';
  }

  clearPhone(){
    this.person.phoneNumber= '';
  }

  createPerson(): void {
    if (this.person.name !== "" && 
    (this.person.phoneNumber !== "" && this.regexp.test(this.person.phoneNumber))){
      const join = {
        "name": this.person.name,
        "phoneNumber": this.person.phoneNumber
      }
      this.data.push(join)
      this.dataSource = new MatTableDataSource(this.data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator
      alert("Informação adicionada com sucesso")
    }
  }
 
  /* +=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+ */
  /* +=+=+=+=+=+ TABLE PART =+=+=+=+=+ */
  /* +=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+ */

  displayedColumns: string[] = ['name', 'phoneNumber', 'action'];
  dataSource: any;
  data: People[] = people.people;
  
  

  /* Sort and pagination Implementation */

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  /* Filter implementation */

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  /* Delete information name and number */

  deletePerson(element){
    const removed = this.data.filter((value) => value !== element)
    this.data = removed;
    this.dataSource = new MatTableDataSource(this.data);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator
    alert(`Informações de ${element.name} deletadas com sucesso`)
    
  }

  /* +=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+ */
  /* +=+=+=+=+ GENERAL PART +=+=+=+=+= */
  /* +=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+ */

  constructor(private tableService: TableService) {}

  ngOnInit(): void {

    /* +=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+ */
    /* +=+=+=+=+=+ TABLE PART =+=+=+=+=+ */
    /* +=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+ */

    this.tableService.read().subscribe(response => {
      this.dataSource = new MatTableDataSource(this.data);

      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator
    })
  }
   
}