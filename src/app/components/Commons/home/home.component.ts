import { Component, OnInit } from '@angular/core';
import { CropServices } from './../../../../services/Crops/crops.services'

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

  role
  filterdStats = []

  constructor(private cropServices: CropServices) { }

  ngOnInit() {

    this.role = JSON.parse(window.localStorage.getItem('Role'));

    if (this.role == 2) {
      let userId = 0
      this.cropServices.GetAreaPerCrop(userId, this.role)
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
              options: { 'title': 'Area Cultivated Per Each Crop (Hectares)', 'height': 400 }
            };
          }
        })



      this.cropServices.GetRegistrationPerCrop()
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

      this.cropServices.GetRegistrationStats()
        .subscribe(res => {

          var regStates = [];
          regStates[0] = ['Month', 'Registration Count', 'Inspected Count'];

          for (var i = 0; i < res.length; i++) {
            regStates[i + 1] = [res[i].Month, res[i].RegistrationCount, res[i].InspectedCount];
          }

          if (regStates) {
            this.filterdStats = regStates.filter(Boolean);

            this.tlBarChartData = {
              chartType: 'ColumnChart',
              dataTable: this.filterdStats,
              options: { 'title': 'Registrations VS Inspections - 2018', 'height': 400 }
            }

          }
        })

    }

    if (this.role == 1) {
      this.cropServices.GetUserRegistrationsPerMonth()
        .subscribe(res => {

          var regPerMonth = [];
          regPerMonth[0] = ['Month', 'User Registration Count'];
          for (var i = 0; i < res.length; i++) {
            regPerMonth[i + 1] = [res[i].Month, res[i].UserRegistrationCount];
          }

          if (regPerMonth) {

            this.adminBarChartData = {
              chartType: 'ColumnChart',
              dataTable: regPerMonth,
              options: { 'title': 'New User Registrations Per Month - 2018', 'height': 400 },
            };
          }
        })


      this.cropServices.GetRegistrationPerCrop()
        .subscribe(res => {

          var cropGrown = [];
          cropGrown[0] = ['CropName', 'RegistrationCount'];
          for (var i = 0; i < res.length; i++) {
            cropGrown[i + 1] = [res[i].CropName, res[i].RegistrationCount];
          }

          if (cropGrown) {

            this.adminpieChartData = {
              chartType: 'PieChart',
              dataTable: cropGrown,
              options: { 'title': 'Inspection Registrations Per Crop - 2018', 'height': 400 },
            };
          }
        })


      this.cropServices.GetUserPerDistrict()
        .subscribe(res => {

          var userDist = [];
          userDist[0] = ['DistrictName', 'Users Count'];

          for (var i = 0; i < res.length; i++) {
            userDist[i + 1] = [res[i].DistrictName, res[i].UserRegistrationCount];
          }

          if (userDist) {

            this.adminBarChartDataForDistrict = {
              chartType: 'ColumnChart',
              dataTable: userDist,
              options: { 'title': 'Registered Users Per District', 'height': 400 },
            };
          }
        })

    }

    if (this.role == 3) {

      this.cropServices.GetInspectedGrowersPerMonth()
        .subscribe(res => {
          var growersPerMonth = [];
          growersPerMonth[0] = ['Month', 'Inspected Count'];

          for (var i = 0; i < res.length; i++) {
            growersPerMonth[i + 1] = [res[i].Month, res[i].InspectedCount];
          }

          if (growersPerMonth) {

            this.psiBarChartDataForDistrict = {
              chartType: 'ColumnChart',
              dataTable: growersPerMonth,
              options: { 'title': 'Inspected Growers Per Month - 2018', 'height': 400 },
            };
          }

        })

      var userID = JSON.parse(window.localStorage.getItem('UserId'))

      this.cropServices.GetInspectorStats(userID, this.role)
        .subscribe(res => {
          var inspectorStats = [];
          inspectorStats[0] = ['Status', 'Count'];

          for (var i = 0; i < res.length; i++) {
            inspectorStats[i + 1] = [res[i].Status, res[i].Count];
          }

          if (inspectorStats) {

            this.psiPieChartDataForDistrict = {
              chartType: 'PieChart',
              dataTable: inspectorStats,
              options: { 'title': 'Assigned Vs Inspected for the year 2018', 'height': 400, },
            };
          }

        })
    }

    if (this.role == 4) {
      var userID = JSON.parse(window.localStorage.getItem('UserId'))

      this.cropServices.GetInspectorStats(userID, this.role)
        .subscribe(res => {
          var growserStats = [];
          growserStats[0] = ['Status', 'Count'];

          for (var i = 0; i < res.length; i++) {
            growserStats[i + 1] = [res[i].Status, res[i].Count];
          }

          if (growserStats) {

            this.growerPieChartDataForDistrict = {
              chartType: 'PieChart',
              dataTable: growserStats,
              options: { 'title': 'Assigned Vs Inspected for the year 2018', 'height': 400, },
            };
          }
        })

      this.cropServices.GetAreaPerCrop(userID, this.role)
        .subscribe(res => {
          var cropArea = [];
          cropArea[0] = ['CropName', 'CropArea'];
          for (var i = 0; i < res.length; i++) {

            cropArea[i + 1] = [res[i].CropName, res[i].CropArea];
          }

          if (cropArea) {
            var filterdStats = cropArea.filter(Boolean);

            this.growerpieChartData = {
              chartType: 'PieChart',
              dataTable: filterdStats,
              options: { 'title': 'Area Cultivated Per Each Crop (Hectares)', 'height': 400 }
            };
          }
        })
    }

  }

}
