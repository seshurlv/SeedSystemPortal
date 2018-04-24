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
  public emailChartType: ChartType;
  public emailChartData: any;
  public emailChartLegendItems: LegendItem[];

  public hoursChartType: ChartType;
  public hoursChartData: any;
  public hoursChartOptions: any;
  public hoursChartResponsive: any[];
  public hoursChartLegendItems: LegendItem[];

  public activityChartType: ChartType;
  public activityChartData: any;
  public activityChartOptions: any;
  public activityChartResponsive: any[];
  public activityChartLegendItems: LegendItem[];

  growersList
  tableData1
  AdminpieChartData
  AdminBarChartData
  AdminDonutChartData

  TlpieChartData
  TlBarChartData
  TlDonutChartData
  AdminBarChartDataForDistrict

  PsiBarChartDataForDistrict
  PsiPieChartDataForDistrict
  Role
  FilterdStats = []
  constructor(private authService: AuthService) { }

  ngOnInit() {

    this.Role = JSON.parse(window.localStorage.getItem('Role'));
    console.log(this.Role)

    if (this.Role == 2) {
      this.authService.GetAreaPerCrop()
        .subscribe(res => {
          var CropArea = [];
          CropArea[0] = ['CropName', 'CropArea'];
          for (var i = 0; i < res.length; i++) {
            console.log(CropArea)
            CropArea[i + 1] = [res[i].CropName, res[i].CropArea];
          }

          if (CropArea) {
            this.FilterdStats = CropArea.filter(Boolean);
            console.log(JSON.stringify(CropArea))
            this.TlpieChartData = {
              chartType: 'PieChart',
              dataTable: this.FilterdStats,
              options: { 'title': 'Area Cultivated Per Each Crop (Hectors)', 'width': 500, 'height': 400 }
            };
          }
        })

      

      this.authService.GetRegistrationPerCrop()
        .subscribe(res => {
          console.log(JSON.stringify(res))
          var CropGrown = [];
          CropGrown[0] = ['CropName', 'RegistrationCount'];

          for (var i = 0; i < res.length; i++) {
            CropGrown[i + 1] = [res[i].CropName, res[i].RegistrationCount];
          }

          if (CropGrown) {
            console.log(JSON.stringify(CropGrown))
            this.TlDonutChartData = {
              chartType: 'PieChart',
              dataTable: CropGrown,
              options: { 'title': 'Registrations Per Crop - 2018', 'width': 500, 'height': 400, pieHole: 0.4 },
            };
          }
        })

        this.authService.GetRegistrationStats()
        .subscribe(res => {
          console.log(JSON.stringify(res))
          var Combined = [];
          Combined[0] = ['Month', 'Registration Count', 'Inspected Count'];

          for (var i = 0; i < res.length; i++) {
            // console.log(JSON.stringify(Combined))
            Combined[i + 1] = [res[i].Month, res[i].RegistrationCount, res[i].InspectedCount];
            // if (res[i].RegistrationCount != 0) {
            //   Combined[i] = [res[i].Month, res[i].RegistrationCount, res[i].InspectedCount];
            //   console.log(JSON.stringify(Combined[i]))          
            // }
          }

          if (Combined) {
            this.FilterdStats = Combined.filter(Boolean);
            console.log(JSON.stringify(Combined))
            this.TlBarChartData = {
              chartType: 'ColumnChart',
              dataTable: this.FilterdStats,
              options: { 'title': 'Registrations VS Inspections - 2018', 'width': 1000, 'height': 400 }
            }

          }
        })

    }

    if(this.Role == 1){
      this.authService.GetUserRegistrationsPerMonth()
      .subscribe(res => {
        console.log(JSON.stringify(res))
        var RegPerMonth = [];
        RegPerMonth[0] = ['Month', 'User Registration Count'];
        for (var i = 0; i < res.length; i++) {
          RegPerMonth[i + 1] = [res[i].Month, res[i].UserRegistrationCount];
        }

        if(RegPerMonth){
          console.log(JSON.stringify(RegPerMonth))
          this.AdminBarChartData = {
            chartType: 'ColumnChart',
            dataTable: RegPerMonth,
            options: { 'title': 'New User Registrations Per Month - 2018','width': 1000, 'height': 400},
          };
        }
      })


      this.authService.GetRegistrationPerCrop()
        .subscribe(res => {
          console.log(JSON.stringify(res))
          var CropGrown = [];
          CropGrown[0] = ['CropName', 'RegistrationCount'];
          for (var i = 0; i < res.length; i++) {
            CropGrown[i + 1] = [res[i].CropName, res[i].RegistrationCount];
          }

          if (CropGrown) {
            console.log(JSON.stringify(CropGrown))
            this.AdminpieChartData = {
              chartType: 'PieChart',
              dataTable: CropGrown,
              options: { 'title': 'Inspection Registrations Per Crop - 2018','width': 500, 'height': 400},
            };
          }
        })


        this.authService.GetUserPerDistrict()
        .subscribe(res => {
          console.log(JSON.stringify(res))
          var userDist = [];
          userDist[0] = ['DistrictName', 'User Registration Count'];

          for (var i = 0; i < res.length; i++) {
            userDist[i + 1] = [res[i].DistrictName, res[i].UserRegistrationCount];
          }

          if (userDist) {
            console.log(JSON.stringify(userDist))
            this.AdminBarChartDataForDistrict = {
              chartType: 'ColumnChart',
              dataTable: userDist,
              options: { 'title': 'Registered Users Per District','width': 500, 'height': 400},
            };
          }
        })

    }

    if(this.Role == 3){

      this.authService.GetInspectedGrowersPerMonth()
      .subscribe(res => {
        var GrowersPerMonth = [];
        GrowersPerMonth[0] = ['Month', 'Inspected Count'];

        for (var i = 0; i < res.length; i++) {
          GrowersPerMonth[i + 1] = [res[i].Month, res[i].InspectedCount];
        }

        if (GrowersPerMonth) {
          console.log(JSON.stringify(GrowersPerMonth))
          this.PsiBarChartDataForDistrict = {
            chartType: 'ColumnChart',
            dataTable: GrowersPerMonth,
            options: { 'title': 'Inspected Growers Per Month - 2018', 'width': 1000, 'height': 400 },
          };
        }

      })


      this.authService.GetInspectorStats()
      .subscribe(res => {
        var InspectorStats = [];
        InspectorStats[0] = ['Status', 'Count'];

        for (var i = 0; i < res.length; i++) {
          InspectorStats[i + 1] = [res[i].Status, res[i].Count];
        }

        if (InspectorStats) {
          console.log(JSON.stringify(InspectorStats))
          this.PsiPieChartDataForDistrict = {
            chartType: 'PieChart',
            dataTable: InspectorStats,
            options: { 'title': 'Assigned Vs Inspected for the year 2018', 'width': 500, 'height': 400,},
          };
        }

      })
    }


    this.tableData1 = {
      headerRow: ['Grower Name', 'Farm Address', 'Previous Crop', 'Crop Grown', 'Variety',
        'HA', 'Projected Output', 'Seed Issued', 'Company', 'Seed Source'],
    };

    this.growersList = [{
      "GrowerName": "Mwambura J.D",
      "FarmAddress": "Salima - Chitala (Chuzi Estate)",
      "PreviousCrop": "Maize",
      "CropGrown": "G/nut",
      "Variety": "CG7",
      "Ha": "4",
      "ProjectedOutput": 4000,
      "SeedIssued": "Basic",
      "Company": "ICRISAT-MSIDP",
      "SeedSource": "ICRISAT"
    }, {
      "GrowerName": "Osborn Sibande",
      "FarmAddress": "Lilongwe - Namitete",
      "PreviousCrop": "Maize",
      "CropGrown": "G/nut",
      "Variety": "CG7",
      "Ha": "4",
      "ProjectedOutput": 4000,
      "SeedIssued": "Basic",
      "Company": "ICRISAT-MSIDP",
      "SeedSource": "ICRISAT"
    },
    {
      "GrowerName": "Patrick Saka Katete",
      "FarmAddress": "Kasungu - Lisasadzi",
      "PreviousCrop": "G/nut",
      "CropGrown": "Maize",
      "Variety": "ZM309",
      "Ha": "10",
      "ProjectedOutput": 10000,
      "SeedIssued": "Certified",
      "Company": "ICRISAT-MSIDP",
      "SeedSource": "ICRISAT"
    },
    {
      "GrowerName": "Sauka Mziya",
      "FarmAddress": "Mchinji - Kalulu",
      "PreviousCrop": "G/nut",
      "CropGrown": "Maize",
      "Variety": "Hybrid Maize",
      "Ha": "3",
      "ProjectedOutput": 3200,
      "SeedIssued": "Certified",
      "Company": "ICRISAT-MSIDP",
      "SeedSource": "ICRISAT"
    },
    {
      "GrowerName": "Suzgo Nyirongo",
      "FarmAddress": "Lilongwe - Mpingu",
      "PreviousCrop": "G/nut",
      "CropGrown": "Maize",
      "Variety": "Hybrid Maize",
      "Ha": "2",
      "ProjectedOutput": 1500,
      "SeedIssued": "Basic",
      "Company": "ICRISAT-MSIDP",
      "SeedSource": "ICRISAT"
    },
    {
      "GrowerName": "Chamwabvi 4",
      "FarmAddress": " Kasungu - Chamwavi",
      "PreviousCrop": "Maize",
      "CropGrown": "G/nut",
      "Variety": "CG7",
      "Ha": "3",
      "ProjectedOutput": 3000,
      "SeedIssued": "Certified",
      "Company": "ICRISAT-MSIDP",
      "SeedSource": "ICRISAT"
    },
    {
      "GrowerName": "Mpini Farm",
      "FarmAddress": "Mpini Farm	Mchinji - Kalulu",
      "PreviousCrop": "Maize",
      "CropGrown": "G/nut",
      "Variety": "CG7",
      "Ha": "3",
      "ProjectedOutput": 3000,
      "SeedIssued": "Certified",
      "Company": "ICRISAT-MSIDP",
      "SeedSource": "ICRISAT"
    },
    {
      "GrowerName": "Wanangwa Phiri",
      "FarmAddress": "Kasungu",
      "PreviousCrop": "Maize",
      "CropGrown": "G/nut",
      "Variety": "CG7",
      "Ha": "5",
      "ProjectedOutput": 5000,
      "SeedIssued": "Basic",
      "Company": "ICRISAT-MSIDP",
      "SeedSource": "ICRISAT"
    },
    {
      "GrowerName": "William Chanache",
      "FarmAddress": "Kasungu",
      "PreviousCrop": "G/nut",
      "CropGrown": "Maize",
      "Variety": "Hybrid Maize",
      "Ha": "5",
      "ProjectedOutput": 5000,
      "SeedIssued": "Certified",
      "Company": "ICRISAT-MSIDP",
      "SeedSource": "ICRISAT"
    },
    {
      "GrowerName": "Zenas Nyemba",
      "FarmAddress": "Dowa - Madisi",
      "PreviousCrop": "G/nut",
      "CropGrown": "Maize",
      "Variety": "ZM309",
      "Ha": "5",
      "ProjectedOutput": 5000,
      "SeedIssued": "Certified",
      "Company": "ICRISAT-MSIDP",
      "SeedSource": "ICRISAT"
    }
    ]


  }

}
