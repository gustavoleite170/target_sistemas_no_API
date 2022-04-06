import { DeleteComponent } from './components/delete/delete.component';
import { TableComponent } from './components/table/table.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  { path: '', component: TableComponent },
  { path: 'delete/:id', component: DeleteComponent }
]
;


@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
