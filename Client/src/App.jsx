import './App.css'
import SigninForm from './Form/SigninForm'
import SignupForm from './Form/SignupForm '
import EcommerceHomePage from './Home/EcommerceHomePage '
import {Routes,Route} from 'react-router-dom'

function App() {
 
  return (
    <>
<Routes>
  <Route path="/" element={<EcommerceHomePage/>}/>
  <Route path="/signup" element={<SignupForm/>}/>
  <Route path="/signin" element={<SigninForm/>}/>
</Routes>       
    </>
  )
}

export default App
