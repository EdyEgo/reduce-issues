import * as React from 'react';

export default  function extractFitIcon({iconName}:{iconName:string}){
    const lazy = React.lazy
    const icons:{[key:string]:any} = {
        priorityUrgent:()=>{
           const PriorityUrgent = lazy(()=>import('@mui/icons-material/SignalCellularConnectedNoInternet4Bar'))
           return <PriorityUrgent/>
        },
        priorityHigh:()=>{
           const PriorityHigh = lazy(()=>import('@mui/icons-material/SignalCellular4BarSharp'))
           return <PriorityHigh/>
        },
        priorityMedium:()=>{
           const PriorityMedium = lazy(()=>import('@mui/icons-material/SignalCellular3BarSharp'))
           return <PriorityMedium/>
        },
        priorityLow:()=>{
           const PriorityLow = lazy(()=>import('@mui/icons-material/SignalCellular1BarSharp'))
           return <PriorityLow/>
        },
        /// status

        backlog:()=>{
        
           const BackLog = lazy(()=>import('@mui/icons-material/BlurOn')) // ok
           return <BackLog/>
        },
        todo:()=>{
        
         const Todo = lazy(()=>import('@mui/icons-material/CircleOutlined')) // ok
         return <Todo/>
        },
        inProgress:()=>{
         
         const InProgress = lazy(()=>import('@mui/icons-material/HourglassTopSharp')) // ok
         return <InProgress/>
        },
        done:()=>{
         
         const Done = lazy(()=>import('@mui/icons-material/CheckCircleRounded')) // ok
         return <Done/>
        },
        canceled:()=>{
        
         const Canceled = lazy(()=>import('@mui/icons-material/CancelRounded')) // ok
         return <Canceled/>
        },

        // labels

        labelBug:()=>{
       
         const LabelBug = lazy(()=>import('@mui/icons-material/BugReportRounded')) // ok
         return <LabelBug/>
        },
        labelFeature:()=>{
      
         const LabelFeature = lazy(()=>import('@mui/icons-material/OpenInBrowserRounded')) // ok
         return <LabelFeature/>
        },
        labelImprovement:()=>{
        
         const Done = lazy(()=>import('@mui/icons-material/DoneAllRounded')) 
         return <Done/>
        },

    }
    if(iconName === '') return ''
    return icons[iconName]()
}