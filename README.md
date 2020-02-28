# Template Driven Angular Forms
Form can be accessed by th ehelp of @Viewchild

@Viewchild('f') signupForm : NgForm;

### Adding validation to check the user input

```
<form (ngSubmit)="onSubmit()" #f="ngForm">
        <div
          id="user-data"
          ngModelGroup="userData"
          #userData="ngModelGroup">
          <div class="form-group">
            <label for="username">Username</label>
            <input
              type="text"
              id="username"
              class="form-control"
              ngModel
              name="username"
              required
              #username="ngModel">   <!-- ngModel will be used to get the details of the current form tag using the template definition username-->
          </div>
          .
          .
          .
          .
          .
</form>
```

# Adding CSS to angular forms

```
input.ng-invalid.ng-touched{
    border: 1px solid red;
}
```

# outputting the validation error messages
```
<div class="form-group">
            <label for="email">Mail</label>
            <input
              type="email"
              id="email"
              class="form-control"
              ngModel
              name="email"
              required
              email
              #email="ngModel">
            <span class="help-block" *ngIf="!email.valid && email.touched">Please enter a valid email!</span>
          </div>
```

# set default values with the ngModel property binding [ngModel]

```
<select id="secret" class = "form-control" [ngModel]="defaultQuestion" name="secret">
<option value="pet">Your first pet? </option>
<option value="pet">Your first pet? </option>
</select>
```
# using ngModel with two way binding
```
        <div class="form-group">
          <textarea
            name="questionAnswer"
            rows="3"
            class="form-control"
            [(ngModel)]="answer"></textarea>
        </div>
        <p>Your reply: {{ answer }}</p>
```

# Grouping form controls

ngModelGroup should be used to group form control elements

```
 <div
          id="user-data"
          ngModelGroup="userData"
          #userData="ngModelGroup">
          <div class="form-group">
            <label for="username">Username</label>
            <input
              type="text"
              id="username"
              .
              .
              .
```


# Handling radio buttons

```
<div class="radio" *ngFor="let gender of genders">
          <label>
            <input
              type="radio"
              name="gender"
              ngModel
              [value]="gender"
              required>
            {{ gender }}
          </label>
        </div>
```

# we can set the default values for the form using setValue

```
  suggestUserName() {
    const suggestedName = 'Superuser';
    // this.signupForm.setValue({
    //   userData: {
    //     username: suggestedName,
    //     email: ''
    //   },
    //   secret: 'pet',
    //   questionAnswer: '',
    //   gender: 'male'
    // });
    this.signupForm.form.patchValue({
      userData: {
        username: suggestedName
      }
    });
  }
  ```

# Extracting data from Form and reset the form data

```
 onSubmit() {
    this.submitted = true;
    this.user.username = this.signupForm.value.userData.username;
    this.user.email = this.signupForm.value.userData.email;
    this.user.secretQuestion = this.signupForm.value.secret;
    this.user.answer = this.signupForm.value.questionAnswer;
    this.user.gender = this.signupForm.value.gender;

    this.signupForm.reset();
  }

  ```

  