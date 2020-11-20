//modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSliderModule } from '@angular/material/slider';
import { MatIconModule } from '@angular/material/icon';

//routing
import { routes } from './app-routing.module';

//Components
import { AppComponent } from './app.component';
import { ProduitsComponent } from './produits/produits.component';
import { MenuComponent } from './menu/menu.component';
import { PanierComponent } from './panier/panier.component';
import { RechercheComponent } from './recherche/recherche.component';
import { UtilisateurComponent } from './utilisateur/utilisateur.component';
import { AuthentificationComponent } from './utilisateur/authentification/authentification.component';
import { InscriptionComponent } from './utilisateur/inscription/inscription.component';
import { FooterComponent } from './footer/footer.component';
import { ProfileComponent } from './utilisateur/profile/profile.component';
import { RouterModule } from '@angular/router';
import { FlashMessagesModule } from 'angular2-flash-messages';

//service
import { UserService } from './services/user.service';

//other
import { AuthInterceptor } from './auth/auth.interceptor';
import { AuthGuard } from './auth/auth.guard';
import { RechercheResultatComponent } from './recherche/recherche-resultat/recherche-resultat.component';
import { ProduitDetailComponent } from './produits/produit-detail/produit-detail.component';
import { ProduitListComponent } from './produits/produit-list/produit-list.component';


@NgModule({
  declarations: [
    AppComponent,
    ProduitsComponent,
    MenuComponent,
    PanierComponent,
    RechercheComponent,
    UtilisateurComponent,
    AuthentificationComponent,
    InscriptionComponent,
    ProfileComponent,
    RechercheResultatComponent,
    FooterComponent,
    ProduitDetailComponent,
    ProduitListComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    MatIconModule,
    MatSliderModule,
    FlashMessagesModule.forRoot(),
    RouterModule.forRoot(routes),
    AppRoutingModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    UserService,
    AuthGuard,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
