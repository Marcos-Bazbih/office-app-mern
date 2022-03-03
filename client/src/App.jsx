import './App.css'
import { GetAllEmployees } from './services/employees-service'

function App() {
  const GetEmployees = () => {
    GetAllEmployees()
      .then(res => console.log(res))
      .catch(err => console.log(err))
  }
  return (
    <div className="App">
      <button onClick={GetEmployees}>employees</button>
    </div>
  )
}

export default App
