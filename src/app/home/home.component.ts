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
  noData: boolean = false;
  districtReached: boolean = false;
  
  public selectedState = ""
  public selectedDistrict = ''
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
       this.states = this.jsonData.India.States;
      console.log(this.states, 'dataIndia');
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
    this.updateEducationalAndProgramParams(state);
    console.log('statewhich', state)
  }

  updateEducationalAndProgramParams(state: string) {
    const stateData = this.states.find((stateSelected: any) => stateSelected.StateName === state);
      console.log('stateData', stateData)
      if (stateData) {
        this.InitialEducationalParameters = stateData?.EducationalParameters;
        this.InitialProgramParameters = stateData?.ProgramParameters;
        this.noData = false;

      } else {
        this.InitialEducationalParameters = '';
        this.InitialProgramParameters = '';
        this.noData = true;
      }

    console.log('stateData', stateData);
}

 onDistrictHover(district: string) {
   this.updateEducationalAndProgramParamsCity(district)
    console.log('zyx', district) 
  }
 updateEducationalAndProgramParamsCity(district: string) {
   for (const state of this.states) {
    for (const districtData of state.Districts) {
      // console.log('districtData', districtData.DistrictName)
      if (districtData.DistrictName === district) {
        this.InitialEducationalParameters = districtData?.EducationalParameters;
        this.InitialProgramParameters = districtData?.ProgramParameters;
        this.noData = false;

        console.log('InitialEducationalParameters', this.InitialEducationalParameters);
        console.log('InitialProgramParameters', this.InitialProgramParameters)
      } else {
        this.InitialEducationalParameters = '';
        this.InitialProgramParameters = '';
        this.noData = true;
      }
    }
  }


    console.log('districtdata', district);
}


  onStateClickHandler(state: string) {
    this.selectedState = ""
    console.log('Data received from child:', state);
    setTimeout(() => {
      this.selectedState = state
      this.districtReached = true;
      this.InitialEducationalParameters = '';
      this.InitialProgramParameters = '';
    }, 1);
    this.setQueryParams(state)
  }

  onDistrictClickHandler(district: string) {
    this.selectedState = ""
    console.log('Data received from child:', district);

    setTimeout(() => {
      this.selectedDistrict = district
    }, 1);
     }


  onMouseOutHandler(event) {
    console.log("onMouseOutHandler")
  }

  onMouseInHandler(hoverVal: string) {

  }
}
