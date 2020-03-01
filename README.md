# Pipes in Angular

`https://angular.io/api?query=pipe`

## Creating a custom pipe

custom pipe should be added in the app.module.ts as components

```
@Pipe({
        name: 'shorten'
    })
export class ShortenPipe implements PipeTransform{
    transform(value: any) {
       return value.substr(0, 10)+ ' ...';
    } 
}
```

## Parametarizing a pipe

```
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

<strong>{{ server.name | shorten:3 }}</strong>

```
## Creating a filter pipe

```
@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(value: any, filterString: string, propName: string): any {
    if(value.length === 0){
      return value;
    }
    const resultArray = [];
    for (const item of value){
      if(item[propName] === filterString){
        resultArray.push(item);
      }
    }
    return resultArray;
  }
}
```

`we can apply this filter pipe with ngFor as ngFor also a representation`

```
<div class="col-xs-12 col-sm-10 col-md-8 col-sm-offset-1 col-md-offset-2">
      <input type="text" [(ngModel)]="filteredStatus">
      <hr>
      <ul class="list-group">
        <li
          class="list-group-item"
          *ngFor="let server of servers | filter:filteredStatus:'status'"
          [ngClass]="getStatusClasses(server)">
          <span
            class="badge">
            {{ server.status }}
          </span>
          <strong>{{ server.name | shorten:3 }}</strong> |
          {{ server.instanceType | uppercase }} |
          {{ server.started | date: 'fullDate'}}
          <!-- date is a pipe and fullDate is a parameter-->
        </li>
      </ul>
    </div>

```

## Using async pipe

If the data is coming from async calls, before the date being resolved object will be printed, 
and the resolved value will never be printed so we should use async pipe to resolve the value.

``` 
<h2>App Status : {{appStatus | async}}</h2>
```

```
appStatus = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('stable');
    }, 2000)
  });
```
