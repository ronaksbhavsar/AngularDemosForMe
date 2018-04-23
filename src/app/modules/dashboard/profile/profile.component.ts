import { Component, OnInit, NgModule, ViewChild, enableProdMode, OnDestroy } from '@angular/core';
import { SubscriptionService } from '../../../shared/services/subscription.service';
import { CommonService } from '../../../shared/services/common.service';
import { DashboardService } from '../../../services/dashboard.service';
import { ProfileService } from '../../../services/profile.service';
import { Utilities } from '../../../../app/Utilities';
import { DxDataGridComponent, DxDataGridModule, DxSelectBoxModule } from 'devextreme-angular';
import { CustomNotification } from '../../../CustomNotification';
import { Router } from '@angular/router';
import { Route } from '@angular/router/src/config';
import { ChangePasswordModel } from '../../../models/ChangePasswordModel';
import { Subscription } from 'rxjs/Subscription';
export class ContactInfoModel {
  public BuyerAdditionalContactID: number;
  public CRMContactTypeLookupID: number;
  public Type: string;
  public ContactInfo: string;
  public Status: string;
  public uniqueId: any;
}


export class BuyerModel {
  public BuyerId: number;
  public Title: string;
  public FirstName: string;
  public LastName: string;
  public MiddleName: string;
  public Phone: string;
  public EmailAddress: string;
  public Suffix: string;
  public PrimaryAddress1: string;
  public PrimaryAddress2: String;
  public PrimaryCityID: number;
  public PrimaryStateID: number;
  public PrimaryCountryID: number;
  public PrimaryZipCode: string;
  public SecondaryAddress1: string;
  public SecondaryAddress2: String;
  public SecondaryCityID: number;
  public SecondaryStateID: number;
  public SecondaryCountryID: number;
  public SecondaryZipCode: string;
  public OrganizationsID: number;
  public IsCall: boolean;
  public IsText: boolean;
  public IsEmail: boolean;
  public Status: string;
}
export class CoBuyerInfoModel {
  public CoBuyerID: number;
  public BuyerId: number;
  public Title: string;
  public FirstName: string;
  public LastName: string;
  public MiddleName: string;
  public Phone: string;
  public EmailAddress: string;
  public Suffix: string;
  public Address1: string;
  public Address2: String;
  public CityID: number;
  public StateId: number;
  public CountryId: number;
  public ZipCode: string;
  public ContactPreference: string;
  public Status: string;
  public IsText: boolean;
  public IsCall: boolean;
  public IsEmail: boolean;
  public uniqueId: any;
}

