interface IssueActivityListProps {
    activity:null | {
        actionType:string,creatorId:null | string
        type:string,registeredAt:any
        }[]
}
 
const IssueActivityList: React.FC<IssueActivityListProps> = ({activity}) => {

   const textActivity = {
     created:"created the issue",
     addedLabel:"added label",
     addedStatus:"added status",
     addedPriority:"added priority",
     changedStatus:"changed status",
     changedLabel:"changed label",
     changedPriority:"changed priority",
     titleUpdate:"updated the title of the issue",
     textUpdate:"updated the description of the issue",
     selfAssigned:"self-assigned the issue",
     assigned:"assgine the issue to",
     comment:""
   }


    return ( <div className="issue-activity-list">
                              {activity != null && activity.length >= 1  &&
                       <div className="activity-list">
                             { activity.map((activity:{
                               actionType:string,creatorId:null | string
                               type:string,registeredAt:any
                               })=>{
                              return <div></div>
                             })}

                             {
                    //   activity.map(()=>{
                    //     return <div></div>
                    //   })
                             }
                      </div>
                      }
    </div> );
}
 
export default IssueActivityList;