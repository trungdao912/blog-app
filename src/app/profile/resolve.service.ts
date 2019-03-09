import { Injectable } from "@angular/core";
import { Resolve } from "@angular/router";

import { Observable } from "rxjs";
import { DataService } from "../data.service";

@Injectable({
  providedIn: "root"
})
export class ResolveService implements Resolve<any> {
  constructor(
    private data: DataService
    ) {}
  resolve(
    route: import("@angular/router").ActivatedRouteSnapshot,
    state: import("@angular/router").RouterStateSnapshot
  ):Observable<any> {
    //console.log(route.params['username']) 
    return this.data.getProfile(route.params['username'])
  }
}
