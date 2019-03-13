import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { DataService } from 'src/app/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-article',
  templateUrl: './new-article.component.html',
  styleUrls: ['./new-article.component.css']
})
export class NewArticleComponent implements OnInit {

  articleForm: FormGroup;
  // tagField = new FormControl('');
  tagList = [];

  constructor(private data: DataService,
              private router: Router) { }

  ngOnInit() {
    this.articleForm = new FormGroup({
      'title': new FormControl('', [Validators.required, Validators.minLength(1)]),
      'description': new FormControl('', [Validators.required, Validators.minLength(1)]),
      'body': new FormControl('', [Validators.required]),
      'tagField': new FormControl('')
    });
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
    // console.log(this.articleForm.value);
    // tslint:disable-next-line:max-line-length
    this.data.createArticles(this.articleForm.value.title, this.articleForm.value.description, this.articleForm.value.body, this.tagList).subscribe(data => {
      this.router.navigateByUrl('/');
      return;
    });
   }
}
