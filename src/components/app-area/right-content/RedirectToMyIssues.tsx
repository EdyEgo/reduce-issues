import {useNavigate} from 'react-router-dom'
import {useSelector} from 'react-redux'
import * as React from 'react'
import Skeleton from '@mui/material/Skeleton';

interface RedirectToMyIssuesProps {
    
}
 
const RedirectToMyIssues: React.FC<RedirectToMyIssuesProps> = () => {
   
    const navigate = useNavigate()
    const selectedWorkspace = useSelector((state:any)=>state.workspace.selectedWorkSpace)
    const selectedWorkspaceId =  useSelector((state:any)=>state.workspace.selectedWorkSpace.id)
    const filteredIssuesLink = `/${selectedWorkspace.workspaceURL}/filtered-issues`

    function createSkeletons(){
        const skeletons = []
              for(let i = 0; i<20;i++){
                skeletons.push(<Skeleton />) 
              }

              return skeletons
    }

    React.useEffect(()=>{
    let isSubscribed = true
     
    if(isSubscribed && selectedWorkspaceId !== ""){
       
        navigate(filteredIssuesLink)
    }

    return ()=>{
        isSubscribed = false
    }
    },[selectedWorkspaceId])
    
    
    

    return ( 
        <div className='m-4'>
          {  
             createSkeletons()
          }
        
        </div> );
}
 
export default RedirectToMyIssues;