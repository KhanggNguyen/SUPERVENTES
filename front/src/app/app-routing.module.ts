import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProduitsComponent } from './produits/produits.component';
import { UtilisateurComponent } from './utilisateur/utilisateur.component';
import { InscriptionComponent } from './utilisateur/inscription/inscription.component';
import { AuthentificationComponent } from './utilisateur/authentification/authentification.component';
import { ProfileComponent } from './utilisateur/profile/profile.component';
import { PanierComponent } from './panier/panier.component';
import { RechercheComponent } from './recherche/recherche.component';
import { RechercheResultatComponent } from './recherche/recherche-resultat/recherche-resultat.component';

import { AuthGuard } from './auth/auth.guard';
import { ProduitDetailComponent } from './produits/produit-detail/produit-detail.component';
import { ProduitListComponent } from './produits/produit-list/produit-list.component';

export const routes: Routes = [
  {
    path : 'produits',
    component: ProduitsComponent,
    children: [{path: '', component: ProduitListComponent}]
  },
  {
    path: 'produits/:categorie',
    component: ProduitsComponent,
    children: [{path: '', component: ProduitListComponent}]
  },
  {
    path: 'produits/detail/:id',
    component: ProduitsComponent,
    children: [{path : '', component: ProduitDetailComponent}]
  },
  {
    path: 'inscription', component: UtilisateurComponent,
    children: [{ path : '', component: InscriptionComponent }]
  },
  {
    path: 'authentification', component: UtilisateurComponent,
    children: [{ path : '', component: AuthentificationComponent }]
  },
  {
    path: 'profile', component: ProfileComponent, canActivate:[AuthGuard]
  },
  {
    path: 'panier', component: PanierComponent, canActivate:[AuthGuard]
  },
  {
    path: 'supprimerProduitPanier/:id', component: PanierComponent, canActivate:[AuthGuard]
  },
  {
    path: 'recherche', component: RechercheComponent, canActivate:[AuthGuard]
  },
  {
    path: 'rechercheResult', component: RechercheResultatComponent, canActivate:[AuthGuard]
  },
  {
    path: '', redirectTo: 'produits', pathMatch:'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
