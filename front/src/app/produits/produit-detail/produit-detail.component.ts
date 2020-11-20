import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Produit } from 'src/app/models/produit.model';
import { ProduitsService } from 'src/app/services/produits.service';
import { UserService } from 'src/app/services/user.service';
import { NgForm } from '@angular/forms';
import { PanierService } from 'src/app/services/panier.service';

@Component({
  selector: 'app-produit-detail',
  templateUrl: './produit-detail.component.html',
  styleUrls: ['./produit-detail.component.css'],
})
export class ProduitDetailComponent implements OnInit {
  produit: Produit;
  id: string;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private produitsService: ProduitsService,
    private userService: UserService,
    private flashMessage: FlashMessagesService,
    private panierService: PanierService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      if (params['id'] != undefined) {
        this.id = params['id'];
        this.produitsService.getProduits().subscribe((produits: Produit[]) => {
          this.produit = produits.filter((p) => p._id === this.id)[0];
        });
      }
    });
  }

  onAjout(form: NgForm, nomP: string, typeP: string, prixP: string): void {
    let id = JSON.parse(atob(this.userService.getToken().split('.')[1]))._id;
    let produitPanier = {
      userId: id,
      nomProduit: nomP,
      type: typeP,
      prix: prixP,
      quantite: form.value.quantite,
    };
    this.panierService.ajoutProduitPanier(produitPanier).subscribe((res) => {
      if (res) {
        this.flashMessage.show(
          'Vous avez ajouté un produit dans votre panier !',
          { cssClass: 'alert-success', timeout: 2000 }
        );
      }
    });
  }
}
