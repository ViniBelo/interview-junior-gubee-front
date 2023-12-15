import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Hero } from '../../interfaces/hero';
import { HeroServiceService } from '../../services/hero-service.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule],
  providers: [HeroServiceService],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss'
})
export class HeroComponent implements OnInit {
  form_search: FormGroup
  hero: Hero

  constructor(private formBuilder: FormBuilder, private heroService: HeroServiceService) {}

  ngOnInit() {
    this.form_search = this.formBuilder.group({
      name: ['', Validators.required]
    })
  }

  findByName(name: string) {
    return this.heroService.findByName(name)
  }

  onSubmit() {
    if (this.form_search.valid) {
      this.findByName(this.form_search.controls['name'].value).subscribe(
        hero => {
          console.log(hero)
          this.hero = hero
        })
    } else {
      alert("Preencha todos os campos")
    }
  }
}
