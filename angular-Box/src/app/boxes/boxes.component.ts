import { Component, OnInit } from '@angular/core';
import { Box } from '../box';
import {BoxService} from '../box.service';


@Component({
  selector: 'app-boxes',
  templateUrl: './boxes.component.html',
  styleUrls: ['./boxes.component.css']
})
export class BoxesComponent implements OnInit {

  boxes : Box[] = [];
  constructor(private boxService:BoxService ) { }

  ngOnInit(): void {
    this.getBoxes();
  }

  async getBoxes(){
    this.boxes = await this.boxService.getBoxes();
   /* this.boxService.getBoxes()
      .subscribe(boxes=> 
        this.boxes = boxes);*/
  }
  
  add(name: string): void {
    name = name.trim();
    if (!name) {
      return;
    }
    this.boxService.addBox({name} as Box)
        .subscribe(box => {
          this.boxes.push(box)
        });
  }
  
  delete(box : Box): void {
    this.boxes = this.boxes.filter(b => b !== box);
    this.boxService.deleteBox(box.id).subscribe();
  }
}
