import * as React from 'react';
import PriorityUrgent from '@mui/icons-material/SignalCellularConnectedNoInternet4Bar'
import PriorityHigh from '@mui/icons-material/SignalCellular4BarSharp'
import PriorityMedium from  '@mui/icons-material/SignalCellular3BarSharp'
import PriorityLow from '@mui/icons-material/SignalCellular1BarSharp'
import BackLog from '@mui/icons-material/BlurOn'
import Todo from '@mui/icons-material/CircleOutlined'
import InProgress from '@mui/icons-material/HourglassTopSharp'
import Done from '@mui/icons-material/CheckCircleRounded'
import Canceled from '@mui/icons-material/CancelRounded'
import LabelBug from '@mui/icons-material/BugReportRounded'
import LabelFeature from '@mui/icons-material/OpenInBrowserRounded'

 
export default  function extractFitIcon({iconName,index}:{iconName:string,index:number}){
  
    const icons:{[key:string]:any} = {
        priorityUrgent:()=>{
           
           return <PriorityUrgent key={index + 17}/>
        },
        priorityHigh:()=>{
           
           return <PriorityHigh key={index + 17}/>
        },
        priorityMedium:()=>{
       
           return <PriorityMedium key={index + 17}/>
        },
        priorityLow:()=>{
         
           return <PriorityLow key={index + 17}/>
        },
        /// status

        backlog:()=>{
        
           
           return <BackLog key={index + 17}/>
        },
        todo:()=>{
        
     
         return <Todo key={index + 17}/>
        },
        inProgress:()=>{
         
       
         return <InProgress key={index + 17}/>
        },
        done:()=>{
         
        
         return <Done key={index + 17}/>
        },
        canceled:()=>{
        
      
         return <Canceled key={index + 17}/>
        },

        // labels

        labelBug:()=>{
       
       
         return <LabelBug key={index + 17}/>
        },
        labelFeature:()=>{
      
         
         return <LabelFeature key={index + 17}/>
        },
        labelImprovement:()=>{
        
       
         return <Done key={index + 17}/>
        },

    }
    if(iconName === '') return ''
    if(icons[iconName] == null) return ''
    return icons[iconName]()
}