const BASIC_URL = process.env.NODE_ENV === 'production' ?
    "https://office-app-mern.herokuapp.com/" :
    "http://localhost:8080/employees";

export const GetAllEmployees = async () => {
    return await fetch(BASIC_URL)
        .then(res => res.json())
        .catch((err) => { return err })
}