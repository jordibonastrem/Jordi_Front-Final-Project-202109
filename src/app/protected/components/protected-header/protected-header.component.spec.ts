import { ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { ProtectedHeaderComponent } from "./protected-header.component";

describe("ProtectedHeaderComponent", () => {
  let component: ProtectedHeaderComponent;
  let fixture: ComponentFixture<ProtectedHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProtectedHeaderComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProtectedHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  describe("When a element of the header is clicked", () => {
    it("onClick should be called and status should be changed", () => {
      const anchorBreeds = fixture.debugElement.query(
        By.css("a.nav__list-item__ancor")
      );

      anchorBreeds.nativeElement.click();
      expect(component.status).toBe(true);
    });
    describe("If the element is logout", () => {
      it("Should call logout method", () => {
        const logoutAnchor = fixture.debugElement.query(By.css("#logout"));
        spyOn(component, "logout").and.callThrough();
        logoutAnchor.nativeElement.click();
        expect(component.logout).toHaveBeenCalled();
      });
    });
  });

  it("test onclick", () => {
    component.onClick();

    console.log(component.status);
    expect(component.status).toBe(true);
  });
});
