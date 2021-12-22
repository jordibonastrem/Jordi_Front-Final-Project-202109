import { Component } from "@angular/core";

import { faStar } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "doggy-map",
  templateUrl: "./map.component.html",
  styleUrls: ["./map.component.css"],
})
export class MapComponent {
  map!: google.maps.Map;

  service!: google.maps.places.PlacesService;

  infowindow!: google.maps.InfoWindow;

  latitude!: number;

  longitude!: number;

  results: any;

  faStar = faStar;

  styles!: any;

  icons: any;

  buttonClickedStatus: any;

  constructor() {
    this.buttonClickedStatus = false;
    this.icons = {
      dogParks: {
        icon: "https://firebasestorage.googleapis.com/v0/b/doggy-5006f.appspot.com/o/dogpark.png?alt=media&token=ad922059-8758-4190-8e73-96c337dfb20d",
      },
      vets: {
        icon: "https://firebasestorage.googleapis.com/v0/b/doggy-5006f.appspot.com/o/veterinary.png?alt=media&token=4cd0bbf5-0949-48b5-8d0a-f8396982fe3c",
      },
    };
    this.styleMap();
  }

  showParks() {
    this.buttonClickedStatus = true;
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        this.infowindow = new google.maps.InfoWindow();
        const city = new google.maps.LatLng(latitude, longitude);
        const element: HTMLElement = document.getElementById(
          "map"
        ) as HTMLElement;
        this.map = new google.maps.Map(element, {
          center: city,
          zoom: 15,
          styles: this.styles,
        });
        const location = new google.maps.LatLng(latitude, longitude);
        // eslint-disable-next-line no-new
        new google.maps.Marker({
          position: location,
          map: this.map,
        });
        const request: any = {
          location,
          radius: "1000",
          type: ["park"],
        };
        this.service = new google.maps.places.PlacesService(this.map);
        this.service.nearbySearch(request, (results, status) => {
          this.results = results;
          if (status === google.maps.places.PlacesServiceStatus.OK) {
            for (let i = 0; i < results!.length; i++) {
              this.createMarker(results![i], "parks");
            }
          }
        });
      });
    }
  }

  showVets() {
    this.buttonClickedStatus = true;
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;

        const city = new google.maps.LatLng(latitude, longitude);
        const element: HTMLElement = document.getElementById(
          "map"
        ) as HTMLElement;
        this.map = new google.maps.Map(element, {
          center: city,
          zoom: 15,
          styles: this.styles,
        });
        const location = new google.maps.LatLng(latitude, longitude);
        // eslint-disable-next-line no-new
        new google.maps.Marker({
          position: location,
          map: this.map,
        });
        const request: any = {
          location,
          radius: "1000",
          type: ["veterinary_care"],
        };
        this.service = new google.maps.places.PlacesService(this.map);
        this.service.nearbySearch(request, (results, status) => {
          this.results = results;
          if (status === google.maps.places.PlacesServiceStatus.OK) {
            for (let i = 0; i < results!.length; i++) {
              this.createMarker(results![i], "veterinary_care");
            }
          }
        });
      });
    }
  }

  createMarker(place: google.maps.places.PlaceResult, type: string) {
    this.infowindow = new google.maps.InfoWindow({
      content: place.name || "",
    });
    const icon =
      type === "veterinary_care"
        ? this.icons.vets.icon
        : this.icons.dogParks.icon;

    if (!place.geometry || !place.geometry.location) return;

    const marker = new google.maps.Marker({
      map: this.map,
      position: place.geometry.location,
      icon,
    });

    marker.addListener("click", () => {
      this.infowindow.open(this.map, marker);
    });
  }

  // eslint-disable-next-line class-methods-use-this
  handleImage(result: any) {
    let image;

    // eslint-disable-next-line no-prototype-builtins
    if (result.hasOwnProperty("photos")) {
      // eslint-disable-next-line no-prototype-builtins
      if (result.photos[0].hasOwnProperty("getUrl")) {
        image = result.photos[0]!.getUrl({
          maxWidth: 300,
          maxHeight: 300,
        });
      }
    } else {
      image = "assets/images/notfound.jpg";
    }
    return image;
  }

  styleMap() {
    this.styles = [
      {
        featureType: "water",
        elementType: "geometry",
        stylers: [
          {
            visibility: "on",
          },
          {
            color: "#aee2e0",
          },
        ],
      },
      {
        featureType: "landscape",
        elementType: "geometry.fill",
        stylers: [
          {
            color: "#abce83",
          },
        ],
      },
      {
        featureType: "poi",
        elementType: "geometry.fill",
        stylers: [
          {
            color: "#769E72",
          },
        ],
      },
      {
        featureType: "poi",
        elementType: "labels.text.fill",
        stylers: [
          {
            color: "#7B8758",
          },
        ],
      },
      {
        featureType: "poi",
        elementType: "labels.text.stroke",
        stylers: [
          {
            color: "#EBF4A4",
          },
        ],
      },
      {
        featureType: "poi.park",
        elementType: "geometry",
        stylers: [
          {
            visibility: "simplified",
          },
          {
            color: "#8dab68",
          },
        ],
      },
      {
        featureType: "road",
        elementType: "geometry.fill",
        stylers: [
          {
            visibility: "simplified",
          },
        ],
      },
      {
        featureType: "road",
        elementType: "labels.text.fill",
        stylers: [
          {
            color: "#5B5B3F",
          },
        ],
      },
      {
        featureType: "road",
        elementType: "labels.text.stroke",
        stylers: [
          {
            color: "#ABCE83",
          },
        ],
      },
      {
        featureType: "road",
        elementType: "labels.icon",
        stylers: [
          {
            visibility: "off",
          },
        ],
      },
      {
        featureType: "road.local",
        elementType: "geometry",
        stylers: [
          {
            color: "#A4C67D",
          },
        ],
      },
      {
        featureType: "road.arterial",
        elementType: "geometry",
        stylers: [
          {
            color: "#9BBF72",
          },
        ],
      },
      {
        featureType: "road.highway",
        elementType: "geometry",
        stylers: [
          {
            color: "#EBF4A4",
          },
        ],
      },
      {
        featureType: "transit",
        stylers: [
          {
            visibility: "off",
          },
        ],
      },
      {
        featureType: "administrative",
        elementType: "geometry.stroke",
        stylers: [
          {
            visibility: "on",
          },
          {
            color: "#87ae79",
          },
        ],
      },
      {
        featureType: "administrative",
        elementType: "geometry.fill",
        stylers: [
          {
            color: "#7f2200",
          },
          {
            visibility: "off",
          },
        ],
      },
      {
        featureType: "administrative",
        elementType: "labels.text.stroke",
        stylers: [
          {
            color: "#ffffff",
          },
          {
            visibility: "on",
          },
          {
            weight: 4.1,
          },
        ],
      },
      {
        featureType: "administrative",
        elementType: "labels.text.fill",
        stylers: [
          {
            color: "#495421",
          },
        ],
      },
      {
        featureType: "administrative.neighborhood",
        elementType: "labels",
        stylers: [
          {
            visibility: "off",
          },
        ],
      },
    ];
  }
}
