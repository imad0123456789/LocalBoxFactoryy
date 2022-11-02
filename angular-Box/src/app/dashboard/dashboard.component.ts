import { Component, OnInit } from '@angular/core';
import { Box } from '../box';
import {BoxService} from '../box.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  boxes: Box[]=[];

  constructor( private boxService: BoxService) { }

  ngOnInit(): void {
    this.getBoxes();
  }

  async getBoxes() {
    /*this.boxService.getBoxes()
      .subscribe(boxes => this.boxes.slice(1,5));*/
    this.boxes = await this.boxService.getBoxes(); 
    console.log(this.boxes);
  }

}
