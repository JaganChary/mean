import { Component } from '@angular/core';
import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  records: Array<any>;

  constructor(private dataService: DataService) {

    this.dataService.getRecords()
      .subscribe((res: any) => {
          this.records = res.data; 
          console.log(res.data);

        }, (err) => {
          console.log(err);
        }
      )
  }
}
