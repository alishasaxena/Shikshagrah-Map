import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import '../../assets/map/Map.json'
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  jsonData: any;
  InitialEducationalParameters: any;
  InitialProgramParameters: any;
  states: any;
  
  
  public selectedState = ""
  constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const key = params['key'];

      if (!key) {
        this.selectedState = ""
      }
    });

     this.http.get('../../assets/map/Map.json').subscribe(data => {
       this.jsonData = data;
       this.InitialEducationalParameters = this.jsonData.India.EducationalParameters;
       this.InitialProgramParameters = this.jsonData.India.ProgramParameters;
       this.states = this.jsonData.India.states;
      console.log(data, 'dataIndia');
  });


    // this.EducationalParameters = this.InitialEducationalParameters
  }

  setQueryParams(state: string) {
    // Get the current query parameters
    const currentParams = { ...this.route.snapshot.queryParams };

    // Update or add a new query parameter
    currentParams['key'] = state;

    // Use the navigate method to update the query parameters
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: currentParams,
      queryParamsHandling: 'merge', // Keep existing query parameters
    });
  }

  onStateHover(state: string) {
    // this.selectedState = state;
    this.updateEducationalAndProgramParams(state);
    console.log('statewhich', state)
  }

  updateEducationalAndProgramParams(state: string) {
    if (this.jsonData && this.jsonData.India.states[state]) {
      this.InitialEducationalParameters = this.jsonData.India.states[state].EducationalParameters;
      this.InitialProgramParameters = this.jsonData.India.states[state].ProgramParameters;
    }
  }

  onStateClickHandler(state: string) {

    this.selectedState = ""
    console.log('Data received from child:', state);

    setTimeout(() => {
      this.selectedState = state
      // Handle the data from the child component

      // this.setQueryParams(state)
    }, 1);
    // this.selectedState = state
    // // Handle the data from the child component

    this.setQueryParams(state)
  }


  onMouseOutHandler(event) {
    console.log("onMouseOutHandler")
  }

  onMouseInHandler(hoverVal: string) {

  }
}
