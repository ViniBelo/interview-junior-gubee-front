import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Race } from '../../interfaces/race';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { HeroServiceService } from '../../services/hero-service.service';
import { CreateHeroComponent } from '../create-hero/create-hero.component';
import { Router } from '@angular/router';
import { Hero } from '../../interfaces/hero';

@Component({
  selector: 'app-edit-hero',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  providers: [HeroServiceService, CreateHeroComponent],
  templateUrl: './edit-hero.component.html',
  styleUrl: './edit-hero.component.scss'
})
export class EditHeroComponent implements OnInit { 
  hero: Hero
  form_edit: FormGroup
  numbers = Array.from({ length: 11 }, (_, i) => i)
  races = Object.values(Race)
  selectedRace: Race
  selectedStrength: number
  selectedAgility: number
  selectedDexterity: number
  selectedIntelligence: number

  constructor(private formBuilder: FormBuilder, private heroService: HeroServiceService, private router: Router) {}

  ngOnInit(): void {
    const nav = this.router.getCurrentNavigation()
    this.hero = nav.extras.state.objeto
    this.form_edit = this.formBuilder.group({
      name: ['', Validators.required],
      race: [this.selectedRace, Validators.required],
      strength: [this.selectedStrength],
      agility: [this.selectedAgility],
      dexterity: [this.selectedDexterity],
      intelligence: [this.selectedIntelligence],
    })
  }

  onSubmit() {
    console.log("Editado!")
  }
}
