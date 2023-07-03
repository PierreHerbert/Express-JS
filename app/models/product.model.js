const sql = require("../../db.js");
// Le constructeur
const Product = function(product) {
this.name = product.name;
this.price = product.price;
this.description = product.description;
};

//Créer un produit
Product.create = (newProduct, result) => {
    sql.query("INSERT INTO products SET ?", newProduct, (err, res) => {
    if (err) {
    console.log("error: ", err);
    result(err, null);
    return;
    }
    console.log("created product: ", { id: res.insertId, ...newProduct });
    result(null, { id: res.insertId, ...newProduct });
    });
};

//Affichage d'un produit grâce à son identifiant
Product.findById = (id, result) => {
    sql.query(`SELECT * FROM products WHERE id = ${id}`, (err, res) => {
    if (err) {
    console.log("error: ", err);
    result(err, null);
    return;
    }
    if (res.length) {
    console.log("Produit trouvé: ", res[0]);
    result(null, res[0]);
    return;
    }
    result({ kind: "Aucun produit ne correspond" }, null);
    });
};

//Affichage de tous les produits
Product.getAll = (name, result) => {
    let query = "SELECT * FROM products";
    if (name) {
    query += ` WHERE name LIKE '%${name}%'`;
    }
    sql.query(query, (err, res) => {
    if (err) {
    console.log("Erreur: ", err);
    result(null, err);
    return;
    }
    console.log("Produits: ", res);
    result(null, res);
    });
};

//Modification d'un produit
Product.updateById = (id, product, result) => {
    sql.query(
    "UPDATE products SET name = ?, description = ?, price = ? WHERE id = ?",
    [product.name, product.description, product.price, id],
    (err, res) => {
    if (err) {
    console.log("Erreur: ", err);
    result(null, err);
    return;
    }
    if (res.affectedRows == 0) {
    result({ kind: "Aucun produit ne correspond" }, null);
    return;
    }
    console.log("Produit modifié: ", { id: id, ...product });
    result(null, { id: id, ...product });
    }
    );
};

//Suppression d'un produit
Product.remove = (id, result) => {
    sql.query("DELETE FROM products WHERE id = ?", id, (err, res) => {
    if (err) {
    console.log("Erreur: ", err);
    result(null, err);
    return;
    }
    if (res.affectedRows == 0) {
    // not found Product with the id
    result({ kind: "Aucun produit ne correspond" }, null);
    return;
    }
    console.log("Suppression du produit avec l'identifiant: ", id);
    result(null, res);
    });
    };
    //Suppression de tous les produits
    Product.removeAll = result => {
    sql.query("DELETE FROM products", (err, res) => {
    if (err) {
    console.log("Erreur: ", err);
    result(null, err);
    return;
    }
    console.log(`Suppression de ${res.affectedRows} produits`);
    result(null, res);
    });
};

module.exports = Product;
    