import {Link} from 'react-router-dom'

interface ClientNavBarProps {
    
}
 
const ClientNavBar: React.FC<ClientNavBarProps> = () => {
    return ( 
    
    <>
     <nav className='flex justify-around my-2'>
        <Link to="/" className="logo-container flex justify-center items-center gap-1 ">
                <div className="logo-img-container">
                    <img src="./logosite.png" alt="site logo" className='w-9'/>
                </div>
                <div className="app-logo-text-container">Reduce Issues</div>
        </Link>
            <div className="link-container">

            </div>
            <div className="auth-container">
                <div className="auth-links-container flex items-center justify-center gap-4">
                    <div className="sign-in-link text-blue-900 hover:text-blue-600 transition-all ease">
                        
                        <Link to="login">Log In</Link>
                    </div> 

                    <Link to="/signup" className="sign-up-link bg-blue-800  text-white p-2 rounded-md border-transparent hover:bg-blue-600 transition-all ease">
                        
                        Sign Up
                    </Link>
                </div>
            </div>
     </nav>
    </>
    
    
    );
}
 
export default ClientNavBar;