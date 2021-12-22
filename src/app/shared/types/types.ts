import { BreedBadFormmatted } from "../interfaces/badFormmated.interface";
import { Breed } from "../interfaces/breed.interface";
import { CouldNotUpdateBreed } from "../interfaces/breedCouldNotUpdate.interface";
import { BreedNotFound } from "../interfaces/breedNotFound.interface";
import { Unauthorized } from "../interfaces/unauthorized.interface";

type GetBreedsResponse = Breed[] | Unauthorized;
type GetBreedByIdResponse =
  | Breed
  | Unauthorized
  | BreedNotFound
  | BreedBadFormmatted;
type CreateBreedResponse = Breed | Unauthorized;
type DeleteBreedResponse =
  | Breed
  | Unauthorized
  | BreedNotFound
  | BreedBadFormmatted;
type UpdateBreedResponse = Breed | Unauthorized | CouldNotUpdateBreed;

export {
  GetBreedsResponse,
  GetBreedByIdResponse,
  CreateBreedResponse,
  DeleteBreedResponse,
  UpdateBreedResponse,
};
