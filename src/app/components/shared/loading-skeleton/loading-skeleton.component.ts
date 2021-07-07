import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-loading-skeleton',
  templateUrl: './loading-skeleton.component.html',
  styleUrls: ['./loading-skeleton.component.scss'],
})
export class LoadingSkeletonComponent implements OnInit {

  @Input() width: any;
  @Input() height: any;

  public items: {}[] = [];

  constructor() { }

  ngOnInit() {
    if (this.width)
      this.configSkeleton();
    else
      this.configDefaultSkeleton();
  }

  private configSkeleton() {
    this.items.push({
      width: this.width,
      height: this.height
    });
  }

  private configDefaultSkeleton() {
    this.items.push({
      width: '60%',
      height: '13px'
    });

    this.items.push({
      width: '90%',
      height: '13px'
    });

    this.items.push({
      width: '78%',
      height: '13px'
    });

    this.items.push({
      width: '65%',
      height: '13px'
    });
  }
}
