

   export function extractFirebaseErrorMsg(message:string){
     const firstIndexString = message.indexOf('/')
     const lastIndexString = message.indexOf(')')
     const extractErrorMessage = message.slice(firstIndexString + 1,lastIndexString)
     const splitMsgByLine = extractErrorMessage.split('-').join(' ')
     return splitMsgByLine
   }