import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Hero } from '../../interfaces/hero';
import { HeroServiceService } from '../../services/hero-service.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Race } from '../../interfaces/race';

@Component({
  selector: 'app-create-hero',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule, FormsModule],
  providers: [HeroServiceService, CreateHeroComponent],
  templateUrl: './create-hero.component.html',
  styleUrl: './create-hero.component.scss',
})
export class CreateHeroComponent {
  form_create: FormGroup;
  hero: Hero;
  numbers = Array.from({ length: 11 }, (_, i) => i);
  races = Object.values(Race);
  selectedRace: Race;
  selectedStrength: number = 0;
  selectedAgility: number = 0;
  selectedDexterity: number = 0;
  selectedIntelligence: number = 0;

  constructor(
    private formBuilder: FormBuilder,
    private heroService: HeroServiceService,
    private router: Router
  ) {}

  ngOnInit() {
    this.form_create = this.formBuilder.group({
      name: ['', Validators.required],
      race: [this.selectedRace, Validators.required],
      strength: [this.selectedStrength, Validators.required],
      agility: [this.selectedAgility, Validators.required],
      dexterity: [this.selectedDexterity, Validators.required],
      intelligence: [this.selectedIntelligence, Validators.required],
    });
  }

  onSubmit() {
    if (this.form_create.valid) {
      this.heroService.createHero(this.form_create.value);
      this.heroService.getAll();
      this.router.navigate(['/']);
    } else {
      alert('Preencha todos os campos');
    }
  }
}
