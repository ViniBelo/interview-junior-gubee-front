import { Component, OnInit, TemplateRef } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
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
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule, ModalModule],
  providers: [HeroServiceService, HeroComponent, BsModalService],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
})
export class HeroComponent implements OnInit {
  modalRef?: BsModalRef;
  form_search: FormGroup;
  hero: Hero;

  constructor(
    private formBuilder: FormBuilder,
    private heroService: HeroServiceService,
    private router: Router,
    private modalService: BsModalService
  ) {}

  ngOnInit() {
    this.form_search = this.formBuilder.group({
      name: ['', Validators.required],
    });
  }

  findByName(name: string) {
    return this.heroService.findByName(name);
  }

  deleteById() {
    return this.heroService.deleteById(this.hero.id);
  }

  onSubmit() {
    if (this.form_search.valid) {
      this.findByName(this.form_search.controls['name'].value).subscribe(
        (hero) => {
          this.hero = hero;
        }
      );
    } else {
      alert('Preencha todos os campos');
    }
  }

  openConfirmation(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }

  decline() {
    this.modalRef?.hide();
  }

  delete() {
    this.modalRef?.hide();
    window.location.reload();
    this.deleteById();
  }

  goToEditComponent(hero: Hero) {
    this.router.navigateByUrl('/edit', { state: { objeto: hero } });
  }

  goToCreateComponent() {
    this.router.navigateByUrl('/create');
  }
}
