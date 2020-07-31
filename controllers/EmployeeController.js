const { Employee, Warehouse } = require("../models")

class EmployeeController {

    // Read
    static show(req, res) {
        Employee.findAll({include:[{model: Warehouse}]})
            .then(employees => res.render("employees", { employees, nav: 'employee' }))
            .catch(err => res.send(err))
    }

    static showEmployeeData(req, res){
        Employee.findAll({include:[{model: Warehouse}]}).then(data =>{
            console.log(data)
            res.render('employeeData')
        }).then(err =>{
            console.log(err)
        })
    }

    static addGet(req, res) {
        Warehouse.findAll().then(data =>{
            if (req.query.error) {
                res.render("addEmployee", { err: req.query.error, nav: 'employee', result:data })
            }
            else {
                res.render("addEmployee", { err: null, nav: 'employee', result:data })
            }    
        }).catch(err =>{
            console.log(err)
        })
    }

    static addPost(req, res) {
        const { firstName, lastName, position, gender, salary, WarehouseId } = req.body
        const employeeObj = { firstName, lastName, position, gender, salary, WarehouseId }

        Employee.create(employeeObj)
            .then(() => res.redirect("/employees"))
            .catch(err => res.send(err))
    }

    static editGet(req, res) {
        let id = +req.params.id

        Warehouse.findAll().then(data =>{
            return new Promise((resolve, reject) => {
                if(data){
                    Employee.findOne({include: [{model: Warehouse}], where: {id} })
                    .then((employee) => {
                        resolve({data, employee})
                })
                .catch(err => res.send(err))

                } else{
                    reject('Data tidak ditemukan')
                }
            })
        }).then(data =>{
            if (!req.query.error) {
                res.render("editEmployee", { employee : data.employee.dataValues, err: null, nav: 'employee', result: data.data})
            }
            else {
                res.render("editEmployee", { employee : data.employee.dataValues, err: req.query.error, nav: 'employee', result: data.data })
            }
            
            console.log(data.data)
        }).catch(err =>{
            console.log(err)
        })
    }

    static editPost(req, res) {
        const { firstName, lastName, position, gender, salary, WarehouseId } = req.body
        const employeeObj = { firstName, lastName, position, gender, salary, WarehouseId }
        let id = +req.params.id

        Employee.update(employeeObj, { where: { id } })
            .then(() => res.redirect("/employees"))
            .catch(err => res.send(err))
    }

    static delete(req, res) {
        let id = +req.params.id
        Employee.destroy({ where: { id } })
            .then(() => res.redirect("/employees"))
            .catch(err => res.send(err))
    }
}

module.exports = EmployeeController
