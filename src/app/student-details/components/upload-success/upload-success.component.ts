import { Component } from "@angular/core";
import { StudentDetailsService } from "../../services/student-details.service";

@Component({
    selector: 'app-details-component',
    templateUrl: './upload-success.component.html',
    styleUrls: ['./upload-success.component.scss']
})

export class UploadSuccessComponent{

    totalRecords:number = 0;
    failedRecords:number = 0;
    successRecords:number = 0;

    constructor(
        private studentService: StudentDetailsService
    ){}

    ngOnInit(){
        this.studentService.getTotalDataCount().subscribe((count) => {
            this.totalRecords = count;
        })
        this.studentService.getSuccessDataCount().subscribe((count) => {
            this.successRecords = count;
        })
        this.studentService.getFailedDataCount().subscribe((count) => {
            this.failedRecords = count;
        })
    }


}