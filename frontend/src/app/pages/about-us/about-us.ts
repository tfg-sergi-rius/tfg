import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '../../i18n/translate.pipe';

@Component({
  selector: 'app-about-us',
  standalone: true,
  imports: [RouterLink, TranslatePipe],
  templateUrl: './about-us.html',
  styleUrl: './about-us.css',
})
export class AboutUs {
  constructor(private location: Location) {}

  goBack() {
    this.location.back();
  }
}
