import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';


import { environment } from 'src/environments/environment';
import { Produit } from '../models/produit.model';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProduitsService {
  private subject = new Subject<Produit>();
  constructor(private http : HttpClient) { }

  getProduits() : Observable<any> {
    return this.http.get(environment.apiBaseUrl +'produits');
  }

  getProduitsParCategorie(categorie: string): Observable<any>{
    return this.http.get(environment.apiBaseUrl +'produits/'+categorie);
  }

  getCategories() : Observable<any>{
    return this.http.get(environment.apiBaseUrl + 'categories');
  }

  getProduit(id: string): Observable<Produit>{
    return this.getProduits().pipe(filter((produit: Produit) => produit._id === id));
  }
}
