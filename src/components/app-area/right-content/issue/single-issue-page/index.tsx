import {useSelector} from 'react-redux'
import {useParams} from 'react-router-dom'

interface SingleIssuePageProps {
    
}
 
const SingleIssuePage: React.FC<SingleIssuePageProps> = () => {
   
    
    const teamIssuesList = useSelector((state:any)=>state.issues.teamsIssues)
    
    const params = useParams()
    const teamList = useSelector((state:any)=>state.team.teamList)
    const issueIdentified = params.issueIdentified
    const issueObject = findIssueInTeamsIssues()// .teamId for finding the team// .identified for issue
    const teamObject = findTeamById()

    console.log('iiiioooo','params ',teamObject,'baaaaaa',issueObject)
    // load activity  
 
    function findIssueInTeamsIssues(){
        //identified 
        let issueObject = null

        loopTeam:for(const teamId in teamIssuesList){
            const teamIssuesValue = teamIssuesList[teamId]
            if(teamIssuesValue.length <= 0) continue
                for(let issueIndex = 0;issueIndex < teamIssuesValue.length;issueIndex++){
                    const issueValueObject = teamIssuesValue[issueIndex]
                    if(issueValueObject?.identified && issueValueObject.identified.toLowerCase() === issueIdentified?.toLowerCase()){
                        issueObject = issueValueObject
                        break loopTeam
                    }
                }

        }

        return issueObject
    }

    function findTeamById(){
        for(const teamValue of teamList){
          
            if(teamValue.id === issueObject.teamId){
                   
                return teamValue
            }
        }
    }

    // and sub issue


    return  ( 
        <div className="single-issue-container">

        </div> 
      );
}
 
export default SingleIssuePage;