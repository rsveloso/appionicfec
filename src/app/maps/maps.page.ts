import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { ServiceService } from '../service';
declare var google: any;

@Component({
  selector: 'app-maps',
  templateUrl: './maps.page.html',
  styleUrls: ['./maps.page.scss'],
})
export class MapsPage implements OnInit {

  height = 0;
  lat = 0;
  lng = 0;
  zoom = 0;
  tracks = [];

//  maps = new Array<any>();

  constructor(
    public platform: Platform,
    private service: ServiceService
  ) {
    console.log(platform.height());
    this.height = platform.height();
    this.lat = -21.79594;
    this.lng = -48.17763;
    this.zoom = 20;
  }

  ngOnInit() {
    // this.insertMaps();
    this.getAllMaps();
  }

  insertMaps() {
    // this.tracks.forEach(element => {
    //   debugger
    //   this.service.saveMaps(element);
    // });
  }

  getAllMaps() {
    this.service.getAllMaps().subscribe(res => {
      res.forEach((u, key) => {
        // console.log('u => ' + u);
        // console.log('key => ' + key);

        this.tracks.push(u);
      });
    });
  }
}
