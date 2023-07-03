module.exports = app => {
    const products = require("../controllers/product.controller.js");
    var router = require("express").Router();
    // Crée un nouveau produit
    router.post("/", products.create);
    // Récupère tous les produits
    router.get("/", products.findAll);
    // Récupère un produit en fonction de son id
    router.get("/:id", products.findOne);
    // Modifie un produit
    router.put("/:id", products.update);
    // Supprime un produit
    router.delete("/:id", products.delete);
    // Supprime tous les produits
    router.delete("/", products.deleteAll);
    app.use('/api/products', router);
};
    