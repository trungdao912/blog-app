import { Injectable } from "@angular/core";
import { Resolve } from "@angular/router";
import { DataService } from "../data.service";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class ResolveArticleIdService implements Resolve<any> {
  constructor(
    private data: DataService
    ) {}
  resolve(
    route: import("@angular/router").ActivatedRouteSnapshot,
    state: import("@angular/router").RouterStateSnapshot
  ):Observable<any> {
    
    return this.data.getArticle(route.params['id'])
  }
}
