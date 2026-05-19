import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Location, NgFor, NgIf } from '@angular/common';
import { take } from 'rxjs';
import {
  RecommendationItem,
  RecommendationService,
} from '../../services/recommendation.service';
import { TranslatePipe } from '../../i18n/translate.pipe';

@Component({
  selector: 'app-random',
  standalone: true,
  imports: [NgFor, NgIf, TranslatePipe],
  templateUrl: './random.html',
  styleUrl: './random.css'
})
export class Random implements OnInit {
  idea: RecommendationItem | null = null;
  loading = true;

  constructor(
    private location: Location,
    private recommendationService: RecommendationService,
    private cdr: ChangeDetectorRef
  ) {}

  goBack() {
    this.location.back();
  }

  ngOnInit() {
    this.recommendationService.getRandomRecommendation()
      .pipe(take(1))
      .subscribe({
        next: (response) => {
          this.idea = response.data[0] ?? null;
          this.loading = false;
          this.cdr.detectChanges();
        },
        error: (error) => {
          console.error(error);
          this.loading = false;
          this.cdr.detectChanges();
        },
      });
  }
}
