import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'reverse',
  pure: false
})
export class ReversePipe implements PipeTransform {

  transform(array, args: boolean, growername: boolean) {
    //console.log(args)

    if(args == false){
      if (array) {
        return array.reverse();
      }
    }else{
      return array
    }

    // if (growername) {
      

    //    array.sort((a,b) => {
    //     console.log(a.GrowerName.trim())
    //     console.log(a.GrowerName.replace(/\s/g,''))
    //     return 0 - (a.GrowerName.replace(/\s/g,'') > b.GrowerName.replace(/\s/g,'') ? -1 : 1)
    //   })

    //   return array.sort((a,b) => {
    //     console.log(a.GrowerName.replace(/\s/g,''));
    //     console.log(b.GrowerName.replace(/\s/g,''));
    //     (a.GrowerName.replace(/\s/g,'') - b.GrowerName.replace(/\s/g,''))
    //   })

    //   array.sort((a: any, b: any) => {
    //     console.log(a.GrowerName)
    //     if (a.GrowerName < b.GrowerName) {
    //       return 1;
    //     } else if (a.GrowerName > b.GrowerName) {
    //       return -1;
    //     } else {
    //       return 0;
    //     }
    //   })
    //   return array
    // } else {
    //   console.log(growername)
      
    //   if(growername == false){

    //     return array.sort((a,b) => 0 - (a.GrowerName.replace(/\s/g,'') > b.GrowerName.replace(/\s/g,'') ? 1 : -1))

    //     return array.sort((b,a) => {
    //       b.GrowerName - a.GrowerName
    //     })

    //     array.sort((a: any, b: any) => {
    //       console.log(a.GrowerName)
    //       if (a.GrowerName < b.GrowerName) {
    //         return -1;
    //       } else if (a.GrowerName > b.GrowerName) {
    //         return 1;
    //       } else {
    //         return 0;
    //       }
    //     })
    //     return array
    //   }
    // }

    //return array

  }
}
