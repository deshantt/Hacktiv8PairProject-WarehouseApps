const { Product, Warehouse, Employee, Stock } = require("../models")
const warehouse = require("../models/warehouse")

class ProductController {

    // Read
    static show(req, res) {
        Product.findAll()
            .then(products => res.render("products", { products, nav: 'product' }))
            .catch(err => res.send(err))
    }

    static showAllStock(req, res){
        let keyParams = +req.params.id
        Stock.findAll({include:[{model: Warehouse}, {model: Product}]}).then(data =>{
            let result = []
            for (let i = 0; i < data.length; i++) {
                if(data[i].dataValues.ProductId === keyParams){
                    result.push(data[i].dataValues)
                }
            }
            console.log(result)

            if(result.length !== 0){
                res.render('stock', {result, title: [data[0].Product.name, data[0].Product.name, data[0].Product.id]})
            } else {
                Product.findOne( {where: {id: keyParams} }).then(data =>{
                res.render('stock', {result: [], title: [data.dataValues.name, data.dataValues.category, data.dataValues.id]})
                console.log(data)
                }).catch(err => {
                       res.send(err)
                })
            }
        }).catch(err =>{
            console.log(err)
        })

    }

    static addGet(req, res) {
        if (req.query.error) {
            res.render("addProduct", { err: req.query.error, nav: 'product'  })
        }
        else {
            res.render("addProduct", { err: null , nav: 'product' })
        }
    }

    static addPost(req, res) {
        const { name, category, expiryDate, price } = req.body
        const productObj = { name, category, expiryDate, price }

        Product.create(productObj)
            .then(() => res.redirect("/products"))
            .catch(err => res.send(err))
    }

    static addGetStock(req, res) {
        let idProduct = +req.params.id
        console.log(idProduct)

        Product.findOne({include:[{model: Warehouse}], where: {id: idProduct}}).then(data =>{
            
            return new Promise((resolve, reject) => {
                if(data){
                    Warehouse.findAll().then(warehouse =>{
                            resolve({data, warehouse})
                        }).catch(err => res.send(err))
                } else {
                    reject('Data tidak ditemukan')
                }
            })
        }).then(data =>{
            if (req.query.error) {
                res.render("addStock", { data, err: req.query.error , nav: 'product' })
            } else {
                res.render("addStock", { data, err: null , nav: 'product' })
            }
        })
        .catch(err => console.log(err))
    }

    static addPostStock(req, res) {
        let idProduct = +req.params.id
        const { stock, warehouse } = req.body
        const productObj = 
            { ProductId : idProduct, 
                Stock : stock, 
                WarehouseId: warehouse }

        Stock.create(productObj)
            .then(() => res.redirect(`/products/${idProduct}/stock`))
            .catch(err => res.send(err))
    }


    static editGet(req, res) {
        let id = +req.params.id
        Product.findByPk(id)
            .then((product) => {
                if (!req.query.error) {
                    res.render("editProduct", { product, err: null , nav: 'product' })
                }
                else {
                    res.render("editProduct", { product, err: req.query.error , nav: 'product' })
                }
            })
            .catch(err => res.send(err))
    }

    static editPost(req, res) {
        const { name, category, expiryDate, price } = req.body
        const productObj = { name, category, expiryDate, price }
        let id = +req.params.id

        Product.update(productObj, { where: { id } })
            .then(() => res.redirect("/products"))
            .catch(err => res.send(err))
    }

    static delete(req, res) {
        let id = +req.params.id
        Product.destroy({ where: { id } })
            .then(() => res.redirect("/products"))
            .catch(err => res.send(err))
    }
}

module.exports = ProductController
