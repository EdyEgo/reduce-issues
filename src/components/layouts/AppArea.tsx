interface AppAreaLayoutProps {
    children:any
}
 
const AppAreaLayout: React.FC<AppAreaLayoutProps> = ({children}) => {
    return ( 
    <>
     <div className="nav-bar">

     </div>
     <main>{children}</main>
    </> 
    
    );
}
 
export default AppAreaLayout;