import { Component, OnInit } from '@angular/core';
import {coerceNumberProperty} from '@angular/cdk/coercion';
import { Router} from '@angular/router';
import { NgForm  } from '@angular/forms';
import { MatSliderChange } from '@angular/material';

import { Produit } from '../models/produit.model';
import { RechercheService } from '../services/recherche.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-recherche',
  templateUrl: './recherche.component.html',
  styleUrls: ['./recherche.component.css']
})
export class RechercheComponent implements OnInit {
  private produits : Object[] = new Array();
  private produit : Produit = {
    nom: '',
    marque:'',
    categorie:'',
    prix:''
  };
  submitted = false;
  serverErrorMessages: string;
  
  //slider
  max = 1000;
  min = 0;
  step = 1;

  constructor(
    private router: Router,
    private rechercheService: RechercheService,
    private userService: UserService
  ) { }

  ngOnInit() {
    if(!this.userService.isLoggedIn()){
      this.router.navigateByUrl('/produits');
    }
  }

  onSubmit(form: NgForm){
    this.rechercheService.getProduitsByCriteres(form.value).subscribe(
      produits => {
        this.rechercheService.rechercheAction = true;
        this.rechercheService.resultatRecherche = produits;
        this.router.navigateByUrl('/rechercheResult');
      },
      err => {
        this.serverErrorMessages = err.error.message;
      }  
    );
  }
}
