import { AfterViewInit, Component, OnChanges, OnInit, SimpleChanges, TemplateRef, ViewChild } from '@angular/core';
import {
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { Hero } from '../../interfaces/hero';
import { HeroServiceService } from '../../services/hero-service.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService, ModalModule } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    ModalModule,
  ],
  providers: [HeroServiceService, HeroComponent, BsModalService],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
})
export class HeroComponent implements OnInit {
  @ViewChild('adviceModal') adviceModal: TemplateRef<any>;
  modalRef?: BsModalRef;
  form_search: FormGroup;
  hero: Hero;
  heroes: Hero[] = this.getAll();
  selectedHeroes: Hero[] = [];

  constructor(
    private heroService: HeroServiceService,
    private router: Router,
    private modalService: BsModalService
  ) {
    this.heroes = this.getAll();
  }

  ngOnInit(): void {
    
  }

  toggleHeroSelection(hero: Hero) {
    if (this.selectedHeroes.includes(hero)) {
      this.selectedHeroes = this.selectedHeroes.filter((h) => h !== hero);
    } else {
      this.selectedHeroes.push(hero);
    }
  }

  getAll() {
    return this.heroService.getAll();
  }

  findByName(name: string) {
    return this.heroService.findByName(name);
  }

  deleteById(hero: Hero) {
    return this.heroService.deleteById(hero.id);
  }

  openConfirmation(template: TemplateRef<any>, hero: Hero) {
    this.hero = hero;
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }

  decline() {
    this.modalRef?.hide();
  }

  delete(hero: Hero) {
    this.deleteById(hero);
    this.heroes = this.heroes.filter((h) => h !== hero);
    this.selectedHeroes = this.selectedHeroes.filter((h) => h !== hero);
    this.modalRef?.hide();
  }
  

  goToEditComponent(hero: Hero) {
    this.router.navigateByUrl('/edit', { state: { objeto: hero } });
  }

  goToCompareComponent(heroes: Hero[]) {
    this.router.navigateByUrl('/compare', { state: { objeto: heroes } });
  }

  goToCreateComponent() {
    this.router.navigateByUrl('/create');
  }
}