import { ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { MapComponent } from "./map.component";

describe("MapComponent", () => {
  let component: MapComponent;
  let fixture: ComponentFixture<MapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MapComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  describe("When show vets is clicked", () => {
    it("Should call the method showVets", () => {
      spyOn(component, "showVets");
      const buttonVets = fixture.debugElement.queryAll(
        By.css("button.form__button")
      )[0];
      buttonVets.nativeElement.click();
      expect(component.showVets).toHaveBeenCalled();
    });
  });

  describe("When show parks is clicked", () => {
    it("Should call the method showParks", () => {
      spyOn(component, "showParks");
      const buttonVets = fixture.debugElement.queryAll(
        By.css("button.form__button")
      )[1];
      buttonVets.nativeElement.click();
      expect(component.showParks).toHaveBeenCalled();
    });
  });

  describe("When showParks is called", () => {
    it("should toggle the button clicked status", () => {
      component.showParks();

      expect(component.buttonClickedStatus).toEqual(true);
    });
  });

  describe("When showVets is called, ", () => {
    it("should toggle the button clicked status", () => {
      component.showVets();

      expect(component.buttonClickedStatus).toEqual(true);
    });
  });

  // describe("When createMaker is called",()=>{
  //   it("it should instantiate infowindow",()=>{

  //     component.createMarker(null!,null!);

  //   })
  // })

  describe("When handleImage is called with result", () => {
    describe("And result contains a object photos with the first object having getUrl function", () => {
      it("Should return the image returned by the method getUrl of the result", () => {
        function getUrl() {
          return "http://testimage.jpg";
        }
        const result = {
          name: "Centre veterinary Terrassa",
          photos: [{ getUrl }],
        };
        const image = component.handleImage(result);
        console.log(image);
        expect(image).toBe("http://testimage.jpg");
      });
    });
  });
  describe("If the result doesnt contain a getUrl method (because the place has no images)", () => {
    it("Shoud return 'assets/images/notfound.jpg'", () => {
      const result = {
        name: "Centre veterinary Terrassa",
      };
      const image = component.handleImage(result);
      console.log(image);
      expect(image).toBe("assets/images/notfound.jpg");
    });
  });
});
