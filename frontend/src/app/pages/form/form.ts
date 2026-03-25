import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Location, NgIf } from '@angular/common';
import { take } from 'rxjs';
import {
  RecommendationRequest,
  RecommendationService,
} from '../../services/recommendation.service';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './form.html',
  styleUrl: './form.css',
})
export class Form {

  constructor(
    private location: Location,
    private recommendationService: RecommendationService,
    private router: Router
  ) {}

  loading = false;

  formData = {
    carrera: '',
    area: '',
    tecnologias: '',
    dificultad: '',
    interes: ''
  };

  goBack() {
    this.location.back();
  }

  submitForm() {

    this.loading = true;

    const body: RecommendationRequest = {
      carrera: this.formData.carrera,
      area: this.formData.area,
      tecnologias: this.formData.tecnologias.split(','),
      dificultad: this.formData.dificultad,
      interes: this.formData.interes
    };

    this.recommendationService.createRecommendation(body)
      .pipe(take(1))
      .subscribe(res => {

        const id = res.id;
        this.router.navigate(['/results', id]);

      }, err => {

        this.loading = false;
        console.error(err);

      });

  }

}
