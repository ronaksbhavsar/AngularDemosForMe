import { Component, OnInit, EventEmitter, Input, Output, OnDestroy } from '@angular/core';
import { DashboardService } from '../../../../services/dashboard.service';
import { CommunityLotPicturesModel } from '../../../../models/CommunityLotPicturesModel';
import { Router } from '@angular/router';
import { SubscriptionService } from '../../../../shared/services/subscription.service';
import { ShareButtons } from '@ngx-share/core';
import { Lightbox, LightboxConfig } from 'angular2-lightbox';
import { ActivatedRoute } from '@angular/router';
import { NgxCarousel } from 'ngx-carousel';
import { Utilities } from '../../../../Utilities';
import { Subscription } from 'rxjs/Subscription';
@Component({
  selector: 'dashboard-home-pictures-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit, OnDestroy {
  public communityLotPictures: CommunityLotPicturesModel[] = [];
  imagePopupVisible = false;
  public carouselTile: NgxCarousel;
  ImageList: string[] = [];
  public _album: any[] = [];
  public TaskID = 0;
  @Output() updateImageList = new EventEmitter<any>();
  constructor(public dashboardService: DashboardService,
    public subscriptionService: SubscriptionService,
    public router: Router,
    public share: ShareButtons,
    public _lightbox: Lightbox,
    public _lighboxConfig: LightboxConfig,
    public route: ActivatedRoute) {
    this._lighboxConfig.centerVertically = true;
    this.route.params.subscribe(res => {
      if (res.Id) {
        this.TaskID = +res.Id;
      }
    });
  }
  @Input() isDashboard: number;
  @Output() communityLotPicturesData = new EventEmitter<boolean>();
  public carouselConfig: NgxCarousel;
  private subscriptions: Subscription[] = [];

  ngOnInit() {
    this.subscriptions.push(this.subscriptionService.CommunityLotId$.subscribe(lotId => {
      if (lotId) {
        this.subscriptions.push(this.dashboardService.getCommunityLotPictureByCommunityLotId(lotId).subscribe(x => {
          this.communityLotPicturesData.emit(x && x.communitylotpicture ? true : false);
          if (x && x.communitylotpicture) {
            if (this.isDashboard) {
              this.communityLotPictures = [];
              for (let index = 0;
                index < (x.communitylotpicture.length > 4 ? 4 : x.communitylotpicture.length);
                index++) {
                const element = x.communitylotpicture[index];
                this.communityLotPictures.push(element);
              }
              this.carouselConfig = this.ngxCarouselConfiguration();
              this.carouselTile = this.ngcCarouselTileConfiguration();
            } else {
              this.communityLotPictures = [];
              // to identify record from Mile Stone
              if (this.TaskID == 0) {
                this.communityLotPictures = x.communitylotpicture;
              } else {
                this.communityLotPictures = x.communitylotpicture.filter(x => x.TaskID == this.TaskID);
              }
            }

            // for Light box
            x.communitylotpicture.forEach(element => {
              const album = {
                TaskID: element.TaskID,
                src: element.FileAccessUrl,
                caption: element.ImageName,
                thumb: element.FileAccessUrl
              };

              this._album.push(album);

            });


            // to identify record from Mile Stone
            if (this.TaskID == 0) {
              this.updateImageList.emit(this._album);
            }
            else {
              // var temp=this._album.filter(a=>a.TaskID==this.TaskID);
              this.updateImageList.emit(this._album.filter(a => a.TaskID == this.TaskID));
            }



          } else {
            this.communityLotPictures = [];
            this.updateImageList.emit([]);
          }
        }));
      }
    }));
  }

  ngOnDestroy() {
    this.subscriptions.forEach(x => x.unsubscribe());
  }

  ngcCarouselTileConfiguration(): NgxCarousel {
    return {
      grid: { xs: 1, sm: 1, md: 1, lg: 1, all: 0 },
      slide: 1,
      speed: 400,
      interval: 4000,
      point: {
        visible: true
      },
      load: 2,
      touch: true,
      loop: true,
      custom: 'banner'
    };
  }

  ngxCarouselConfiguration() {
    return {
      grid: { xs: 1, sm: 1, md: 1, lg: 1, all: 0 },
      slide: 1,
      speed: 400,
      interval: 4000,
      point: {
        visible: true,
        pointStyles: `
            .ngxcarouselPoint {
              list-style-type: none;
              text-align: center;
              padding: 0px;
              margin: 0;
              white-space: nowrap;
              overflow: auto;
              position: absolute;
              width: 100%;
              bottom: 20px;
              left: 0;
              box-sizing: border-box;
            }
            .ngxcarouselPoint li {
              display: inline-block;
              border-radius: 999px;
              background: rgba(255, 255, 255, 0.55);
              padding: 5px;
              margin: 0 3px;
              transition: .4s ease all;
            }
            .ngxcarouselPoint li.active {
                background: white;
                width: 10px;
            }
          `
      },
      load: 2,
      loop: true,
      touch: true
    };
  }
  onShown(event: any) {
    Utilities.setTitleDxPopup(event);
  }

  public onViewMoreClick() {
    this.router.navigate(['/homepictures']);
  }

  OpenImage() {
    this.imagePopupVisible = true;
    this.ImageList = this.communityLotPictures.map(a => a.FileAccessUrl);
  }

  open(index: number) {
    // override the default config on second parameter
    this._lightbox.open(this._album, index, { wrapAround: true, showImageNumberLabel: true });
  }

}
