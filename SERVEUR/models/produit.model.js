const mongoose = require("mongoose");
const Double = require("@mongoosejs/double");

var produitSchema = new mongoose.Schema({
  nom: {
    type: String,
  },
  marque: {
    type: String,
  },
  type: {
    type: String,
  },
  prix: {
    type: Double,
  },
  rating: {
    type: Double,
  },
  numReviews: {
    type: Double,
  },
  countInStock: {
    type: Double,
  },
});

mongoose.model("Produit", produitSchema, "produits");
