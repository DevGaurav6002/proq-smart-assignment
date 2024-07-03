import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/student-details'
  },
  {
    path: 'home',
    component: AppComponent
  },
  {
    path: 'student-details',
    loadChildren: () => import('./student-details/student-details.module').then(m => m.StudentDetailsModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
