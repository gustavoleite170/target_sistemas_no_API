import { People } from './../table/people.model';
import { TableService } from './../table/table.service';
import { Component, OnInit} from '@angular/core';
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
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {


  /* Required error */
  nameFormControl = new FormControl('', [Validators.required]);
  phoneFormControl = new FormControl('', [Validators.required]);

  matcher = new MyErrorStateMatcher();

  /* Clear buttons */
  person: People = {
    name: "",
    phoneNumber: ""
  }

  clearName(){
    this.person.name= '';
  }

  clearPhone(){
    this.person.phoneNumber= '';
  }

  constructor(private tableService: TableService) { }

  ngOnInit(): void {
  }

  createPerson(): void {
    if (this.person.name !== "" && 
    this.person.phoneNumber !== ""){
      this.tableService.create(this.person).subscribe(() =>
      window.location.reload())
    }
  }
  

  

}
