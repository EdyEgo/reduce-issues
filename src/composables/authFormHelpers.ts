export const validateEmail = (email:string)=>{
    const validEmailFormat = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
   return  validEmailFormat.test(email)
  
  }

export const validatePasswordFormat  = (password:string)=>{
// (?=.*[a-z])(?=.*[A-Z]) // for upper and lower case letters // (?=.*[0-9]) // one numeric value
const validPasswordFormat = /^(?=.{8,})/
return validPasswordFormat.test(password)

}

export const timeoutErrorSet = (setErrorMessageCallback:(message:string)=>void,message:string,timeout?:number)=>{
    setErrorMessageCallback(message)
    setTimeout(()=>{
        setErrorMessageCallback('invisible')
    },timeout || 2000)
}