import {createSlice } from '@reduxjs/toolkit'


// interface fillterItem{
//     about:{name:string,[key:string]:any},is:boolean,value:any
// }

interface fillterItem{
    is:boolean,value:any
  }

interface filteredUser{
    userId:string,is:boolean ,value:any
}  

interface filtersListOrder{
    status:fillterItem[],
    priority:fillterItem[],
    labels:fillterItem[],
    creator:filteredUser[],
    dueDate:any[],
    assignee:filteredUser[]
}



interface defaultViewFilters{
    groupingBy:string | undefined,
    orderingBy:string,
    displayProperties:{
        status:boolean,
        priority:boolean,
        id:boolean,
        labels:boolean,
        dueDate:boolean,
        registeredAt:boolean,
        updatedAt:boolean,
        assignee:boolean 
    }

}

interface customViewFilters extends defaultViewFilters{
    empty:boolean
}

interface customViewFiltersEmpty {
    empty:boolean // maybe just write false here
}

const initialState:{
   filtersListOrder:filtersListOrder,
   viewFilters:{
       default:defaultViewFilters,
       custom:customViewFilters | customViewFiltersEmpty
       },
      
   }
   
 = {
  
  filtersListOrder:{
      status:[],
      priority:[],
      labels:[],
      creator:[],
      dueDate:[],
      assignee:[]

  },
    viewFilters:{
        default:{groupingBy:'status',orderingBy:'status'
        ,displayProperties:{assignee:true,
            dueDate:true,id:true,labels:true,
            priority:true,registeredAt:true,
            status:true,updatedAt:true}
    },custom:{empty:true}// custom is empty false and a copy of the default if the user has selected something,
    // this method with custom is kin of stupid :( not gonna lie
  }
} 






export const filterIssuesSlice = createSlice({
    name:'filterIssues',
    initialState,
    reducers:{

        addCustomViewGrupingBy(state,{payload}){
            
        state.viewFilters.custom = {...state.viewFilters.default,empty:false,groupingBy:payload}
        },
        addCustomViewOrderingBy(state,{payload}){
            
            state.viewFilters.custom = {...state.viewFilters.default,empty:false,orderingBy:payload}
        },

        addCustomViewDisplayPropertie(state,{payload}){
            const propertyName: "status" |
            "priority" |
            "id" |
            "labels" |
            "dueDate" |
            "registeredAt" |
            "updatedAt" |
            "assignee"  = payload
            const modifiedObject = {...state.viewFilters.default,empty:false,
                
            }
            modifiedObject.displayProperties[propertyName] =  !modifiedObject.displayProperties[propertyName]
            state.viewFilters.custom = modifiedObject
        },
 


        ///
        addToFilterList(state,{payload}){
            const item:any = payload.item
            const type: "status" |
            "priority" |
            "labels" |
            "creator" |
            "dueDate" |
            "assignee"  = payload.type

            state.filtersListOrder[type].push({...item,value:{...item.value,checked:true}})
        },
        removeItemAtUnkownedIndex(state,{payload}){ 
            const item:any = payload.item
            const type: "status" |
            "priority" |
            "labels" |
            "creator" |
            "dueDate" |
            "assignee"  = payload.type

            const removeItemAtIndex = state.filtersListOrder[type].indexOf(item)
         
            state.filtersListOrder[type].splice(removeItemAtIndex,1)

       
        },
        removeFilterListItem(state,{payload}){ 
            const item:any = payload.item
            const type: "status" |
            "priority" |
            "labels" |
            "creator" |
            "dueDate" |
            "assignee"  = payload.type


            const removeItemAtIndex = item
            state.filtersListOrder[type].splice(removeItemAtIndex,1)
        },
        modifyItemAtIndex(state,{payload}){ 
            const item:any = payload.item
            const itemIndex = item.itemIndex
            const type: "status" |
            "priority" |
            "labels" |
            "creator" |
            "dueDate" |
            "assignee"  = payload.type


            const index = itemIndex
            const keyObject = item.keyObject
            const newValueForKeyObject = item.newValueForKeyObject
            const copyOldObject = state.filtersListOrder[type][index]
            const newObject = {...copyOldObject,[keyObject]:newValueForKeyObject}

            state.filtersListOrder[type].splice(index,1,newObject)
        }

       
      
      
    },

})

export const { addCustomViewGrupingBy,addCustomViewOrderingBy,addCustomViewDisplayPropertie, addToFilterList,removeItemAtUnkownedIndex, removeFilterListItem,modifyItemAtIndex} = filterIssuesSlice.actions

export default filterIssuesSlice.reducer