import {BrowserRouter as Router , Routes , Route} from 'react-router-dom'
import NavBar from './header/NavBar'
import SignUp from './auth/SignUp'
import SignIn from './auth/SignIn'

interface ClientAreaProps {
    
}
 
const ClientArea: React.FC<ClientAreaProps> = () => {
    return ( 
    <>
    <Router>
     <header className=''>
        <NavBar/>
     </header>

     <Routes>
         <Route path='/signup' element={<SignUp/>}/>
         <Route path='/login' element={<SignIn/>}/>

     </Routes>
        
    </Router>
    </> 
    
    );
}
 
export default ClientArea;