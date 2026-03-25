import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location, NgFor, NgIf } from '@angular/common';
import { NgbCarousel, NgbSlide } from '@ng-bootstrap/ng-bootstrap/carousel';
import { take } from 'rxjs';
import {
  RecommendationItem,
  RecommendationService,
} from '../../services/recommendation.service';

@Component({
  selector: 'app-results',
  standalone: true,
  imports: [NgFor, NgIf, NgbCarousel, NgbSlide],
  templateUrl: './results.html',
  styleUrl: './results.css'
})
export class Results implements OnInit {
  ideas: RecommendationItem[] = [];
  readonly stars = [1, 2, 3, 4, 5];
  loading = true;
  rating = 0;
  savingRating = false;
  private recommendationId = '';

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private recommendationService: RecommendationService,
    private cdr: ChangeDetectorRef
  ) {}

  goBack() {
    this.location.back();
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.recommendationId = id ?? '';

    this.recommendationService.getRecommendationById(this.recommendationId)
      .pipe(take(1))
      .subscribe(res => {
        if (res.status === 'done') {
          this.ideas = res.data ?? [];
          this.rating = res.rating ?? 0;
        }

        this.loading = false;
        this.cdr.detectChanges();
      });
  }

  setRating(star: number) {
    if (!this.recommendationId || this.savingRating) {
      return;
    }

    this.rating = star;
    this.savingRating = true;

    this.recommendationService.updateRecommendationRating(this.recommendationId, star)
      .pipe(take(1))
      .subscribe({
        next: (response) => {
          this.rating = response.rating;
          this.savingRating = false;
          this.cdr.detectChanges();
        },
        error: (error) => {
          console.error(error);
          this.savingRating = false;
          this.cdr.detectChanges();
        },
      });
  }
}
