import { getUserFirebase} from '../composables/firebase/users/useGetUser'
import { getUsersFirebase} from '../composables/firebase/users/useGetUsers'


export const getUser = async ({ userId}:{userId:string})=>{
     return await getUserFirebase(userId) 
} 

export const getUsers = async ({ usersIds}:{usersIds:string[] | {[key:string]:any}})=>{

    try{
        const usersDoc =  await getUsersFirebase(usersIds) 
        return {data:usersDoc,error:false}
    }catch(e:any){
        return {error:true,message:e.message}
    }
   
}

