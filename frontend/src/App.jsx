import AuthPage from "./components/AuthPage"
import Dashboard from "./components/HomePage"
import Landing from "./components/LandingPage"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import PatientDashboard from "./components/PatientHome"

function App() {
  return (
    <div className="app_main">
      <BrowserRouter>
        <Routes>
          <Route exact path='/' element = {<Landing/>} />
          <Route exact path='/auth' element = {<AuthPage/>} />
          <Route exact path='/db' element = {<><Dashboard/><PatientDashboard/></>} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
