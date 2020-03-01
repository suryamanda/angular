import { PipeTransform, Pipe } from "@angular/core";

@Pipe({
        name: 'shorten'
    })
export class ShortenPipe implements PipeTransform{
    transform(value: any, limit: number) {
        if(value.length > limit){
       return value.substr(0, limit)+ ' ...';
        }
        else{
            return value;
        }
    } 
}