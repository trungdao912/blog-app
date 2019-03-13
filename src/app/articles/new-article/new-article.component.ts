import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { DataService } from 'src/app/data.service';
import { Router, ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { ArticleInfor } from 'src/app/models/aritcleInfor.model';

@Component({
  selector: 'app-new-article',
  templateUrl: './new-article.component.html',
  styleUrls: ['./new-article.component.css']
})
export class NewArticleComponent implements OnInit {

  articleForm: FormGroup;
  // tagField = new FormControl('');
  tagList = [];
  isSubmitted: boolean;
  // articleSlug: string;

  articleInfor: ArticleInfor;

  constructor(private data: DataService,
              private router: Router,
              private route: ActivatedRoute) {
                this.articleForm = new FormGroup({
                  'title': new FormControl('', [Validators.required, Validators.minLength(1)]),
                  'description': new FormControl('', [Validators.required, Validators.minLength(1)]),
                  'body': new FormControl('', [Validators.required]),
                  'tagField': new FormControl('')
                });
              }

  ngOnInit() {
    // console.log(this.articleForm.valid);
    // if (this.articleForm.valid) {
    //   this.articleForm.reset();
    // }
    this.isSubmitted = false;
    // console.log(this.route.firstChild);
    if (!this.route.firstChild) {
      this.articleForm.patchValue({
        'title': '',
        'description': '',
        'body': ''
      });
      this.tagList = [];
    }
    else {
      this.route.firstChild.data.pipe(map((val) => {
        return val.profile.article;
      }))
      .subscribe((data: ArticleInfor) => {
        this.articleInfor = data;
        this.articleForm.patchValue({
          'title': this.articleInfor.title,
          'description': this.articleInfor.description,
          'body': this.articleInfor.body
        });
        this.tagList = this.articleInfor.tagList;
      });
    }
  }

  addTag() {
    let tag = this.articleForm.get('tagField').value;
    // console.log(tag);
    if (!this.tagList.includes(tag)) {
      this.tagList.push(tag);
    }

    this.articleForm.get('tagField').reset();
    // console.log(this.tagList);
  }

  removeTag(tagName: string) {
    this.tagList = this.tagList.filter(tag => tag !== tagName);
  }

   onSubmit() {
    // console.log('NewForm');
    // console.log(this.articleForm);
    // tslint:disable-next-line:max-line-length
    if (this.articleForm.valid) {
      // tslint:disable-next-line:max-line-length
      this.data.createArticles(this.articleForm.value.title, this.articleForm.value.description, this.articleForm.value.body, this.tagList).subscribe(data => {
        this.router.navigateByUrl('/');
        return;
      });
    }
    this.isSubmitted = true;
   }
}
