# Routing in Angular
#### Example router link usage -->

````
<a [routerLink]="['/servers', server.id]"
    [queryParams]="{allowEdit: server.id === 3 ? '1' : '0'}"
    fragment="loading"
    href="#"
    class="list-group-item"
    *ngFor="let server of servers">
    {{ server.name }}
</a>
````

--> routerLink is specifying a route

we need to import { Router } from '@angular/router'; to use navigation programmatically.

Navigating Programmatically -->
onLoadServer(id: number) {
    this.router.navigate(['/servers', id, 'edit']);
  }

  Using Relative Paths in Programmatic navigation -->

  we need to import router: ActivatedRoute from @angular/router

  this.router.navigate(['servers', id, 'edit'], {relativeTo : this.route});
  --> This route would append to the current path
  --> if we use / this would append to the root path.

  Passing parameters to the route -->
  { path: 'users/:id/:name', component: UserComponent }

Fetching Route Parameters -->
import { ActivatedRoute } from '@angular/router';
 constructor(private route: ActivateRoute) { }

 ngOnInit(){
     this.id = this.route.snapshot.params['id'];
 }

If we use snapshot to retrieve path params and if we relaod he component from the same page, latest values will npot be read. so we ned to subcribe to the observale for getting the values after geting the values from snapshot.

Fetching route parameters Reactively -->

ngOnInit() {
    this.user = {
      id: this.route.snapshot.params['id'],
      name: this.route.snapshot.params['name']
    };
    this.paramsSubscription = this.route.params
      .subscribe(
        (params: Params) => {
          this.user.id = params['id'];
          this.user.name = params['name'];
        }
      );
  }

we should also unsubscribe from the observable as these will reside in the memory.

ngOnDestroy() {
    this.paramsSubscription.unsubscribe();
  }

Passing query parameters and retrieving data -->

this.route.snapshot.queryParams
this.route.snapshot.fragment

to avoid issues with loading the data from the same component we should use subcription

this.route.queryParams
      .subscribe(
        (queryParams: Params) => {
          this.allowEdit = queryParams['allowEdit'] === '1' ? true : false;
        }
      );

//the param values returned will be as string we can convert them to numbers by appending + before the value.

Setting up child (nested) routes -->
{ path: 'users', component: UsersComponent, children: [
    { path: ':id/:name', component: UserComponent }] 
}

Configuring the handling of Query parameters -->

onEdit(){
    this.router.navigate(['edit], {relativeTo : this.route, queryParamsHandling : 'preserve'});
    }
    // to preserve query params in the subsequent calls.

Redirecting and wild Routes -->
{path: 'not-found', component: ErrorPageComponent},
{ path: '**', redirectTo: '/not-found'}

while using redirects, we should use the property pathMatch: 'full'

Route Guards & Protecting Routes with canActivate
*************************************************
auth-guard.service.ts

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService.isAuthenticated()
      .then(
        (authenticated: boolean) => {
          if (authenticated) {
            return true;
          } else {
            this.router.navigate(['/']);
          }
        }
      );
  }

cahActivateChild(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
              return this.canActivate(route, state);
    }

Protecting child routes with canActiveChild
*******************************************
{ path: 'servers',
    canActivateChild: [AuthGuard],
    component: ServersComponent,
    children: [
    { path: ':id', component: ServerComponent, resolve: {server: ServerResolver} },
    { path: ':id/edit', component: EditServerComponent}
  ] }



Controlling Navigation with canDeactivate 
*****************************************
Create an interface with a method declaration

import { Observable } from 'rxjs/Observable';
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

export interface CanComponentDeactivate {
  canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
}

export class CanDeactivateGuard implements CanDeactivate<CanComponentDeactivate> {
  canDeactivate(component: CanComponentDeactivate,
                currentRoute: ActivatedRouteSnapshot,
                currentState: RouterStateSnapshot,
                nextState?: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return component.canDeactivate();
  }
}

we need to implement this interface in the target component 
ex: canDeactivate method in EditServerComponent

canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.allowEdit) {
      return true;
    }
    if ((this.serverName !== this.server.name || this.serverStatus !== this.server.status) && !this.changesSaved) {
      return confirm('Do you want to discard the changes?');
    } else {
      return true;
    }
  }

{
    path: 'servers',
    // canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    component: ServersComponent,
    children: [
    { path: ':id', component: ServerComponent, resolve: {server: ServerResolver} },
    { path: ':id/edit', component: EditServerComponent, canDeactivate: [CanDeactivateGuard] }
  ] }


Passing static data to a route
*******************************
  { path: 'not-found', component: ErrorPageComponent, data: {message: 'Page not found!'} },
  { path: '**', redirectTo: '/not-found' }

this data can be accessed in the component by router.snapshot.data['message']

Retrieveing Dynamic data with the resolve Data
**********************************************
Load the data from backend befor ea route gets activated.

import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';

import { ServersService } from '../servers.service';

interface Server {
  id: number;
  name: string;
  status: string;
}

@Injectable()
export class ServerResolver implements Resolve<Server> {
  constructor(private serversService: ServersService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Server> | Promise<Server> | Server {
    return this.serversService.getServer(+route.params['id']);
  }
}


in server.component.ts

  ngOnInit() {
    this.route.data
      .subscribe(
        (data: Data) => {
          this.server = data['server'];
        }
      );
  }

Resolver provides the data to the target component from AppRoutingModule.

Using resolver we can resolve the data directly by keeping the logic to reteive the data in
a separate service, here in this case it is serverResoler.

{
    path: 'servers',
    canActivateChild: [AuthGuard],
    component: ServersComponent,
    children: [
    { path: ':id', component: ServerComponent, resolve: {server: ServerResolver} },
    { path: ':id/edit', component: EditServerComponent, canDeactivate: [CanDeactivateGuard] }
  ] }














