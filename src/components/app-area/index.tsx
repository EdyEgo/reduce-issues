import {BrowserRouter as Router , Routes} from 'react-router-dom'
import {signOut} from '../../api/dataBaseAuthMethods'

interface AppAreaProps {
    
}
 

async function signMeOut(){
 await signOut()
}

const AppArea: React.FC<AppAreaProps> = () => {
    return ( 
    <>
    app area
    <button onClick={signMeOut}>Sign Out</button>
    </> 
    
    );
}
 
export default AppArea;