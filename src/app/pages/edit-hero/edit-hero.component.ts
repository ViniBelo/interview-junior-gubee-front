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
  heroName: string
  selectedRace: Race
  selectedStrength: number
  selectedAgility: number
  selectedDexterity: number
  selectedIntelligence: number

  constructor(private formBuilder: FormBuilder, private heroService: HeroServiceService, private router: Router) {
    const nav = this.router.getCurrentNavigation();
    if (nav && nav.extras && nav.extras.state) {
      this.hero = nav.extras.state['objeto'];
    } else {
      console.error('Erro ao obter o estado de navegação.');
    }
  }

  ngOnInit(): void {
    this.heroName = this.hero.name
    this.selectedRace = this.hero.race
    this.selectedStrength = this.hero.strength
    this.selectedAgility = this.hero.agility
    this.selectedDexterity = this.hero.dexterity
    this.selectedIntelligence = this.hero.intelligence
    this.form_edit = this.formBuilder.group({
      name: [this.heroName, Validators.required],
      race: [this.selectedRace, Validators.required],
      strength: [this.selectedStrength],
      agility: [this.selectedAgility],
      dexterity: [this.selectedDexterity],
      intelligence: [this.selectedIntelligence],
    })
  }

  onSubmit() {
    this.heroService.updateHeroInformation(this.hero.id, this.form_edit.value)
    this.router.navigateByUrl('')
  }
}
