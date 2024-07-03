import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgxFileDropEntry, FileSystemFileEntry } from 'ngx-file-drop';
import * as Papa from 'papaparse';
import { StudentDetailsService } from '../../services/student-details.service';
import { Config } from '../../consts';
import { StudentDetails } from '../../models/student-details.model';

@Component({
    selector: 'app-details-component',
    templateUrl: './upload-file.component.html',
    styleUrls: ['./upload-file.component.scss']
})
export class UploadFileComponent{

    public files: NgxFileDropEntry[] = [];

    data: any[] = []

    uploadedFile: string | null = null;
    fileUploadedError: string | null = null;

    constructor(
      private router: Router,
      private studentDetailsService: StudentDetailsService
    ){}

    onFileDrop(files: NgxFileDropEntry[]) {
        if (files.length > 1) {
        return;
        }
            const droppedFile = files[0];
            if (droppedFile.fileEntry.isFile) {
            const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
            fileEntry.file((file: File) => {
                this.readFile(file);
            });
        }
    }

    onFileSelect(event: any) {
        const file = event.target.files[0];
        if (file) {
        this.readFile(file);
        this.uploadedFile = file.name;
        }
    }

    readFile(file: File) {
        const reader = new FileReader();
        reader.onload = () => {
        const csvData = reader.result;
        this.parseCSV(csvData as string);
        };
        reader.onerror = (error) => {
        };
        reader.readAsText(file);
    }

    parseCSV(csvData: string) {
        Papa.parse(csvData, {
        header: true,
        skipEmptyLines: true,
        transformHeader: (header) => header.trim(),
        dynamicTyping: true,
        complete: (result) => {
            this.data = [...result.data];
            console.log('records', result)
            if(result.errors){
                if(result.errors[0]?.code == "TooFewFields"){
                    this.fileUploadedError = Config.INVALID_COL_ERROR;
                    return
                }
                this.fileUploadedError = Config.FILE_UPLOAD_ERROR;
            }
            this.viewData()
        },
        error: (error:any) => {
            console.error('Error during parsing:', error);
        }
        });
    } 
      

    viewData(){
      this.studentDetailsService.setData(this.data)
      this.router.navigate(['/student-details/details-list'])
    }

}