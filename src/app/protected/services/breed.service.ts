import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

import {
  CreateBreedResponse,
  DeleteBreedResponse,
  GetBreedByIdResponse,
  GetBreedsResponse,
  UpdateBreedResponse,
} from "src/app/shared/types/types";
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class BreedService {
  private baseUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getBreeds(): Observable<GetBreedsResponse> {
    return this.http.get<GetBreedsResponse>(`${this.baseUrl}/breeds`, {
      headers: new HttpHeaders({
        "Content-type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("userToken") || ""}`,
      }),
    });
  }

  getBreedById(id: string): Observable<GetBreedByIdResponse> {
    return this.http.get<GetBreedByIdResponse>(`${this.baseUrl}/breeds/${id}`, {
      headers: new HttpHeaders({
        "Content-type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("userToken") || ""}`,
      }),
    });
  }

  createBreed(breedForm: FormData): Observable<CreateBreedResponse> {
    return this.http.post<CreateBreedResponse>(
      `${this.baseUrl}/breeds`,
      breedForm,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      }
    );
  }

  deleteBreed(id: string): Observable<DeleteBreedResponse> {
    return this.http.delete<DeleteBreedResponse>(
      `${this.baseUrl}/breeds/${id}`,
      {
        headers: new HttpHeaders({
          "Content-type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("userToken") || ""}`,
        }),
      }
    );
  }

  updateBreed(
    breedAtributes: any,
    id: string
  ): Observable<UpdateBreedResponse> {
    return this.http.put<UpdateBreedResponse>(
      `${this.baseUrl}/breeds/${id}`,
      breedAtributes,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      }
    );
  }
}
