import { TestBed } from '@angular/core/testing';

import { ResoleNewArticleService } from './resole-new-article.service';

describe('ResoleNewArticleService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ResoleNewArticleService = TestBed.get(ResoleNewArticleService);
    expect(service).toBeTruthy();
  });
});
