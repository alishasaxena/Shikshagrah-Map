import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from "@angular/common/http";
@Component({
  selector: 'app-india-map',
  templateUrl: './india-map.component.html',
  styleUrls: ['./india-map.component.scss']
})
export class IndiaMapComponent implements OnInit {
  @Output() stateHover = new EventEmitter<string>();
  title = "map1";
  tooltip: string;

  @Input() jsonData: any

  // onStateHover(state: string) {
  //   this.stateHover.emit(state);
  //   // console.log('state', state)
  // }

  @Output() notifyParent: EventEmitter<string> = new EventEmitter<string>();

  @Output() mouseIn: EventEmitter<string> = new EventEmitter<string>();

  @Output() mouseOut: EventEmitter<string> = new EventEmitter<string>();


  constructor(private http: HttpClient, private router: Router) { }
  ngOnInit(): void {
    console.log('jsonData', this.jsonData)
  }

  onClick(value: any) {
    console.log(value);
    var state = value.split(" ").join("");
    // this.router.navigate(["state", state]);
    this.notifyParent.emit(state)
  }

  over_state(value: any) {
    this.mouseIn.emit(value)
    this.stateHover.emit(value);
    this.tooltip = value;
    console.log(value, 'state:console');
  }

  out_state(value: any) {
    this.mouseOut.emit()
    this.tooltip = "";
    console.log(value);
  }

}
