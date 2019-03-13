import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TokenInterceptorService } from './TokenInterceptorService';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { GlobalFeedComponent } from './home/global-feed/global-feed.component';
import { YourFeedComponent } from './home/your-feed/your-feed.component';
import { HomeComponent } from './home/home.component';
import { TagComponent } from './home/tag/tag.component';
import { DebounceClickDirective } from './debounce-click.directive';
import { ProfileComponent } from './profile/profile.component';
import { ArticlesComponent } from './articles/articles/articles.component';
import { ArticleInfomationComponent } from './articles/article-infomation/article-infomation.component';
import { SettingComponent } from './setting/setting.component';
import { CommentComponent } from './articles/comment/comment.component';
import { NewArticleComponent } from './articles/new-article/new-article.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import {NgxPaginationModule} from 'ngx-pagination'; 
import { NgxLoadingModule } from 'ngx-loading';

@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    SignupComponent,
    HeaderComponent,
    FooterComponent,
    GlobalFeedComponent,
    YourFeedComponent,
    HomeComponent,
    TagComponent,
    DebounceClickDirective,
    ProfileComponent,
    ArticlesComponent,
    ArticleInfomationComponent,
    SettingComponent,
    CommentComponent,
    NewArticleComponent,
    PagenotfoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    NgxPaginationModule,
    NgxLoadingModule.forRoot({})
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
