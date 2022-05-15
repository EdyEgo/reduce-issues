interface ClientAreaLayoutProps {
    children:any
}
 
const ClientAreaLayout:  React.FC<ClientAreaLayoutProps> = ({children}:any) => {
    return ( 
    <>
       <div className="nav-bar">

       </div>
       <main>{children}</main>
    </>
     );
}
 
export default ClientAreaLayout;