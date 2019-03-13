import { AuthGuard } from './auth/auth-guard.service';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { SigninComponent } from './auth/signin/signin.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignupComponent } from './auth/signup/signup.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { ResolveService } from './profile/resolve.service';
import { ArticleInfomationComponent } from './articles/article-infomation/article-infomation.component';
import { NewArticleComponent } from './articles/new-article/new-article.component';
import { SettingComponent } from './setting/setting.component';
import { ResolveArticleIdService } from './articles/resolve-article-id.service';
import { ResoleNewArticleService } from './articles/new-article/resole-new-article.service';
import { CanDeactivateGuardService } from './auth/can-deactivate-guard.service';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'signin', component: SigninComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'settings', component: SettingComponent, canActivate: [AuthGuard] },
  {path: 'editor', component: NewArticleComponent, canActivate: [AuthGuard], canDeactivate: [CanDeactivateGuardService], children: [
    {path: ':slug', component: NewArticleComponent ,
      resolve: {
        profile: ResoleNewArticleService
      }}
  ]},
  {
    path: ':username',
    component: ProfileComponent,
    resolve: {
      profile: ResolveService
    }
  },
  {
    path: 'article/:id',
    component: ArticleInfomationComponent,
    resolve: {
      profile: ResolveArticleIdService
    }
  },
  { path: '**', component: PagenotfoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
