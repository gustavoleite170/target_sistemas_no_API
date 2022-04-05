import { Component, OnInit, Output, EventEmitter} from '@angular/core';
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
  name = '';
  phone= ''

  clearName(){
    this.name= '';
  }

  clearPhone(){
    this.phone= '';
  }

  info: Object;

  infoJoin(){
    if(this.name !== '' && this.phone !== ''){
      this.info = {
        name: this.name,
        phone: this.phone
      }
      this.sendInfo();
    }
  }

  /* Send information to table */

  @Output() msgToTable = new EventEmitter<any>();

  sendInfo() {
    this.msgToTable.emit(this.info);
  }
  

  constructor() { }

  ngOnInit(): void {
  }

}
