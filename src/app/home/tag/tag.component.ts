import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/data.service';
import { Tag } from 'src/app/models/tags.model';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.css']
})
export class TagComponent implements OnInit {
  taglist: Array<string>;

  constructor(private dataservice : DataService) { }

  ngOnInit() {
    this.dataservice.getTags().subscribe((params: Tag) => {
      this.taglist = params.tags;
    })
  }


}
