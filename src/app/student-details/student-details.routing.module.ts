import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UploadFileComponent } from './components/upload-file/upload-file.component';
import { DetailsListComponent } from './components/details-list/details-list.component';
import { UploadSuccessComponent } from './components/upload-success/upload-success.component';
import { NgxFileDropModule } from 'ngx-file-drop';
import { MaterialModule } from '../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'upload-file'
    },
    {
        path: 'upload-file',
        component: UploadFileComponent
    },
    {
        path: 'details-list',
        component: DetailsListComponent
    },
    {
        path: 'upload-success',
        component: UploadSuccessComponent
    },
];

const components = [
    DetailsListComponent,
    UploadFileComponent,
    UploadSuccessComponent
]

@NgModule({
    declarations: [
        ...components
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        NgxFileDropModule,
        MaterialModule,
        FormsModule,
        ReactiveFormsModule
    ],
    exports: [
        ...components,
        RouterModule
    ]
})
export class StudentDetailsRoutingModule { }