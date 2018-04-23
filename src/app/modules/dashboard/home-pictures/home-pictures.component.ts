import { Component, OnInit } from '@angular/core';
import { Lightbox, LightboxConfig } from 'angular2-lightbox';
@Component({
  selector: 'dashboard-home-pictures',
  templateUrl: './home-pictures.component.html',
  styleUrls: ['./home-pictures.component.css']
})
export class HomePicturesComponent implements OnInit {

  _album: any[] = [];
  constructor(public _lightbox: Lightbox, public _lighboxConfig: LightboxConfig) { }

  ngOnInit() {
  }

  updateImage(_album: any) {
    this._album = _album;
  }

  open() {
    // override the default config on second parameter
    this._lightbox.open(this._album, 1, { wrapAround: true, showImageNumberLabel: true });
  }
}
