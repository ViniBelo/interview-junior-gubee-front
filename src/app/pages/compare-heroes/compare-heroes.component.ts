import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { HeroServiceService } from '../../services/hero-service.service';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Hero } from '../../interfaces/hero';
import { ComparedHeroes } from '../../interfaces/compared-heroes';

@Component({
  selector: 'app-compare-heroes',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  providers: [HeroServiceService, BsModalService],
  templateUrl: './compare-heroes.component.html',
  styleUrl: './compare-heroes.component.scss',
})
export class CompareHeroesComponent implements OnInit {
  @ViewChild('adviceModal') adviceModal: TemplateRef<any>;
  modalRef?: BsModalRef;
  form_compare: FormGroup;
  heroes: Hero[];
  hero1: Hero;
  hero2: Hero;
  heroesComparation: ComparedHeroes;

  constructor(
    private formBuilder: FormBuilder,
    private heroService: HeroServiceService,
    private router: Router,
    private modalService: BsModalService
  ) {
    const nav = this.router.getCurrentNavigation();
    if (nav && nav.extras && nav.extras.state) {
      this.heroes = nav.extras.state['objeto'];
      this.hero1 = this.heroes.at(0)!;
      this.hero2 = this.heroes.at(1)!;
      this.compareHeroes(this.hero1.id, this.hero2.id).subscribe(
        (comparedStats) => {
          this.heroesComparation = comparedStats;
          if (!this.hero2) {
            this.modalRef = this.modalService.show(this.adviceModal, {
              class: 'modal-sm',
            });
          }
        }
      );
    } else {
      console.error('Error getting navigation state.');
    }
  }

  ngOnInit(): void {
    this.form_compare = this.formBuilder.group({
      name: ['', Validators.required],
    });
  }

  findByName(name: string) {
    return this.heroService.findByName(name);
  }

  compareHeroes(id1: string, id2: string) {
    return this.heroService.compareHeroes(id1, id2);
  }

  onSubmit() {
    if (this.form_compare.valid) {
      this.findByName(this.form_compare.controls['name'].value).subscribe(
        (hero) => {
          this.hero2 = hero;
          if (this.hero1 && this.hero2) {
            this.compareHeroes(this.hero1.id, this.hero2.id).subscribe(
              (comparedStats) => {
                this.heroesComparation = comparedStats;
                if (!this.hero2) {
                  this.modalRef = this.modalService.show(this.adviceModal, {
                    class: 'modal-sm',
                  });
                }
              }
            );
          }
        }
      );
    } else {
      alert('Fill all fields');
    }
  }
  
}
