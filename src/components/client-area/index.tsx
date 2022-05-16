import {BrowserRouter as Router , Routes , Route} from 'react-router-dom'
import NavBar from './header/NavBar'
import SignUp from './auth/SignUp'

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

     </Routes>
        
    </Router>
    </> 
    
    );
}
 
export default ClientArea;