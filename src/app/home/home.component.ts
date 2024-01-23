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
  stateName: string;
  districtName: string;

  selectState: string;

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
        this.stateName = stateData?.StateName;
        this.noData = false;
        this.selectState = state // alisha is storing state here
      } else {
        this.InitialEducationalParameters = '';
        this.InitialProgramParameters = '';
        this.noData = true;
      }

    console.log('stateData', stateData);
}

// district
 onDistrictHover(district: string) {
   this.updateEducationalAndProgramParamsCity(district)
    console.log('zyx', district) 
  }
  updateEducationalAndProgramParamsCity(district: string) {
    const selectedStateData = this.states.find((stateSelected: any) => stateSelected.StateName === this.selectState);
    const districtData = selectedStateData.Districts.find((districtSelected: any) => districtSelected.DistrictName === district)

    console.log('selectedStateData', districtData)
     if (districtData) {
          this.InitialEducationalParameters = districtData?.EducationalParameters;
          this.InitialProgramParameters = districtData?.ProgramParameters;
          this.noData = false;
     } else {
       this.InitialEducationalParameters = '';
       this.InitialProgramParameters = '';
       this.noData = true;
     }

  console.log('InitialEducationalParameters', this.InitialEducationalParameters);
  console.log('InitialProgramParameters', this.InitialProgramParameters)
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
      this.selectedDistrict = district;
      this.districtReached = true;
      this.InitialEducationalParameters = '';
      this.InitialProgramParameters = '';
      this.districtName = '';
    }, 1);
    // this.setQueryParams(state)
  }

  onMouseOutHandler(event) {
    console.log("onMouseOutHandler")
  }

  onMouseInHandler(hoverVal: string) {

  }
}
