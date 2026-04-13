import { ChangeDetectorRef, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { take } from 'rxjs';
import {
  Question,
  QAPair,
  RecommendationService,
} from '../../services/recommendation.service';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './form.html',
  styleUrl: './form.css',
})
export class Form {
  step: 1 | 2 = 1;
  loading = false;

  career = '';
  questions: Question[] = [];
  answers: string[] = [];

  constructor(
    private location: Location,
    private recommendationService: RecommendationService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  goBack() {
    if (this.step === 2) {
      this.step = 1;
    } else {
      this.location.back();
    }
  }

  submitCareer() {
    if (!this.career.trim()) return;

    this.loading = true;

    this.recommendationService.getQuestions(this.career)
      .pipe(take(1))
      .subscribe({
        next: (res) => {
          this.questions = res.questions;
          this.answers = new Array(res.questions.length).fill('');
          this.step = 2;
          this.loading = false;
          this.cdr.detectChanges();
        },
        error: (err) => {
          console.error(err);
          this.loading = false;
          this.cdr.detectChanges();
        }
      });
  }

  submitAnswers() {
    this.loading = true;

    const qa_pairs: QAPair[] = this.questions.map((q, i) => ({
      question: q.question,
      answer: this.answers[i] ?? '',
    }));

    this.recommendationService.createRecommendation({ career: this.career, qa_pairs })
      .pipe(take(1))
      .subscribe({
        next: (res) => {
          this.router.navigate(['/results', res.id]);
        },
        error: (err) => {
          console.error(err);
          this.loading = false;
        }
      });
  }
}