const { Employee, Product, Warehouse } = require("../models")

class WarehouseController {

    // Read
    static show(req, res) {
        Warehouse.findAll()
            .then(warehouses => {
                console.log(warehouses)
                res.render("warehouses", { warehouses , nav: 'warehouse' })
            })
            .catch(err => res.send(err))
    }

    static showEmployeeRegistered(req, res){
        let keyParams = +req.params.id
        Employee.findAll({include:[{model: Warehouse}]}).then(data =>{
            let result = []
            for (let i = 0; i < data.length; i++) {
                if(data[i].dataValues.WarehouseId === keyParams){
                    result.push(data[i])
                }
            }

            if(result.length !== 0){
                res.render('employeeWarehouse', {address: result[0].Warehouse.dataValues.address, warehouse: `${result[0].Warehouse.dataValues.city}-${result[0].Warehouse.dataValues.id}`, result })
            } else {
                Warehouse.findOne( {where: {id: keyParams} }).then(data =>{
                    res.render('employeeWarehouse', {address: data.dataValues.address, warehouse: `${data.dataValues.city}-${data.dataValues.id}`, result: [] })
                }).catch(err => {
                       res.send(err)
                })
            }
        }).then(err =>{
            console.log(err)
        })
    }

    static addGet(req, res) {
        if (req.query.error) {
            res.render("addWarehouse", { err: req.query.error , nav: 'warehouse'})
        }
        else {
            res.render("addWarehouse", { err: null , nav: 'warehouse'})
        }
    }

    static addPost(req, res) {
        const { city, address, leaseExpiryDate } = req.body
        const warehouseObj = { city, address, leaseExpiryDate }

        Warehouse.create(warehouseObj)
            .then(() => res.redirect("/warehouses"))
            .catch(err => res.send(err))
    }

    static editGet(req, res) {
        let id = +req.params.id
        Warehouse.findByPk(id)
            .then((warehouse) => {
                console.log(warehouse)
                if (!req.query.error) {
                    res.render("editWarehouse", { warehouse, err: null , nav: 'warehouse'})
                }
                else {
                    res.render("editWarehouse", { warehouse, err: req.query.error, nav: 'warehouse' })
                }
            })
            .catch(err => res.send(err))
    }

    static editPost(req, res) {
        const { city, address, leaseExpiryDate } = req.body
        const warehouseObj = { city, address, leaseExpiryDate }
        let id = +req.params.id

        Warehouse.update(warehouseObj, { where: { id } })
            .then(() => res.redirect("/warehouses"))
            .catch(err => res.send(err))
    }

    static delete(req, res) {
        let id = +req.params.id
        Warehouse.destroy({ where: { id } })
            .then(() => res.redirect("/warehouses"))
            .catch(err => res.send(err))
    }
}

module.exports = WarehouseController
