import { Component, OnInit } from '@angular/core';
import { TagsApiService } from 'src/app/core/services/apis/tags-api.service';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.scss'],
})
export class TagComponent implements OnInit {
  public tagsList: any[];
  constructor(private readonly tagsApiService: TagsApiService) {
    this.tagsList = [];
  }

  ngOnInit() {
    this.tagsApiService.getTags().subscribe((data: any) => {
      console.log(data);
      this.tagsList = data.tags;
    });
  }
}
