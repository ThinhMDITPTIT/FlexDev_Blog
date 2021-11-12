import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { TagsApiService } from 'src/app/core/services/apis/tags-api.service';
import { TagsStateService } from 'src/app/core/services/states/tags-state.service';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.scss'],
})
export class TagComponent implements OnInit, OnDestroy {
  public tagsList: any[];
  public currentActiveTag: string;
  public currentActiveTag_subscription: Subscription;

  constructor(private readonly tagsStateService: TagsStateService) {
    this.tagsList = [];
    this.currentActiveTag = '';
    this.currentActiveTag_subscription = new Subscription();
  }

  ngOnInit() {
    this.tagsStateService.getAllTags().subscribe(
      (data: any) => {
        this.tagsList = data.tags;
      },
      () => {}
    );
    this.tagsStateService.currentTagEmit.subscribe(() => {
      this.currentActiveTag = '';
    });
    this.currentActiveTag_subscription =
      this.tagsStateService.articlesByTag$.subscribe(() => {
        this.currentActiveTag = this.tagsStateService.currentTag;
      });
  }

  ngOnDestroy() {
    this.currentActiveTag_subscription.unsubscribe();
  }

  public getArticlesByHastag(tag: string) {
    this.tagsStateService.getArticlesDataByTag(tag).subscribe(
      (data: any) => {
        this.tagsStateService.articlesByTag$.next(data);
      },
      () => {}
    );
  }
}
