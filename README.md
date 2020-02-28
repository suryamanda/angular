# Angular forms with reactive programming approach
Form gets created programmatically and synchronized with DOM

## Configuration
`ReactiveFromsModule` should be added in imports section of app.module.ts

```

export class AppComponent implements OnInit {
  genders = ['male', 'female'];
  signupForm: FormGroup;
  forbiddenUsernames = ['Chris', 'Anna'];

  constructor() {}

  ngOnInit() {
    this.signupForm = new FormGroup({
      'userData': new FormGroup({
        'username': new FormControl(null, [Validators.required, this.forbiddenNames.bind(this)]),
        'email': new FormControl(null, [Validators.required, Validators.email], this.forbiddenEmails)
      }),
      'gender': new FormControl('male'),
      'hobbies': new FormArray([])
    });
  .
  .
  .

```
## Syncing HTML and form
formGroupName --> for grouping more than an html form element as a single object programmatically.
formControlName --> to map the form element with the backend form element

*while submitting the form we dont need template as we have already linked the form elements
using formGroup in app.component.ts file*

```
<form [formGroup]="signupForm" (ngSubmit)="onSubmit()">
        <div formGroupName="userData">
          <div class="form-group">
            <label for="username">Username</label>
            <input
              type="text"
              id="username"
              formControlName="username"
              class="form-control">
            <span
              *ngIf="!signupForm.get('userData.username').valid && signupForm.get('userData.username').touched"
              class="help-block">
              <span *ngIf="signupForm.get('userData.username').errors['nameIsForbidden']">This name is invalid!</span>
              <span *ngIf="signupForm.get('userData.username').errors['required']">This field is required!</span>

            </span>
          </div>
          .
          .
          .
          .
```

## Adding validation to form elements
Just like template approach having required in the html form will not work, we need to define the validation programmatically

```
 ngOnInit() {
    this.signupForm = new FormGroup({
      'userData': new FormGroup({
        'username': new FormControl(null, [Validators.required, this.forbiddenNames.bind(this)]),
        'email': new FormControl(null, [Validators.required, Validators.email], this.forbiddenEmails)
      }),
      'gender': new FormControl('male'),
      'hobbies': new FormArray([])
    });
    .
    .
    .
```

## CSS styling

```
input.ng-invalid.ng-touched{
    border: 1px solid red;
}
```

## Grouping form controls (form elements)
```
<div formGroupName="userData">
          <div class="form-group">
            <label for="username">Username</label>
            <input
              type="text"
              id="username"
              formControlName="username"
              class="form-control">
            <span
              *ngIf="!signupForm.get('userData.username').valid && signupForm.get('userData.username').touched"
              class="help-block">
              <span *ngIf="signupForm.get('userData.username').errors['nameIsForbidden']">This name is invalid!</span>
              <span *ngIf="signupForm.get('userData.username').errors['required']">This field is required!</span>

            </span>
          </div>
          <div class="form-group">
            <label for="email">email</label>
            <input
              type="text"
              id="email"
              formControlName="email"
              class="form-control">
            <span
              *ngIf="!signupForm.get('userData.email').valid && signupForm.get('userData.email').touched"
              class="help-block">Please enter a valid email!</span>
          </div>
        </div>

```

backend component should have the below code to define the groups

```
 ngOnInit() {
    this.signupForm = new FormGroup({
      'userData': new FormGroup({
        'username': new FormControl(null, [Validators.required, this.forbiddenNames.bind(this)]),
        'email': new FormControl(null, [Validators.required, Validators.email], this.forbiddenEmails)
      }),
      'gender': new FormControl('male'),
      'hobbies': new FormArray([])
    });

```

## Arrays of Form Controls (FormArray)

```
hobbies : new FormArray([])  --> it should be part of the formGroup
 
 onAddHobby() {
    const control = new FormControl(null, Validators.required);
    (<FormArray>this.signupForm.get('hobbies')).push(control);
  }

```

```
<div formArrayName="hobbies">
          <h4>Your Hobbies</h4>
          <button
            class="btn btn-default"
            type="button"
            (click)="onAddHobby()">Add Hobby</button>
          <div
            class="form-group"
            *ngFor="let hobbyControl of signupForm.get('hobbies').controls; let i = index">
            <input type="text" class="form-control" [formControlName]="i">
          </div>
        </div>
        
```

## Creating custom validators

```
forbiddenUsernames = ['Chris','Anna'];

forbiddenNames(control: FormControl): {[s: string]: boolean} {
    if (this.forbiddenUsernames.indexOf(control.value) !== -1) {
      return {'nameIsForbidden': true};
    }
    return null;
  }
```

## Using erro codes

```
 <span
              *ngIf="!signupForm.get('userData.username').valid && signupForm.get('userData.username').touched"
              class="help-block">
              <span *ngIf="signupForm.get('userData.username').errors['nameIsForbidden']">This name is invalid!</span>
              <span *ngIf="signupForm.get('userData.username').errors['required']">This field is required!</span>

            </span>

```

## Status and Value changes

```
onNgInit(){
    this.signupForm.valueChanges.subscribe(
        (value) => console.log(value);
    );

    this.signupForm.statusChanges.subscribe(
        (statuc) => console.log(status);
    );
}

```


## Setting and Patching values

this.signupForm.setValue(
    {
        --- form data ---
    }
);

this.signupForm.patchValue(
    {
        --- form data ---
    }
);