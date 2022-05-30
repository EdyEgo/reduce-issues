interface AppAreaLayoutProps {
    children:any
}
 
const AppAreaLayout: React.FC<AppAreaLayoutProps> = ({children}) => {
    return ( 
    <>
     
     <main>{children}</main>
    </> 
    
    );
}
 
export default AppAreaLayout;