import { HttpClient } from "@angular/common/http";

import { of } from "rxjs";
import { BreedBadFormmatted } from "src/app/shared/interfaces/badFormmated.interface";
import { Breed } from "src/app/shared/interfaces/breed.interface";
import { CouldNotUpdateBreed } from "src/app/shared/interfaces/breedCouldNotUpdate.interface";
import { BreedNotFound } from "src/app/shared/interfaces/breedNotFound.interface";
import { Unauthorized } from "src/app/shared/interfaces/unauthorized.interface";

import { BreedService } from "./breed.service";

describe("Test of Breed services", () => {
  let breedService: BreedService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj("HttpClient", [
      "post",
      "get",
      "delete",
      "put",
    ]);
    breedService = new BreedService(httpClientSpy as any);
    let store: any = {};
    const mockLocalStorage = {
      getItem: (key: string): string => (key in store ? store[key] : null),
      setItem: (key: string, value: string) => {
        store[key] = `${value}`;
      },
      removeItem: (key: string) => {
        delete store[key];
      },
      clear: () => {
        store = {};
      },
    };
    spyOn(localStorage, "getItem").and.callFake(mockLocalStorage.getItem);
    spyOn(localStorage, "setItem").and.callFake(mockLocalStorage.setItem);
    spyOn(localStorage, "removeItem").and.callFake(mockLocalStorage.removeItem);
    spyOn(localStorage, "clear").and.callFake(mockLocalStorage.clear);
  });
  it("Should create correctly", () => {
    expect(breedService).toBeTruthy();
  });

  describe("Given a method getBreeds", () => {
    describe("When there is a correct user token in localStorage", () => {
      it("Should return an array of breeds", (done: DoneFn) => {
        const token = "fakeToken";
        localStorage.setItem("userToken", token);
        const mockRespGetBreeds: Breed[] = [
          {
            breedName: "Affenpinscher",
            description:
              '"The Affenpinscher is square-proportioned, compact and sturdy, with medium bone. This breed is a smaller version of a working terrier, and as such is not a delicate dog. This is an active, tough dog that is agile enough to catch and dispatch rodents."',
            breedPhoto:
              "https://storage.googleapis.com/doggy-5006f.appspot.com/affenpinscher-1638621993361-.jpg",
            adaptability: 7,
            friendliness: 5,
            healthNeeds: 3,
            physicalNeeds: 5,
            trainability: 4,
            vocality: 4,
            id: "61ab63298b3ed2349da8eeec",
          },
          {
            breedName: "airedale",
            description: "The Airedale Terrier is a neat, upstanding,",
            breedPhoto:
              "https://storage.googleapis.com/doggy-5006f.appspot.com/airedale-1638622286404-.jpg",
            adaptability: 2,
            friendliness: 4,
            healthNeeds: 3,
            physicalNeeds: 5,
            trainability: 5,
            vocality: 4,
            id: "61ab644e8b3ed2349da8eef2",
          },
        ];

        httpClientSpy.get.and.returnValue(of(mockRespGetBreeds));

        breedService.getBreeds().subscribe((breeds) => {
          expect(localStorage.getItem("userToken")).toBe(token);
          expect(breeds).toEqual(mockRespGetBreeds);
          done();
        });
      });
    });
    describe("When there is a incorrect or no userToken in localStorage", () => {
      it("Should return ok(false) and a error(Unauthorized)", (done: DoneFn) => {
        const token = "";
        localStorage.setItem("userToken", token);
        const mockRespGetBreeds: Unauthorized = {
          ok: false,
          error: "Unauthorized",
        };
        httpClientSpy.get.and.returnValue(of(mockRespGetBreeds));

        breedService.getBreeds().subscribe((unauthorizedResp) => {
          expect(localStorage.getItem("userToken")).toBe(token);
          expect(unauthorizedResp).toEqual(mockRespGetBreeds);
          done();
        });
      });
    });
  });

  describe("Given a method getBreedById", () => {
    describe("When the id of the breed exists", () => {
      describe("When there is a correct user token in localStorage", () => {
        it("Should return an array of breeds", (done: DoneFn) => {
          const token = "fakeToken";
          localStorage.setItem("userToken", token);
          const breedId = "61ab63298b3ed2349da8eeec";
          const mockResponseBreed: Breed = {
            breedName: "Affenpinscher",
            description:
              '"The Affenpinscher is square-proportioned, compact and sturdy, with medium bone. This breed is a smaller version of a working terrier, and as such is not a delicate dog. This is an active, tough dog that is agile enough to catch and dispatch rodents."',
            breedPhoto:
              "https://storage.googleapis.com/doggy-5006f.appspot.com/affenpinscher-1638621993361-.jpg",
            adaptability: 7,
            friendliness: 5,
            healthNeeds: 3,
            physicalNeeds: 5,
            trainability: 4,
            vocality: 4,
            id: "61ab63298b3ed2349da8eeec",
          };

          httpClientSpy.get.and.returnValue(of(mockResponseBreed));

          breedService.getBreedById(breedId).subscribe((breed) => {
            expect(breed).toEqual(mockResponseBreed);
            expect(localStorage.getItem("userToken")).toBe(token);
            done();
          });
        });
      });
      describe("When there is a incorrect or no userToken in localStorage", () => {
        it("Should return ok(false) and a error(Unauthorized)", (done: DoneFn) => {
          const mockRespGetBreeds: Unauthorized = {
            ok: false,
            error: "Unauthorized",
          };
          httpClientSpy.get.and.returnValue(of(mockRespGetBreeds));

          breedService.getBreeds().subscribe((unauthorizedResp) => {
            expect(unauthorizedResp).toEqual(mockRespGetBreeds);
            done();
          });
        });
      });
    });
    describe("When the id of the breed doesn't exist", () => {
      describe("An its bad formmated", () => {
        it("Should return ok(false) and an error(Cannot found the dog breed, bad id format)", (done: DoneFn) => {
          const idBreed = "61ab63298b3ed2349da8eeec";
          const mockResponseGetBreedById: BreedBadFormmatted = {
            ok: false,
            error: "Cannot found the dog breed, bad id format",
          };
          httpClientSpy.get.and.returnValue(of(mockResponseGetBreedById));

          breedService
            .getBreedById(idBreed)
            .subscribe((breedBadFormmatedResp) => {
              expect(breedBadFormmatedResp).toEqual(mockResponseGetBreedById);
              done();
            });
        });
      });
      describe("And its good formatted", () => {
        it("Should return ok(false) and an error(Breed not found)", (done: DoneFn) => {
          const idBreed = "1";
          const mockResponseGetBreedById: BreedNotFound = {
            ok: false,
            error: "Breed not found",
          };
          httpClientSpy.get.and.returnValue(of(mockResponseGetBreedById));

          breedService.getBreedById(idBreed).subscribe((breedNotFoundResp) => {
            expect(breedNotFoundResp).toEqual(mockResponseGetBreedById);
            done();
          });
        });
      });
    });
  });

  describe("Given a method deleteBreed", () => {
    describe("When the id of the breed exists", () => {
      describe("When there is a correct user token in localStorage", () => {
        it("Should return the breed deleted", (done: DoneFn) => {
          const token = "fakeToken";
          localStorage.setItem("userToken", token);
          const breedId = "61ab63298b3ed2349da8eeec";
          const mockResponseBreed: Breed = {
            breedName: "Affenpinscher",
            description:
              '"The Affenpinscher is square-proportioned, compact and sturdy, with medium bone. This breed is a smaller version of a working terrier, and as such is not a delicate dog. This is an active, tough dog that is agile enough to catch and dispatch rodents."',
            breedPhoto:
              "https://storage.googleapis.com/doggy-5006f.appspot.com/affenpinscher-1638621993361-.jpg",
            adaptability: 7,
            friendliness: 5,
            healthNeeds: 3,
            physicalNeeds: 5,
            trainability: 4,
            vocality: 4,
            id: "61ab63298b3ed2349da8eeec",
          };

          httpClientSpy.delete.and.returnValue(of(mockResponseBreed));

          breedService.deleteBreed(breedId).subscribe((deletedBreed) => {
            expect(deletedBreed).toEqual(mockResponseBreed);
            expect(localStorage.getItem("userToken")).toBe(token);
            done();
          });
        });
      });
      describe("When there is a incorrect or no userToken in localStorage", () => {
        it("Should return ok(false) and a error(Unauthorized)", (done: DoneFn) => {
          const breedId = "61ab63298b3ed2349da8eeec";
          const mockRespGetBreeds: Unauthorized = {
            ok: false,
            error: "Unauthorized",
          };
          httpClientSpy.delete.and.returnValue(of(mockRespGetBreeds));

          breedService.deleteBreed(breedId).subscribe((unauthorizedResp) => {
            expect(unauthorizedResp).toEqual(mockRespGetBreeds);
            done();
          });
        });
      });
    });
    describe("When the id of the breed doesn't exist", () => {
      describe("An its bad formmated", () => {
        it("Should return ok(false) and an error(Cannot found the dog breed, bad id format)", (done: DoneFn) => {
          const idBreed = "61ab63298b3ed2349da8eeec";
          const mockResponseGetBreedById: BreedBadFormmatted = {
            ok: false,
            error: "Cannot found the dog breed, bad id format",
          };
          httpClientSpy.delete.and.returnValue(of(mockResponseGetBreedById));

          breedService
            .deleteBreed(idBreed)
            .subscribe((breedBadFormmatedResp) => {
              expect(breedBadFormmatedResp).toEqual(mockResponseGetBreedById);
              done();
            });
        });
      });
      describe("And its good formatted", () => {
        it("Should return ok(false) and an error(Breed not found)", (done: DoneFn) => {
          const idBreed = "1";
          const mockResponseGetBreedById: BreedNotFound = {
            ok: false,
            error: "Breed not found",
          };
          httpClientSpy.delete.and.returnValue(of(mockResponseGetBreedById));

          breedService.deleteBreed(idBreed).subscribe((breedNotFoundResp) => {
            expect(breedNotFoundResp).toEqual(mockResponseGetBreedById);
            done();
          });
        });
      });
    });
  });

  describe("Given a method createBreeds", () => {
    describe("When there is a correct user token in localStorage", () => {
      it("Should create a breed", (done: DoneFn) => {
        const token = "fakeToken";
        localStorage.setItem("userToken", token);
        const breed: any = {
          breedName: "testDog4",
          description:
            "Small, compact, and hardy, Beagles are active companions for kids and adults alike. Canines of this dog breed are merry and fun loving, but being hounds, they can also be stubborn and require patient, creative training techniques.",
          breedPhoto:
            "https://storage.googleapis.com/doggy-5006f.appspot.com/terrier-1638732043612-.jpg",
          adaptability: 7,
          friendliness: 5,
          healthNeeds: 3,
          physicalNeeds: 4,
          trainability: 4,
          vocality: 5,
        };
        const mockRespCreateBreed: any = { breed };

        httpClientSpy.post.and.returnValue(of(mockRespCreateBreed));

        breedService.createBreed(breed).subscribe((breedResp) => {
          expect(localStorage.getItem("userToken")).toBe(token);
          expect(breedResp).toEqual(mockRespCreateBreed);
          done();
        });
      });
    });
    describe("When there is a incorrect or no userToken in localStorage", () => {
      it("Should return ok(false) and a error(Unauthorized)", (done: DoneFn) => {
        const token = "";
        localStorage.setItem("userToken", token);
        const breed: any = {
          breedName: "testDog4",
          description:
            "Small, compact, and hardy, Beagles are active companions for kids and adults alike. Canines of this dog breed are merry and fun loving, but being hounds, they can also be stubborn and require patient, creative training techniques.",
          breedPhoto:
            "https://storage.googleapis.com/doggy-5006f.appspot.com/terrier-1638732043612-.jpg",
          adaptability: 7,
          friendliness: 5,
          healthNeeds: 3,
          physicalNeeds: 4,
          trainability: 4,
          vocality: 5,
        };
        const mockRespGetBreeds: Unauthorized = {
          ok: false,
          error: "Unauthorized",
        };
        httpClientSpy.delete.and.returnValue(of(mockRespGetBreeds));

        breedService.deleteBreed(breed).subscribe((unauthorizedRespCreate) => {
          expect(localStorage.getItem("userToken")).toBe(token);
          expect(unauthorizedRespCreate).toEqual(mockRespGetBreeds);
          done();
        });
      });
    });
  });

  describe("Given a method updateBreed", () => {
    describe("When the id of the breed exists", () => {
      describe("When there is a correct user token in localStorage", () => {
        it("Should return the breed updated", (done: DoneFn) => {
          const token = "fakeToken";
          localStorage.setItem("userToken", token);
          const breedId = "61ab63298b3ed2349da8eeec";
          const breedAtributesToChange = {
            adaptability: 1,
            friendliness: 1,
            healthNeeds: 0,
          };
          const mockResponseUpdateBreed: Breed = {
            breedName: "Affenpinscher",
            description:
              '"The Affenpinscher is square-proportioned, compact and sturdy, with medium bone. This breed is a smaller version of a working terrier, and as such is not a delicate dog. This is an active, tough dog that is agile enough to catch and dispatch rodents."',
            breedPhoto:
              "https://storage.googleapis.com/doggy-5006f.appspot.com/affenpinscher-1638621993361-.jpg",
            adaptability: 1,
            friendliness: 1,
            healthNeeds: 0,
            physicalNeeds: 5,
            trainability: 4,
            vocality: 4,
            id: "61ab63298b3ed2349da8eeec",
          };

          httpClientSpy.put.and.returnValue(of(mockResponseUpdateBreed));

          breedService
            .updateBreed(breedAtributesToChange, breedId)
            .subscribe((breedWithUpdatedAttr) => {
              expect(breedWithUpdatedAttr).toEqual(mockResponseUpdateBreed);
              expect(localStorage.getItem("userToken")).toBe(token);
              done();
            });
        });
      });
      describe("When there is a incorrect or no userToken in localStorage", () => {
        it("Should return ok(false) and a error(Unauthorized)", (done: DoneFn) => {
          const breedAtributesToChange = {
            adaptability: 1,
            friendliness: 1,
            healthNeeds: 0,
          };
          const breedId = "61ab63298b3ed2349da8eeec";
          const mockResponseUpdateBreed: Unauthorized = {
            ok: false,
            error: "Unauthorized",
          };
          httpClientSpy.put.and.returnValue(of(mockResponseUpdateBreed));

          breedService
            .updateBreed(breedAtributesToChange, breedId)
            .subscribe((unauthorizedResp) => {
              expect(unauthorizedResp).toEqual(mockResponseUpdateBreed);
              done();
            });
        });
      });
    });
    describe("When the id of the breed doesn't exist", () => {
      it("Should return ok(false) and an error(Error trying to update the breed)", (done: DoneFn) => {
        const idBreed = "1";
        const breedAtributesToChange = {
          adaptability: 1,
          friendliness: 1,
          healthNeeds: 0,
        };
        const mockResponseUpdateBreed: CouldNotUpdateBreed = {
          ok: false,
          error: "Error trying to update the breed",
        };
        httpClientSpy.put.and.returnValue(of(mockResponseUpdateBreed));

        breedService
          .updateBreed(breedAtributesToChange, idBreed)
          .subscribe((breedNotFoundResp) => {
            expect(breedNotFoundResp).toEqual(mockResponseUpdateBreed);
            done();
          });
      });
    });
  });
});
