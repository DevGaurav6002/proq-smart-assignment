import { Component } from "@angular/core";
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Config } from "../../consts";
import { Router } from "@angular/router";
import { StudentDetailsService } from "../../services/student-details.service";
import { Subscription } from "rxjs";
import { StudentDetails } from "../../models/student-details.model";

@Component({
    selector: 'app-details-component',
    templateUrl: './details-list-component.html',
    styleUrls: ['./details-list.component.scss']
})
export class DetailsListComponent {

    formGroups: FormGroup[] = [];
    csvData: StudentDetails[] = [];
    headers: string[] = Config.COLUMN_CONF;
    editMode: { [key: number]: { [key: string]: boolean } } = {};
    errors: { [key: number]: { [key: string]: string } } = {};

    $studentDetailsSubscription!: Subscription;

    constructor(
      private fb: FormBuilder,
      private router: Router,
      private studentService: StudentDetailsService
    ) {
    }

    ngOnInit(): void {
      this.$studentDetailsSubscription = this.studentService.getData().subscribe((response: StudentDetails[]) => {
          if(response){
              this.csvData = response;
              this.formGroups = this.csvData.map(data => this.initializeForm(data));
          }
      })
    }

    initializeForm(data: any): FormGroup {
      return this.fb.group({
        name: new FormControl(data.name?? "", [Validators.required, Validators.pattern(/^[a-zA-Z ]*$/)]),
        email: new FormControl(data.email?? "", [Validators.required, Validators.email]),
        phone: new FormControl(data.phone?? "", [Validators.required, Validators.pattern(/^[0-9]{10}$/)]),
        city: new FormControl(data.city?? "", [Validators.required, Validators.pattern(/^[a-zA-Z ]*$/)]),
        address: new FormControl(data.address?? "", [Validators.required, Validators.pattern(/^[a-zA-Z ]*$/)]),
        gpa: new FormControl(data.gpa?? "", [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)])
      });
    }


    getFormGroupControls(index: number): string[] {
        return Object.keys(this.formGroups[index].controls);
    }

    getControlErrors(formControlName: string, index: number): string {

        const control = this.formGroups[index].controls[formControlName] as FormControl;
    
        if (control?.errors) {
          if (control.errors['required']) {
            return `${formControlName} cannot be left blank.`;
          } else if (control.errors['pattern']) {
            return `Entered ${formControlName} is invalid.`;
          } else if (control.errors['email']) {
            return 'Invalid email format entered.';
          }
        }
        return '';
    }

    getControl(control: AbstractControl){
        return control as FormControl;
    }

    viewSummery(){
      let successCount = this.formGroups.filter((group: FormGroup) => group.status == "VALID").length;
      let failureCount = this.formGroups.filter((group: FormGroup) => group.status == "INVALID").length;
      this.studentService.setSuccessDataCount(successCount);
      this.studentService.setFailedDataCount(failureCount);
      this.router.navigate(['/student-details/upload-success'])
    }

    ngOnDestroy(){
      this.$studentDetailsSubscription.unsubscribe();
    }

}