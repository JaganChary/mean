import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { single } from '../../node_modules/rxjs/operator/single';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  records: Array<any>;
  year: number;
  population: number;
  growthRate: string;
  growth: number;
  populationForm: FormGroup;
  addORedit: string;
  recordId: number;
  singleRecord: any;

  constructor(
    private dataService: DataService,
    private formBuilder: FormBuilder) {
  }
  ngOnInit() {
    // Get Records
    this.dataService.getRecords()
      .subscribe((res: any) => {
        this.records = res.data;
        console.log(res.data);

      }, (err) => {
        console.log(err);
      });
  }

  // Add Record
  addRecord(addORedit: string): any {
    this.addORedit = addORedit;
    
    this.populationForm = this.formBuilder.group({
      Year: [''],
      Population: [''],
      GrowthRate: [''],
      Growth: ['']
    });
  }

  // Edit Record
  editRecord(id: number, addORedit: string): any {
    this.addORedit = addORedit;
    this.recordId = id;
    this.singleRecord = this.records.find((elem) => {
      return elem._id == id;
    });
    console.log(this.singleRecord);

    if (this.singleRecord) {
      this.populationForm = this.formBuilder.group({

        Year: [this.singleRecord.Year],

        Population: [this.singleRecord.Population],
        
        GrowthRate: [this.singleRecord.GrowthRate],
        
        Growth: [this.singleRecord.Growth]
      
      });
    }
  }

  // Delete Record
  deleteRecord(id, i): any {
    let records = this.records;
    this.dataService.deleteData(id)
      .subscribe((data: any) => {
        console.log(data);
        this.records.forEach((elem) => {
          if (elem._id == id) {
            records.splice(i, 1);
            console.log('Record Deleted');
          }
        });
      }, (err: any) => {
        console.log(err);
      });
  }

  // Submitting Data

  onSubmit(): any {

    if (this.addORedit == 'add') {
      this.dataService.addData(this.populationForm.value)
        .subscribe((res: any) => {
          console.log(res);
          this.records.push(res.data);
          console.log('New Record Added');
        });
    }
     else if (this.addORedit == 'edit') {
      this.dataService.updateData(this.recordId, this.populationForm.value)
        .subscribe((res: any) => {
          console.log(res);
          this.records.splice(this.records.length - 1, 1, res.data);
          console.log('Record Edited');
          
        }, (err: any) => {
          console.log(err);
        })

    }
  }

}
