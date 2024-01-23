import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from "@angular/core";
import * as d3 from "d3";
import { ActivatedRoute, Params } from "@angular/router";
import * as topojson from "topojson";

declare var $: any;
@Component({
  selector: 'app-state-map',
  templateUrl: './state-map.component.html',
  styleUrls: ['./state-map.component.scss']
})
export class StateMapComponent implements OnInit {

  public name: string = "d3";

  @Input("state") result: string = "";
  @Output() notifyParent: EventEmitter<string> = new EventEmitter<string>();
  @Output() districtHover = new EventEmitter<string>();


  constructor(private route: ActivatedRoute) { }
  ngOnInit(): void {
    // var this.result: string;
    // this.route.params.subscribe((params: Params) => {
    //   console.log(params["id"], params["id"], params, "params");
    //   this.result = params["id"];
    // });
    console.log(this.result, "this.result");
    // let width = 400;
    // let height = 400;
    var svgContainer = $("#svg");
    var width = svgContainer.width();
    var height = svgContainer.height();
    var aspect = width / height;
    var container = svgContainer.parent();
    var targetWidth = container.width();
    let svg = d3.select("#svg");
    svg.attr("width", targetWidth);
    svg.attr("height", Math.round(targetWidth / aspect));
    let g = svg.append("g");
    console.log("outside json calling1");
    var file = "../assets/states-map/" + this.result + ".json";
    var districtHover = this.districtHover;
    console.log(file);
    d3.json(file).then(function (topology: any) {
      // <---- Renamed it from data to topology
      var topology1 = topojson.feature(topology, topology.objects.districts);
      let projection = d3.geoMercator().fitSize([width, height], topology1);
      let path = d3.geoPath().projection(projection);
      console.log("------>", topology);
      console.log(
        ...topojson.feature(topology, topology.objects.districts).features
      );
      g.selectAll("path")
        .data(topojson.feature(topology, topology.objects.districts).features)
        .join((enter): any => {
          var sel = enter
            .append("path")
            .attr("d", path)
            .attr("id", function (d: any, i): any {
              var id = d.properties.district.split(" ").join("");
              console.log(id);
              return id;
            })
            .attr("stroke-opacity", 1)
            .attr("fill", "#7f5539") //changes
            .attr("stroke", "#ffff")
            .attr("stroke-width", 0)
            .style("cursor", "pointer")
            .on("mouseenter", (d) => {
              console.log(d);
              console.log(d.srcElement.id)
              // var id = d.properties.district.split(" ").join("");
              var id = d.srcElement.id;
              console.log(id, 'abhishek');
              districtHover.emit(id); // change
              // d3.select();
              d3.select("#" + id)
                .attr("stroke-width", 2)
                .attr("stroke", "#ffff");
              d3.select("#" + id).attr("fill", "#000");
              console.log("#" + id, 'xyz');
              console.log('districtName', id)
            })
            .on("mouseleave", (d) => {
              console.log(d);
              var id = d.srcElement.id;
              d3.select("#" + id)
                .attr("stroke-width", 0)
                .attr("stroke", "#fffff");
              d3.select("#" + id).attr("fill", "#808080");
            })
            .on("touchstart", (d) => { })
            .on("click", (d, i) => {
              // var district = d.split(" ").join("");
              // this.notifyParent.emit(district)
              var city = d.srcElement.__data__.properties.district;
              console.log('city', city.split(" ").join(""));
              this.notifyParent.emit(city)
            });
          sel.append("title").text((d: any, i) => {
            return d.properties.district;
          });
        });
    });
  }



  // ngOnChanges(changes: SimpleChanges) {
  //   debugger
  //   if (changes.result) {
  //     // var this.result: string;
  //     // this.route.params.subscribe((params: Params) => {
  //     //   console.log(params["id"], params["id"], params, "params");
  //     //   this.result = params["id"];
  //     // });
  //     console.log(this.result, "this.result");
  //     // let width = 400;
  //     // let height = 400;
  //     var svgContainer = $("#svg");
  //     var width = svgContainer.width();
  //     var height = svgContainer.height();
  //     var aspect = width / height;
  //     var container = svgContainer.parent();
  //     var targetWidth = container.width();
  //     let svg = d3.select("#svg");
  //     svg.attr("width", targetWidth);
  //     svg.attr("height", Math.round(targetWidth / aspect));
  //     let g = svg.append("g");
  //     console.log("outside json calling1");
  //     var file = "../assets/states-map/" + this.result + ".json";
  //     console.log(file);
  //     d3.json(file).then(function (topology: any) {
  //       // <---- Renamed it from data to topology
  //       var topology1 = topojson.feature(topology, topology.objects.districts);
  //       let projection = d3.geoMercator().fitSize([width, height], topology1);
  //       let path = d3.geoPath().projection(projection);
  //       console.log("------>", topology);
  //       console.log(
  //         ...topojson.feature(topology, topology.objects.districts).features
  //       );
  //       g.selectAll("path")
  //         .data(topojson.feature(topology, topology.objects.districts).features)
  //         .join((enter): any => {
  //           var sel = enter
  //             .append("path")
  //             .attr("d", path)
  //             .attr("id", function (d: any, i): any {
  //               var id = d.properties.district.split(" ").join("");
  //               console.log(id);
  //               return id;
  //             })
  //             .attr("stroke-opacity", 1)
  //             .attr("fill", "#808080")
  //             .attr("stroke", "#ffff")
  //             .attr("stroke-width", 0)
  //             .style("cursor", "pointer")
  //             .on("mouseenter", (d) => {
  //               console.log(d);
  //               console.log(d.srcElement.id)
  //               // var id = d.properties.district.split(" ").join("");
  //               var id = d.srcElement.id;
  //               console.log(id);
  //               // d3.select();
  //               d3.select("#" + id)
  //                 .attr("stroke-width", 2)
  //                 .attr("stroke", "#ffff");
  //               d3.select("#" + id).attr("fill", "#000");
  //               console.log("#" + id);
  //             })
  //             .on("mouseleave", (d) => {
  //               console.log(d);
  //               var id = d.srcElement.id;
  //               d3.select("#" + id)
  //                 .attr("stroke-width", 0)
  //                 .attr("stroke", "#fffff");
  //               d3.select("#" + id).attr("fill", "#808080");
  //             })
  //             .on("touchstart", (d) => { })
  //             .on("click", (d, i) => {
  //               console.log(d);
  //             });
  //           sel.append("title").text((d: any, i) => {
  //             return d.properties.district;
  //           });
  //         });
  //     });
  //   }
  // }
}
