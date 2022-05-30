import { Routes, Route } from "react-router-dom";
import {useSelector , useDispatch} from 'react-redux'
import {addIssuesToOneTeam,addSubscription,removeSubscriptions} from '../../../store/issues'
import {getTeamIssues} from '../../../api/dataBaseIssuesMethods'
import {useState,useEffect} from 'react'


interface RightSideContentProps {}

const RightSideContent: React.FC<RightSideContentProps> = () => {
  
const [issues,setIssues] = useState<any>(null) // null | {data:any,error:boolean} | {error:boolean , message:string}
const [errorMessage,setErrorMessage] = useState<null | string>(null)

const dispatch = useDispatch()

const selectedWorkspace = useSelector((state:any)=>state.workspace.selectedWorkSpace)
const teamsList = useSelector((state:any)=>state.team.teamList)
const teamIssues = useSelector((state:any)=>state.issues.teamsIssues)



function writeIssuesToOneTeam(teamId:string,data:any,unsub:any){
 // add team subscription
  dispatch(addSubscription(unsub))

  // add team issues
  dispatch(addIssuesToOneTeam({id:teamId,data}))
}

function callbackIssuesSnapShot({error,data,message,teamId,unsub}:any){
 

  if(error) return 
  setErrorMessage(`Could not get your issues , reason:,${message}`)
  writeIssuesToOneTeam(teamId,data,unsub)

}

function getTeamsIssues(){
  if(selectedWorkspace.id == null || teamsList.length <= 0) return 
   
  teamsList.forEach((teamObject:{id:string})=>{
   
    getTeamIssues({teamId:teamObject.id,workspaceId:selectedWorkspace.id,callbackDocuments:callbackIssuesSnapShot,valuesToIncludeInResult:{teamId:teamObject.id}})
  })


}

useEffect(()=>{
  let isSubscribed = true
  
  // remember to unsub boy
  // and on sign out to unsub

 if(isSubscribed){

   // unsubscribe(if you have subscriptions)
   dispatch(removeSubscriptions())

   // get issues for all of user(workspace) teams
  getTeamsIssues()
 }
  

  return () => {
    isSubscribed = false;
  };
},[selectedWorkspace,teamsList])


  return (
    <>
      <Routes>
        <Route
          path="/"
          element={<div className="placeholder">content right</div>}
        />

        {/* <Route path="">

        </Route> */}
      </Routes>
    </>
  );
};

export default RightSideContent;
