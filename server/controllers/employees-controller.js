const employees = require("../models/employee-model");

module.exports = {
    GetEmployees: async (req, res) => {
        try {
            const data = await employees.find();
            if (data.length >= 1) return res.status(200).json(data);
            res.status(404).json({ message: "no employees found" });
        }
        catch (err) {
            res.status(500).json({ message: err });
        };
    },
    GetEmployeeById: async (req, res) => {
        try {
            const employee = await employees.findById({ _id: req.params.id });
            if (employee) return res.status(200).json(employee);
            res.status(404).json({ message: "no employee found" });
        }
        catch (err) {
            res.status(500).json({ message: err.message });
        };
    },
    AddEmployee: async (req, res) => {
        try {
            const { firstName, lastName, age, email } = req.body;
            if (await employees.exists({ email })) return res.status(400).json({ message: "employee with this email exists" });
            const employee = new employees({ firstName, lastName, age, email });
            await employees.create(employee)
                .then(() => { res.status(200).json("employee added") })
                .catch((err) => { res.status(400).json({ message: err.message }) })
        }
        catch (err) {
            res.status(500).json({ message: err.message });
        };
    },
    UpdateEmployee: async (req, res) => {
        try {
            await employees.findByIdAndUpdate(req.params.id, req.body)
                .then(() => res.status(200).json("employee updated successfully"))
                .catch((err) => { res.status(404).json({ message: err.message }) })
        }
        catch (err) {
            res.status(500).json({ message: err.message });
        }
    },
    DeleteEmployee: async (req, res) => {
        if (await employees.exists({ _id: req.params.id })) {
            await employees.findByIdAndRemove(req.params.id)
                .then(() => res.status(200).json({ message: "employee deleted" }))
                .catch((err) => { res.status(500).json({ message: err.message }) })
        }
        res.status(404).json({ message: "no employee found" })
    }
};