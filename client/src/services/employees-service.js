export const GetAllEmployees = async () => {
    return await fetch("http://localhost:8080/employees")
        .then(res => res.json())
        .catch((err) => { return err })
} 