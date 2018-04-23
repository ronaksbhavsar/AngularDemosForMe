import { Injectable } from '@angular/core';

@Injectable()
export class NonAuthService {
  resetDataObj: any = {};

  constructor() { }

  setData(dataObj: any) {
    Object.assign(this.resetDataObj, dataObj);
  }

  getData() {
    return this.resetDataObj;
  }

  resetData() {
    this.resetDataObj = {};
  }
}
