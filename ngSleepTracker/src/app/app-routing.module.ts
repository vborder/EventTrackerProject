import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
// import { DetailsComponent } from './components/details/details.component';
// import { CreateComponent } from './components/create/create.component';
// import { UpdateComponent } from './components/update/update.component';


const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'home'},
  {path: 'home', component: HomeComponent },
  // {path: 'details/:sleepId', component: DetailsComponent },
  // {path: 'create', component: CreateComponent },
  // {path: 'update/:sleepId', component: UpdateComponent }
  // {path: '**', component: NotFoundComponent }, // check to see if this should be added
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
