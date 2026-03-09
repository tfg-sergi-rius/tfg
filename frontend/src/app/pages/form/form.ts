import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './form.html',
  styleUrl: './form.css',
})
export class Form {

  constructor(private http: HttpClient, private router: Router) {}

  loading = false;

  formData = {
    carrera: '',
    area: '',
    tecnologias: '',
    dificultad: '',
    interes: ''
  };

  submitForm() {

    this.loading = true;

    const body = {
      carrera: this.formData.carrera,
      area: this.formData.area,
      tecnologias: this.formData.tecnologias.split(','),
      dificultad: this.formData.dificultad,
      interes: this.formData.interes
    };

    this.http.post<any>('http://127.0.0.1:8000/recommend', body)
      .subscribe(res => {

        const id = res.id;
        this.router.navigate(['/results', id]);

      }, err => {

        this.loading = false;
        console.error(err);

      });

  }

}