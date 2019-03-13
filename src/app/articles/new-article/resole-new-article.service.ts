import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { DataService } from 'src/app/data.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResoleNewArticleService implements Resolve<any> {

  constructor(
    private data: DataService
    ) {}
  resolve(
    route: import('@angular/router').ActivatedRouteSnapshot,
    state: import('@angular/router').RouterStateSnapshot
  ): Observable<any> {
    return this.data.getArticle(route.params['slug']);
  }
}
