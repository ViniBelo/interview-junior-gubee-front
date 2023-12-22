import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
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
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    ModalModule,
    MatTableModule,
    MatIconModule,
    MatToolbarModule,
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
  heroes: Hero[] = [];
  selectedHeroes: Hero[] = [];

  constructor(
    private heroService: HeroServiceService,
    private router: Router,
    private modalService: BsModalService
  ) {
    this.getAll();
  }

  ngOnInit() {
    this.getAll();
  }

  toggleHeroSelection(hero: Hero) {
    if (this.selectedHeroes.includes(hero)) {
      this.selectedHeroes = this.selectedHeroes.filter((h) => h !== hero);
    } else {
      this.selectedHeroes.push(hero);
    }
  }

  getAll() {
    this.heroes = this.heroService.getAll();
  }

  findByName(name: string) {
    return this.heroService.findByName(name);
  }

  deleteById() {
    return this.heroService.deleteById(this.hero.id);
  }

  openConfirmation(template: TemplateRef<any>, hero: Hero) {
    this.hero = hero;
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }

  decline() {
    this.modalRef?.hide();
  }

  delete(hero: Hero) {
    this.modalRef?.hide();
    window.location.reload();
    this.heroes = this.heroes.filter((h) => h !== hero);
    this.deleteById();
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
