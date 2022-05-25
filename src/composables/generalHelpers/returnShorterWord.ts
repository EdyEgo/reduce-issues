export function returnShortVersionString(maxLettersNumber:number,word:string){
    return word.length > maxLettersNumber ? word.slice(0,maxLettersNumber) + '..' : word
 }
