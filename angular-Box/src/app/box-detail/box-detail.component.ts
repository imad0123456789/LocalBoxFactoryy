import { Component, OnInit, Input } from '@angular/core';
import {Box} from '../box'

import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {BoxService} from '../box.service';


@Component({
  selector: 'app-box-detail',
  templateUrl: './box-detail.component.html',
  styleUrls: ['./box-detail.component.scss']
})
export class BoxDetailComponent implements OnInit {

  box: Box | undefined;

  constructor(
    private route: ActivatedRoute,
    private boxservice: BoxService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getBox();
  }

  getBox(): void {
    const id =
        parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    this.boxservice.getBox(id)
      .subscribe(box => this.box = box);
  }

  goBack(): void{
    this.location.back();
  }

  save(): void {
    if (this.box) {
      this.boxservice.updateBox(this.box)
          .subscribe(() => this.goBack());
    }
  }

}
