import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ElementRef,
  Output,
  EventEmitter,
  ViewChild,
  AfterViewInit,
  Input,
} from '@angular/core';
import { LatinisePipe } from 'ngx-pipes';
import { Map } from 'ol';
import olms from 'ol-mapbox-style';
import * as proj from 'ol/proj';
import { Rental } from 'src/app/rental/shared/rental.model';
import { MapService } from './map.service';

@Component({
  selector: 'aw-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MapComponent implements OnInit, AfterViewInit {
  myAPIKey: string = '2978d70db69944229594010dafc370bd';
  mapStyle: string =
    'https://maps.geoapify.com/v1/styles/osm-bright/style.json';
  geocodeURL: string = 'https://api.geoapify.com/v1/geocode/search?text=';

  @ViewChild('map')
  private mapContainer!: ElementRef<HTMLElement>;

  @Input() rental!: Rental;
  @Output() mapReady = new EventEmitter<Map>();

  initialState = {
    lat: 40.71,
    lng: -74.0,
    zoom: 10,
  };

  constructor(public mapService: MapService) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    // Get Coordinates from map service
    this.mapService.getCoordinates(this.rental).subscribe((data) => {
      console.log(data.results[0]);
      const { lat, lon } = data.results[0];

      // Assign latitude and longitude
      this.initialState['lat'] = lat;
      this.initialState['lng'] = lon;

      console.log(this.initialState);
      this.setMapView();
      // TODO: Add market or area circle
    });
  }

  setMapView() {
    olms(
      this.mapContainer.nativeElement,
      `${this.mapStyle}?apiKey=${this.myAPIKey}`
    ).then((map: Map) => {
      map
        .getView()
        .setCenter(
          proj.transform(
            [this.initialState.lng, this.initialState.lat],
            'EPSG:4326',
            'EPSG:3857'
          )
        );
      map.getView().setZoom(this.initialState.zoom);
    });
  }
}
