# Observable and subject usage

### creation of Observable
Observable has three parts 

**next:** Required. The handler for each delivered value called zero or more times after execution starts.
**error:** Optional. The handler for error notification. The error halts the execution of the observable instance.
**complete:** Optional. The handler for an execution-complete notification. The delayed values can continue to be delivered to a next handler after execution is complete.

these three elements can be seen in the below code.

```
ngOnInit() {
    const customIntervalObservable = Observable.create(observer => {
      let count = 0;
      setInterval(() => {
        observer.next(count);
        if (count === 5) {
          observer.complete();
        }
        if (count > 3) {
          observer.error(new Error('Count is greater 3!'));
        }
        count++;
      }, 1000);
    });

/*Below code describes applying pipe on observable to modify 
the data and then subscribing to that data.*/

    this.firstObsSubscription = customIntervalObservable.pipe(filter(data => {
      return data > 0;
    }), map((data: number) => {
      return 'Round: ' + (data + 1);
    })).subscribe(data => {
      console.log(data);
    }, error => {
      console.log(error);
      alert(error.message);
    }, () => {
      console.log('Completed!');
    });
  }

```

### Use of subject

Instead of using event emitter we can replace it with subject

`user.service.ts`
```
@Injectable({providedIn: 'root'})
export class UserService {
   //defining a subject same as defining an event emitter
  //activatedEmitter = new EventEmitter<boolean>();
  activatedEmitter = new Subject<boolean>();
}
```

`user.component.ts`
```
onActivate() {
    //produci subject same as emitting an event
    //this.userService.activatedEmitter.emmit(true);
    this.userService.activatedEmitter.next(true);
  }

```
`app.component.ts`

```
ngOnInit() {
    //subscribing to an observable, though we have used subjet we still will have an observable.
    this.activatedSub = this.userService.activatedEmitter.subscribe(didActivate => {
      this.userActivated = didActivate;
    });
  }
```

**NOTE: we should only use subject for cross component communication where we manually pass the values from one component to another component, it can not be used when we have @Output for emitting events**