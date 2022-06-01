import {createSlice } from '@reduxjs/toolkit'


interface fillterItem{
    about:{name:string,[key:string]:any},is:boolean,value:any
}

const initialState:{
   filtersListOrder:fillterItem[],
   
} = {
  
  filtersListOrder:[]
} 






export const filterIssuesSlice = createSlice({
    name:'filterIssues',
    initialState,
    reducers:{

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

export const { addToFilterList,removeItemAtUnkownedIndex, removeFilterListItem,modifyItemAtIndex} = filterIssuesSlice.actions

export default filterIssuesSlice.reducer