import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface RecommendationRequest {
  carrera: string;
  area: string;
  tecnologias: string[];
  dificultad: string;
  interes: string;
}

export interface RecommendationResponse {
  id: string;
}

export interface RecommendationItem {
  title: string;
  description: string;
  technologies: string[];
}

export interface RecommendationResult {
  status: string;
  rating?: number;
  data?: RecommendationItem[];
}

export interface StoredRecommendation {
  id: string;
  data: RecommendationItem[];
  rating?: number;
}

export interface RecommendationRatingResponse {
  id: string;
  rating: number;
}

@Injectable({
  providedIn: 'root'
})
export class RecommendationService {
  private readonly apiUrl = environment.API;

  constructor(private readonly http: HttpClient) {}

  createRecommendation(body: RecommendationRequest): Observable<RecommendationResponse> {
    return this.http.post<RecommendationResponse>(`${this.apiUrl}/recommend`, body);
  }

  getRecommendationById(id: string): Observable<RecommendationResult> {
    return this.http.get<RecommendationResult>(`${this.apiUrl}/recommendation/${id}`);
  }

  getAllRecommendations(): Observable<StoredRecommendation[]> {
    return this.http.get<StoredRecommendation[]>(`${this.apiUrl}/recommendations`);
  }

  getRandomRecommendation(): Observable<StoredRecommendation> {
    return this.http.get<StoredRecommendation>(`${this.apiUrl}/recommend/random`);
  }

  updateRecommendationRating(id: string, rating: number): Observable<RecommendationRatingResponse> {
    return this.http.patch<RecommendationRatingResponse>(
      `${this.apiUrl}/recommendation/${id}/rating`,
      { rating }
    );
  }
}
