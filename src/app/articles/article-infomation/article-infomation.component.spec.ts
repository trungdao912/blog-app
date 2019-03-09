import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleInfomationComponent } from './article-infomation.component';

describe('ArticleInfomationComponent', () => {
  let component: ArticleInfomationComponent;
  let fixture: ComponentFixture<ArticleInfomationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticleInfomationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleInfomationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
