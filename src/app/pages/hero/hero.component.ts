import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Hero } from '../../interfaces/hero';
import { HeroServiceService } from '../../services/hero-service.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  providers: [HeroServiceService, HeroComponent],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss'
})
export class HeroComponent implements OnInit {
  form_search: FormGroup
  hero: Hero

  constructor(private formBuilder: FormBuilder, private heroService: HeroServiceService, private router: Router) {}

  ngOnInit() {
    this.form_search = this.formBuilder.group({
      name: ['', Validators.required]
    })
  }

  findByName(name: string) {
    return this.heroService.findByName(name)
  }

  deleteById() {
    return this.heroService.deleteById(this.hero.id)
  }

  onSubmit() {
    if (this.form_search.valid) {
      this.findByName(this.form_search.controls['name'].value).subscribe(
        hero => {
          this.hero = hero
        })
    } else {
      alert("Preencha todos os campos")
    }
  }

  delete() {
    // TODO confirmation to delete and notificate abou the deletion
    window.location.reload()
    this.deleteById()
  }

  goToEditComponent(hero: Hero) {
    if (hero != null) {
      this.router.navigateByUrl('/edit', {state: {objeto: hero}})
    }
  }

  goToCreateComponent() {
    this.router.navigateByUrl('/create')
  }
}
