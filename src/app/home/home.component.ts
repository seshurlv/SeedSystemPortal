import { Component, OnInit } from '@angular/core';
import { LocationStrategy, PlatformLocation, Location } from '@angular/common';
import { LegendItem, ChartType } from '../lbd/lbd-chart/lbd-chart.component';
import * as Chartist from 'chartist';
import { AuthService } from '../../services/auth-service.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  adminpieChartData
  adminBarChartData
  adminBarChartDataForDistrict

  tlpieChartData
  tlBarChartData
  tlDonutChartData

  psiBarChartDataForDistrict
  psiPieChartDataForDistrict

  growerPieChartDataForDistrict
  growerpieChartData

  Role
  filterdStats = []

  constructor(private authService: AuthService) { }

  ngOnInit() {

    this.Role = JSON.parse(window.localStorage.getItem('Role'));
   
    
    if (this.Role == 2) {
      let userId = 0
      this.authService.GetAreaPerCrop(userId,this.Role)
        .subscribe(res => {
          var cropArea = [];
          cropArea[0] = ['CropName', 'CropArea'];
          for (var i = 0; i < res.length; i++) {
            cropArea[i + 1] = [res[i].CropName, res[i].CropArea];
          }

          if (cropArea) {
            this.filterdStats = cropArea.filter(Boolean);
            this.tlpieChartData = {
              chartType: 'PieChart',
              dataTable: this.filterdStats,
              options: { 'title': 'Area Cultivated Per Each Crop (Hectares)',  'height': 400 }
            };
          }
        })

      

      this.authService.GetRegistrationPerCrop()
        .subscribe(res => {
         
          var cropGrown = [];
          cropGrown[0] = ['CropName', 'RegistrationCount'];

          for (var i = 0; i < res.length; i++) {
            cropGrown[i + 1] = [res[i].CropName, res[i].RegistrationCount];
          }

          if (cropGrown) {
            this.tlDonutChartData = {
              chartType: 'PieChart',
              dataTable: cropGrown,
              options: { 'title': 'Registrations Per Crop - 2018', 'height': 400, pieHole: 0.4 },
            };
          }
        })

        this.authService.GetRegistrationStats()
        .subscribe(res => {
    
          var regStates = [];
          regStates[0] = ['Month', 'Registration Count', 'Inspected Count'];

          for (var i = 0; i < res.length; i++) {
            // console.log(JSON.stringify(regStates))
            regStates[i + 1] = [res[i].Month, res[i].RegistrationCount, res[i].InspectedCount];
            // if (res[i].RegistrationCount != 0) {
            //   regStates[i] = [res[i].Month, res[i].RegistrationCount, res[i].InspectedCount];
            //   console.log(JSON.stringify(regStates[i]))          
            // }
          }

          if (regStates) {
            this.filterdStats = regStates.filter(Boolean);
            //console.log(JSON.stringify(regStates))
            this.tlBarChartData = {
              chartType: 'ColumnChart',
              dataTable: this.filterdStats,
              options: { 'title': 'Registrations VS Inspections - 2018', 'height': 400 }
            }

          }
        })

    }

    if(this.Role == 1){
      this.authService.GetUserRegistrationsPerMonth()
      .subscribe(res => {
        //console.log(JSON.stringify(res))
        var regPerMonth = [];
        regPerMonth[0] = ['Month', 'User Registration Count'];
        for (var i = 0; i < res.length; i++) {
          regPerMonth[i + 1] = [res[i].Month, res[i].UserRegistrationCount];
        }

        if(regPerMonth){
          //console.log(JSON.stringify(RegPerMonth))
          this.adminBarChartData = {
            chartType: 'ColumnChart',
            dataTable: regPerMonth,
            options: { 'title': 'New User Registrations Per Month - 2018', 'height': 400},
          };
        }
      })


      this.authService.GetRegistrationPerCrop()
        .subscribe(res => {
          //console.log(JSON.stringify(res))
          var cropGrown = [];
          cropGrown[0] = ['CropName', 'RegistrationCount'];
          for (var i = 0; i < res.length; i++) {
            cropGrown[i + 1] = [res[i].CropName, res[i].RegistrationCount];
          }

          if (cropGrown) {
            //console.log(JSON.stringify(CropGrown))
            this.adminpieChartData = {
              chartType: 'PieChart',
              dataTable: cropGrown,
              options: { 'title': 'Inspection Registrations Per Crop - 2018', 'height': 400},
            };
          }
        })


        this.authService.GetUserPerDistrict()
        .subscribe(res => {
          //console.log(JSON.stringify(res))
          var userDist = [];
          userDist[0] = ['DistrictName', 'Users Count'];

          for (var i = 0; i < res.length; i++) {
            userDist[i + 1] = [res[i].DistrictName, res[i].UserRegistrationCount];
          }

          if (userDist) {
            //console.log(JSON.stringify(userDist))
            this.adminBarChartDataForDistrict = {
              chartType: 'ColumnChart',
              dataTable: userDist,
              options: { 'title': 'Registered Users Per District','height': 400},
            };
          }
        })

    }

    if(this.Role == 3){

      this.authService.GetInspectedGrowersPerMonth()
      .subscribe(res => {
        var growersPerMonth = [];
        growersPerMonth[0] = ['Month', 'Inspected Count'];

        for (var i = 0; i < res.length; i++) {
          growersPerMonth[i + 1] = [res[i].Month, res[i].InspectedCount];
        }

        if (growersPerMonth) {
          //console.log(JSON.stringify(growersPerMonth))
          this.psiBarChartDataForDistrict = {
            chartType: 'ColumnChart',
            dataTable: growersPerMonth,
            options: { 'title': 'Inspected Growers Per Month - 2018',  'height': 400 },
          };
        }

      })

      var userID = JSON.parse(window.localStorage.getItem('UserId'))
      //console.log(UserID)
      this.authService.GetInspectorStats(userID,this.Role)
      .subscribe(res => {
        var inspectorStats = [];
        inspectorStats[0] = ['Status', 'Count'];

        for (var i = 0; i < res.length; i++) {
          inspectorStats[i + 1] = [res[i].Status, res[i].Count];
        }

        if (inspectorStats) {
          //console.log(JSON.stringify(inspectorStats))
          this.psiPieChartDataForDistrict = {
            chartType: 'PieChart',
            dataTable: inspectorStats,
            options: { 'title': 'Assigned Vs Inspected for the year 2018', 'height': 400,},
          };
        }

      })
    }

    if(this.Role == 4){
      var userID = JSON.parse(window.localStorage.getItem('UserId'))
      //console.log(UserID)
      this.authService.GetInspectorStats(userID,this.Role)
      .subscribe(res => {
        var growserStats = [];
        growserStats[0] = ['Status', 'Count'];
        //console.log(JSON.stringify(res))
        for (var i = 0; i < res.length; i++) {
          growserStats[i + 1] = [res[i].Status, res[i].Count];
        }

        if (growserStats) {
          //console.log(JSON.stringify(growserStats))
          this.growerPieChartDataForDistrict = {
            chartType: 'PieChart',
            dataTable: growserStats,
            options: { 'title': 'Assigned Vs Inspected for the year 2018',  'height': 400,},
          };
        }
      })

      this.authService.GetAreaPerCrop(userID,this.Role)
        .subscribe(res => {
          var cropArea = [];
          cropArea[0] = ['CropName', 'CropArea'];
          for (var i = 0; i < res.length; i++) {
            //console.log(CropArea)
            cropArea[i + 1] = [res[i].CropName, res[i].CropArea];
          }

          if (cropArea) {
            var filterdStats = cropArea.filter(Boolean);
            //console.log(JSON.stringify(CropArea))
            this.growerpieChartData = {
              chartType: 'PieChart',
              dataTable: filterdStats,
              options: { 'title': 'Area Cultivated Per Each Crop (Hectares)',  'height': 400 }
            };
          }
        })

    }

  }

}
