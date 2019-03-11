import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-new-article',
  templateUrl: './new-article.component.html',
  styleUrls: ['./new-article.component.css']
})
export class NewArticleComponent implements OnInit {

  articleForm: FormGroup;

  constructor(private data: DataService) { }

  ngOnInit() {
    this.articleForm = new FormGroup({
      'title': new FormControl(null, [Validators.required]),
      'description': new FormControl(null, [Validators.required]),
      'body': new FormControl(null, [Validators.required]),
      'tagList': new FormControl(null)
    });
  }
   onSubmit() {
    // console.log('NewForm');
    // console.log(this.articleForm.value);
    this.data.createArticles(this.articleForm.value.title, this.articleForm.value.description, this.articleForm.value.body, this.articleForm.value.tagList).subscribe(data => {
      return;
    });
   }
}
