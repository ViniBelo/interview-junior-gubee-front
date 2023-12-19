import { Routes } from '@angular/router';
import { HeroComponent } from './pages/hero/hero.component';
import { CreateHeroComponent } from './pages/create-hero/create-hero.component';
import { EditHeroComponent } from './pages/edit-hero/edit-hero.component';
import { CompareHeroesComponent } from './pages/compare-heroes/compare-heroes.component';

export const routes: Routes = [
    {
        path: '',
        component: HeroComponent
    },
    {
        path: 'create',
        component: CreateHeroComponent
    },
    {
        path: 'edit',
        component: EditHeroComponent
    },
    {
        path: 'compare',
        component: CompareHeroesComponent
    }
];
