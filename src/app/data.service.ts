
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import 'rxjs/Rx';

@Injectable()
export class DataService {

  constructor(private httpClient: HttpClient) { }

  getRecords() {
    return this.httpClient.get('/population');
  }

  addData(data) {
    return this.httpClient.post('/population/add', data);
  }

  deleteData(id: number) {
    return this.httpClient.delete(`/population/${id}`);
  }

  updateData(id: number, data) {
    return this.httpClient.put(`/population/update/${id}`, data);
  }
}
