
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/Rx';

@Injectable()
export class DataService {

  constructor(private httpClient: HttpClient) { }

  getRecords() {
    return this.httpClient.get('/population');
  }
}
