const employees = require("../models/employee-model");

const GetEmployees = async (request, response) => {
    await employees.find()
        .then(res => response.send(res))
        .catch(err => response.status(404).send({ message: err }))
};

const GetEmployeeById = async (request, response) => {
    await employees.findById(request.params.id)
        .then(res => response.send(res))
        .catch(err => response.status(404).send({ message: err }))
};

const AddEmployee = async (request, response) => {
    await employees.create(request.body)
        .then(() => { response.send("employee added") })
        .catch(() => { response.status(404).send({ message: err }) })
};

const UpdateEmployee = async (request, response) => {
    await employees.findByIdAndUpdate(request.params.id, request.body)
        .then(() => response.send("employee updated"))
        .catch(() => { response.status(404).send({ message: err }) })
};

const DeleteEmployee = async (request, response) => {
    await employees.findByIdAndRemove(request.params.id)
        .then(() => { response.send("employee deleted") })
        .catch(() => { response.status(404).send({ message: err }) })
};

module.exports = { GetEmployees, GetEmployeeById, AddEmployee, UpdateEmployee, DeleteEmployee };