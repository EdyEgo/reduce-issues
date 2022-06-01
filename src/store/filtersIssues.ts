import {createSlice } from '@reduxjs/toolkit'


interface fillterItem{
    about:{name:string,[key:string]:any},is:boolean,value:any
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
   filtersListOrder:fillterItem[],
   viewFilters:{
       default:defaultViewFilters,
       custom:customViewFilters | customViewFiltersEmpty
       },
      
   }
   
 = {
  
  filtersListOrder:[],
    viewFilters:{
        default:{groupingBy:'status',orderingBy:'status'
        ,displayProperties:{assignee:true,
            dueDate:true,id:true,labels:true,
            priority:true,registeredAt:true,
            status:true,updatedAt:true}
    },custom:{empty:true}
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
            const item:fillterItem = payload
            state.filtersListOrder.push(item)
        },
        removeItemAtUnkownedIndex(state,{payload}){
            const removeItemAtIndex = state.filtersListOrder.indexOf(payload)
            state.filtersListOrder.splice(removeItemAtIndex,1)

        },
        removeFilterListItem(state,{payload}){
            const removeItemAtIndex = payload
            state.filtersListOrder.splice(removeItemAtIndex,1)
        },
        modifyItemAtIndex(state,{payload}){
            const index = payload.index
            const keyObject = payload.keyObject
            const newValueForKeyObject = payload.newValueForKeyObject
            const copyOldObject = state.filtersListOrder[index]
            const newObject = {...copyOldObject,[keyObject]:newValueForKeyObject}

            state.filtersListOrder.splice(index,1,newObject)
        }

       
      
      
    },

})

export const { addCustomViewGrupingBy,addCustomViewOrderingBy,addCustomViewDisplayPropertie, addToFilterList,removeItemAtUnkownedIndex, removeFilterListItem,modifyItemAtIndex} = filterIssuesSlice.actions

export default filterIssuesSlice.reducer