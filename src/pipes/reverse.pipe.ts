import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'reverse',
  pure: false
})
export class ReversePipe implements PipeTransform {

  transform(array, args: boolean, growername: boolean) {
    
   if(args == false){
      if (array) {
        return array.reverse();
      }
    }else{
      return array
    }
  }
}
