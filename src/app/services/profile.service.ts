import { Injectable } from '@angular/core';
import { HttpClientService } from '../lib/http/http-client.service';
@Injectable()
export class ProfileService {

  constructor(public http: HttpClientService) { }

  public GetProfileDetail() {
    return this.http.get('/DashBoard/GetProfileDetail');
  }

  public ChangePassword(changePasswordModel:any){
    return this.http.post("/Account/ChangePassword",changePasswordModel);
  }

}