export class BuyerViewModel {
  public buyeradditionalcontactinfo: ContactInfoModel[];
  public coBuyerInfoList: CoBuyerInfoModel[];
  public buyer: BuyerModel;
}
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {

  @ViewChild(DxDataGridComponent) dataGrid: DxDataGridComponent;
  BuyerView: BuyerViewModel;
  profile: BuyerModel;

  OrganizationList: any[] = [];

  CountryList: any[] = [];
  StateList: any[] = [];
  CityList: any[] = [];

  ContactInfoModelList: ContactInfoModel[] = [];
  contactInfoModel: ContactInfoModel = null;

  contactInfoPopupVisible = false;
  CoBuyerInfoPopupVisible = false;
  public changePasswordPopupVisible = false;

  CoBuyerInfoModel: CoBuyerInfoModel = null;
  CoBuyerInfoModelList: CoBuyerInfoModel[] = [];
  CoBuyerInfoDeleteModelList: CoBuyerInfoModel[] = [];
  public changePassword: ChangePasswordModel = null;

  AdditonalContactTypeList: any[] = [];
  usesubmitBehavior = true;

  TitleList: any[] = [];
  submitted = false;
  cobuyersubmitted = false;
  contactsubmitted = false;
  private subscriptions: Subscription[] = [];
  constructor(public commonService: CommonService, public dashboardService: DashboardService, public subscriptionService: SubscriptionService
    , public profileService: ProfileService, public _router: Router,
    public customNotification: CustomNotification) {

  }
  passwordComparison = () => {
    return this.changePassword.NewPassword;
  };
  showSuccess() {
    this.customNotification.notify('everything is broken', "", 'error');
  }
  ngOnInit() {

    this.AdditonalContactTypeList = [{ ID: 1830, Name: 'Email' }, { ID: 1829, Name: 'Mobile No.' }];
    this.TitleList = [{ ID: "Mr", Name: 'Mr.' }, { ID: "Mrs.", Name: 'Mrs.' }];

    // to handle null values
    this.profile = new BuyerModel();
    this.changePassword = new ChangePasswordModel();

    this.subscriptions.push(this.profileService.GetProfileDetail().subscribe(buyer => {
      if (buyer) {
        this.profile = buyer.buyer;
        this.OrganizationList = buyer.OrganizationList;
        buyer.buyeradditionalcontactinfo.forEach(element => {
          element.uniqueId = Utilities.generateGuid();
          this.ContactInfoModelList.push(element);
        });
        buyer.coBuyerInfoList.forEach(element => {
          element.uniqueId = Utilities.generateGuid();
          this.CoBuyerInfoModelList.push(element);
        });;
        this.CountryList = buyer.CountryList;
        this.StateList = buyer.StateList;
        this.CityList = buyer.CityList;
      }
      else {
        this.profile = new BuyerModel();
      }
    }));

  }

  SaveProfile(profileForm) {
    this.submitted = true;
    if (profileForm.valid) {

      this.BuyerView = new BuyerViewModel();
      this.BuyerView.buyer = this.profile;
      this.BuyerView.buyeradditionalcontactinfo = this.ContactInfoModelList;
      this.BuyerView.coBuyerInfoList = this.CoBuyerInfoModelList;

      this.CoBuyerInfoDeleteModelList.forEach(element => {
        this.BuyerView.coBuyerInfoList.push(element);
      });

      this.subscriptions.push(this.dashboardService.SaveProfile(this.BuyerView).subscribe(result => {
        if (result) {
          this.customNotification.notify(result.Message, '', Utilities.success);
          this.submitted = false;
        }
      }));
    }
  }

  onShown(event: any) {
    Utilities.setTitleDxPopup(event);
  }

  GetCityByStateId(StateID: number) {
    this.subscriptions.push(this.commonService.GetCityByStateId(StateID).subscribe(city => {
      this.CityList = city ? city.City_StateList : [];
    }));
  }

  GetStateByCountryId(CountryID: number) {
    this.subscriptions.push(this.commonService.GetStateByCountryId(CountryID).subscribe(state => {
      this.StateList = state ? state.City_StateList : [];
    }));
  }


  AddEditContactInfo(model) {
    this.usesubmitBehavior = true;
    this.contactInfoModel = null;
    this.contactInfoPopupVisible = true;
    if (model)
      this.contactInfoModel = model;
    else {
      this.contactInfoModel = new ContactInfoModel();
      // this.contactInfoModel.CRMContactTypeLookupID=undefined;
      // this.contactInfoModel.ContactInfo="";
    }

  }

  AddEditCoBuyerInfo(model) {
    this.cobuyersubmitted = false;
    this.CoBuyerInfoPopupVisible = true;
    if (model)
      this.CoBuyerInfoModel = model.data;
    else
      this.CoBuyerInfoModel = new CoBuyerInfoModel();
  }

  SaveContactInfo(contactForm) {

    this.contactsubmitted = true;
    if (contactForm.valid) {
      this.contactsubmitted = false;
      var type = this.AdditonalContactTypeList.find(x => x.ID == this.contactInfoModel.CRMContactTypeLookupID).Name;
      if (!!this.contactInfoModel.BuyerAdditionalContactID == false) {
        //this.contactInfoModel.BuyerAdditionalContactID=this.ContactInfoModelList.length+1;
        if (this.contactInfoModel.BuyerAdditionalContactID == 0) {
          this.contactInfoModel.Type = type;
          this.ContactInfoModelList.filter(x => x.uniqueId == this.contactInfoModel.uniqueId)[0].ContactInfo = this.contactInfoModel.ContactInfo;
          this.ContactInfoModelList.filter(x => x.uniqueId == this.contactInfoModel.uniqueId)[0].CRMContactTypeLookupID = this.contactInfoModel.CRMContactTypeLookupID;
        }
        else {
          this.contactInfoModel.BuyerAdditionalContactID = 0;
          this.contactInfoModel.Type = type;
          this.contactInfoModel.uniqueId = Utilities.generateGuid();
          this.ContactInfoModelList.push(this.contactInfoModel);
        }

      }
      else {
        this.ContactInfoModelList.filter(x => x.uniqueId == this.contactInfoModel.uniqueId)[0].ContactInfo = this.contactInfoModel.ContactInfo;

        this.ContactInfoModelList.filter(x => x.uniqueId == this.contactInfoModel.uniqueId)[0].CRMContactTypeLookupID = this.contactInfoModel.CRMContactTypeLookupID;
        this.ContactInfoModelList.filter(x => x.uniqueId == this.contactInfoModel.uniqueId)[0].Type = type;
      }
      this.contactInfoModel = new ContactInfoModel();
      this.usesubmitBehavior = false;
      this.contactInfoPopupVisible = false;
    }
  }

  SaveCoBuyerInfo(coBuyerForm) {
    this.cobuyersubmitted = true;
    if (coBuyerForm.valid) {
      this.cobuyersubmitted = false;
      if (!!this.CoBuyerInfoModel.CoBuyerID == false) {
        if (this.CoBuyerInfoModel.CoBuyerID == 0) {
          this.CoBuyerInfoModel.CoBuyerID = 0;


          this.CoBuyerInfoModelList.filter(x => x.uniqueId == this.CoBuyerInfoModel.uniqueId)[0].Title = this.CoBuyerInfoModel.Title;
          this.CoBuyerInfoModelList.filter(x => x.uniqueId == this.CoBuyerInfoModel.uniqueId)[0].LastName = this.CoBuyerInfoModel.LastName;
          this.CoBuyerInfoModelList.filter(x => x.uniqueId == this.CoBuyerInfoModel.uniqueId)[0].FirstName = this.CoBuyerInfoModel.FirstName;
          this.CoBuyerInfoModelList.filter(x => x.uniqueId == this.CoBuyerInfoModel.uniqueId)[0].MiddleName = this.CoBuyerInfoModel.MiddleName;
          this.CoBuyerInfoModelList.filter(x => x.uniqueId == this.CoBuyerInfoModel.uniqueId)[0].Suffix = this.CoBuyerInfoModel.Suffix;
          this.CoBuyerInfoModelList.filter(x => x.uniqueId == this.CoBuyerInfoModel.uniqueId)[0].Address1 = this.CoBuyerInfoModel.Address1;
          this.CoBuyerInfoModelList.filter(x => x.uniqueId == this.CoBuyerInfoModel.uniqueId)[0].Address2 = this.CoBuyerInfoModel.Address2;
          this.CoBuyerInfoModelList.filter(x => x.uniqueId == this.CoBuyerInfoModel.uniqueId)[0].CityID = this.CoBuyerInfoModel.CityID;
          this.CoBuyerInfoModelList.filter(x => x.uniqueId == this.CoBuyerInfoModel.uniqueId)[0].StateId = this.CoBuyerInfoModel.StateId;
          this.CoBuyerInfoModelList.filter(x => x.uniqueId == this.CoBuyerInfoModel.uniqueId)[0].CountryId = this.CoBuyerInfoModel.CountryId;
          this.CoBuyerInfoModelList.filter(x => x.uniqueId == this.CoBuyerInfoModel.uniqueId)[0].Phone = this.CoBuyerInfoModel.Phone;
          this.CoBuyerInfoModelList.filter(x => x.uniqueId == this.CoBuyerInfoModel.uniqueId)[0].EmailAddress = this.CoBuyerInfoModel.EmailAddress;
          this.CoBuyerInfoModelList.filter(x => x.uniqueId == this.CoBuyerInfoModel.uniqueId)[0].IsText = this.CoBuyerInfoModel.IsText;
          this.CoBuyerInfoModelList.filter(x => x.uniqueId == this.CoBuyerInfoModel.uniqueId)[0].IsCall = this.CoBuyerInfoModel.IsCall;
          this.CoBuyerInfoModelList.filter(x => x.uniqueId == this.CoBuyerInfoModel.uniqueId)[0].IsEmail = this.CoBuyerInfoModel.IsEmail;

        }
        else {
          this.CoBuyerInfoModel.CoBuyerID = 0;
          this.CoBuyerInfoModel.uniqueId = Utilities.generateGuid();
          this.CoBuyerInfoModelList.push(this.CoBuyerInfoModel);
        }
      }
      else {
        this.CoBuyerInfoModelList.filter(x => x.uniqueId == this.CoBuyerInfoModel.uniqueId)[0].Title = this.CoBuyerInfoModel.Title;
        this.CoBuyerInfoModelList.filter(x => x.uniqueId == this.CoBuyerInfoModel.uniqueId)[0].LastName = this.CoBuyerInfoModel.LastName;
        this.CoBuyerInfoModelList.filter(x => x.uniqueId == this.CoBuyerInfoModel.uniqueId)[0].FirstName = this.CoBuyerInfoModel.FirstName;
        this.CoBuyerInfoModelList.filter(x => x.uniqueId == this.CoBuyerInfoModel.uniqueId)[0].MiddleName = this.CoBuyerInfoModel.MiddleName;
        this.CoBuyerInfoModelList.filter(x => x.uniqueId == this.CoBuyerInfoModel.uniqueId)[0].Suffix = this.CoBuyerInfoModel.Suffix;
        this.CoBuyerInfoModelList.filter(x => x.uniqueId == this.CoBuyerInfoModel.uniqueId)[0].Address1 = this.CoBuyerInfoModel.Address1;
        this.CoBuyerInfoModelList.filter(x => x.uniqueId == this.CoBuyerInfoModel.uniqueId)[0].Address2 = this.CoBuyerInfoModel.Address2;
        this.CoBuyerInfoModelList.filter(x => x.uniqueId == this.CoBuyerInfoModel.uniqueId)[0].CityID = this.CoBuyerInfoModel.CityID;
        this.CoBuyerInfoModelList.filter(x => x.uniqueId == this.CoBuyerInfoModel.uniqueId)[0].StateId = this.CoBuyerInfoModel.StateId;
        this.CoBuyerInfoModelList.filter(x => x.uniqueId == this.CoBuyerInfoModel.uniqueId)[0].CountryId = this.CoBuyerInfoModel.CountryId;
        this.CoBuyerInfoModelList.filter(x => x.uniqueId == this.CoBuyerInfoModel.uniqueId)[0].Phone = this.CoBuyerInfoModel.Phone;
        this.CoBuyerInfoModelList.filter(x => x.uniqueId == this.CoBuyerInfoModel.uniqueId)[0].EmailAddress = this.CoBuyerInfoModel.EmailAddress;
        this.CoBuyerInfoModelList.filter(x => x.uniqueId == this.CoBuyerInfoModel.uniqueId)[0].IsText = this.CoBuyerInfoModel.IsText;
        this.CoBuyerInfoModelList.filter(x => x.uniqueId == this.CoBuyerInfoModel.uniqueId)[0].IsCall = this.CoBuyerInfoModel.IsCall;
        this.CoBuyerInfoModelList.filter(x => x.uniqueId == this.CoBuyerInfoModel.uniqueId)[0].IsEmail = this.CoBuyerInfoModel.IsEmail;
        this.CoBuyerInfoModelList.filter(x => x.uniqueId == this.CoBuyerInfoModel.uniqueId)[0].Status = this.CoBuyerInfoModel.Status;


      }
      this.CoBuyerInfoModel = new CoBuyerInfoModel();
      this.CoBuyerInfoPopupVisible = false;
    }
  }
  deleteCobuyerInfo(uniyqueId: any) {

    this.CoBuyerInfoModelList.filter(x => x.uniqueId == uniyqueId)[0].Status = "InActive";
    const index: number = this.CoBuyerInfoModelList.indexOf(this.CoBuyerInfoModelList.find(x => x.uniqueId == uniyqueId));
    if (index !== -1) {
      this.CoBuyerInfoDeleteModelList.push(this.CoBuyerInfoModelList.find(x => x.uniqueId == uniyqueId));
      this.CoBuyerInfoModelList.splice(index, 1);
    }



  }
  ClosePopup() {
    this.CoBuyerInfoPopupVisible = false;
    this.contactInfoPopupVisible = false;

    this.cobuyersubmitted = false;
    this.contactsubmitted = false;

    this.changePasswordPopupVisible = false;
    //this.useSubmitBehavior=false
  }

  onCancel() {
    this._router.navigate(['/dashboard']);
  }

  public onChangePassword() {
    this.changePasswordPopupVisible = true;
    this.changePassword.EmailId = this.profile.EmailAddress;
  }

  public onSaveChangePassord(changePasswordForm) {
    if (changePasswordForm.valid) {
      var temp = this.changePassword;
      this.subscriptions.push(this.profileService.ChangePassword(this.changePassword).subscribe(x => {
        this.customNotification.notify(x.Message, "", Utilities.success);
        this.changePassword = new ChangePasswordModel();
        this.changePasswordPopupVisible = false;
      }));
    }
  }

  ngOnDestroy() {
    this.subscriptions.forEach(x => x.unsubscribe());
  }

}
