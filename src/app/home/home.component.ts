import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
   map: any = {
    "totalDistricts": "750",
    "NAS": "49/100",
    "totalSchools": "14.89 Lakhs",
    "totalStudents": "26.52 Crores"
}
  constructor() { }

  ngOnInit(): void {
  }

}
