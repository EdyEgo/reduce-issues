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

 
export default  function extractFitIcon({iconName}:{iconName:string}){
    const lazy = React.lazy
    const icons:{[key:string]:any} = {
        priorityUrgent:()=>{
           
           return <PriorityUrgent/>
        },
        priorityHigh:()=>{
           
           return <PriorityHigh/>
        },
        priorityMedium:()=>{
       
           return <PriorityMedium/>
        },
        priorityLow:()=>{
         
           return <PriorityLow/>
        },
        /// status

        backlog:()=>{
        
           
           return <BackLog/>
        },
        todo:()=>{
        
     
         return <Todo/>
        },
        inProgress:()=>{
         
       
         return <InProgress/>
        },
        done:()=>{
         
        
         return <Done/>
        },
        canceled:()=>{
        
      
         return <Canceled/>
        },

        // labels

        labelBug:()=>{
       
       
         return <LabelBug/>
        },
        labelFeature:()=>{
      
         
         return <LabelFeature/>
        },
        labelImprovement:()=>{
        
       
         return <Done/>
        },

    }
    if(iconName === '') return ''
    return icons[iconName]()
}