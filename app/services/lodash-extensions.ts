/**
 * Created by jhorak on 19.07.2017.
 */

class LodashExtension {
    filterStringArrayByStringArray(arrayToFilter: string[], arrayFilterBy: string[]): string[]{
        return arrayToFilter.filter((stringToCheck)=>{
            let shouldBeReturned:boolean = true;
            for(let i = 0; i < arrayFilterBy.length; i++){
                if(arrayFilterBy[i] === stringToCheck){
                    shouldBeReturned = false;
                    break;
                }
            }

          if(shouldBeReturned){
              return stringToCheck;
          } else {
              return;
          }
        })
    };
}


export const __ = new LodashExtension();


