import { Component, OnInit, OnDestroy, ElementRef, NgZone, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { } from '@types/googlemaps';
import { AreainfoService } from '../../../services/areainfo.service';
import { SubscriptionService } from '../../../../app/shared/services/subscription.service';
import { DashboardService } from '../../../services/dashboard.service';
import { parse } from 'querystring';
import { Subscription } from 'rxjs/Subscription';
declare var google: any;
var map;
var infowindow;
@Component({
  selector: 'app-areainfo',
  templateUrl: './areainfo.component.html',
  styleUrls: ['./areainfo.component.css']
})
export class AreainfoComponent implements OnInit, OnDestroy {
  public latitude: number;
  public longitude: number;
  public searchControl: FormControl;
  public zoom: number;
  _type: string = "restaurant";
  isAtm: boolean;
  isStore: boolean;
  isHospital: boolean;
  private subscriptions: Subscription[] = [];
  @ViewChild('map') mapElement: ElementRef;

  constructor(public ngZone: NgZone, public areainfoService: AreainfoService, public subscriptionService: SubscriptionService) { }

  ngOnInit() {
    //set google maps defaults    
    this.zoom = 50;
    this.latitude = 39.8282;
    this.longitude = -98.5795;
    let directionsService = new google.maps.DirectionsService;
    let directionsDisplay = new google.maps.DirectionsRenderer;
    this.isAtm = false;
    this.isStore = false;
    this.isHospital = false;
    this.subscriptions.push(this.subscriptionService.CommunityLotId$.subscribe(lotId => {
      if (lotId) {
        this.loadMap(lotId);
      }
    }));

  }

  ngOnDestroy() {
    this.subscriptions.forEach(x => x.unsubscribe());
  }

  loadMap(lotId: number) {
    this.subscriptions.push(this.areainfoService.getCommunityLotByBuyerId().subscribe(x => {
      if (x && x.communitylot) {
        let lotData = x.communitylot.find(x => x.CommunityLotID == lotId);
        this.longitude = Number(lotData.longitude);
        this.latitude = Number(lotData.latitude);
        this.initMap(this.latitude, this.longitude, this._type);//-33.867, 151.195
      }
    }));
  }

  initMap(latitude: number, longitude: number, _type: any) {
    let latlng = new google.maps.LatLng(latitude, longitude);
    map = new google.maps.Map(document.getElementById('map'), {
      center: latlng,
      zoom: 15
    });

    infowindow = new google.maps.InfoWindow();
    let service = new google.maps.places.PlacesService(map);
    service.nearbySearch({
      location: latlng,
      radius: '2000',
      type: [_type]
    }, this.callback);
  }
  public createMarker(place: any): void {
    let placeLoc = place.geometry.location;
    let marker = new google.maps.Marker({
      map: map,
      position: place.geometry.location
    });

    google.maps.event.addListener(marker, 'click', function () {
      infowindow.setContent(place.name);
      infowindow.open(map, this);
    });
  }
  callback(results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      for (let i = 0; i < results.length; i++) {
        //  this.createMarker(results[i]);
        let placeLoc = results[i].geometry.location;
        let marker = new google.maps.Marker({
          map: map,
          position: results[i].geometry.location
        });

        google.maps.event.addListener(marker, 'click', function () {
          infowindow.setContent(results[i].name);
          infowindow.open(map, this);
        });
      }
    }
  }

  setType(_type: string) {
    this._type = _type;
    this.loadMap(this.subscriptionService.CommunityLotId$.getValue());
  }

}