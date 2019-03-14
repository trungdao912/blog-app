import { NgxLoadingModule, ngxLoadingAnimationTypes } from 'ngx-loading';
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
import { MarkdownPipe } from './articles/markdown.pipe';
import { UserIdleModule } from 'angular-user-idle';

@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    SignupComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    TagComponent,
    DebounceClickDirective,
    ProfileComponent,
    ArticlesComponent,
    ArticleInfomationComponent,
    SettingComponent,
    CommentComponent,
    NewArticleComponent,
    PagenotfoundComponent,
    MarkdownPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    UserIdleModule.forRoot({idle: 1000, timeout: 10000, ping: 1}),
    NgxLoadingModule.forRoot({animationType: ngxLoadingAnimationTypes.wanderingCubes,
      backdropBackgroundColour: 'rgba(0,0,0,0.1)', 
      backdropBorderRadius: '4px',
      primaryColour: '#ffffff', 
      secondaryColour: '#ffffff', 
      tertiaryColour: '#ffffff'})
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
