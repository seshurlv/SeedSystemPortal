import { Component, OnInit } from '@angular/core';
import { LocationStrategy, PlatformLocation, Location } from '@angular/common';
import { LegendItem, ChartType } from '../lbd/lbd-chart/lbd-chart.component';
import * as Chartist from 'chartist';

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
  constructor() { }

  ngOnInit() {
    this.emailChartType = ChartType.Pie;
    this.emailChartData = {
      labels: ['62%', '32%', '6%'],
      series: [62, 32, 6]
    };
    this.emailChartLegendItems = [
      { title: 'Certified', imageClass: 'fa fa-circle text-info' },
      { title: 'Rejected', imageClass: 'fa fa-circle text-danger' },
      { title: 'InProgress', imageClass: 'fa fa-circle text-warning' }
    ];

    this.hoursChartType = ChartType.Line;
    this.hoursChartData = {
      labels: ['9:00AM', '12:00AM', '3:00PM', '6:00PM', '9:00PM', '12:00PM', '3:00AM', '6:00AM'],
      series: [
        [287, 385, 490, 492, 554, 586, 698, 695, 752, 788, 846, 944],
        [67, 152, 143, 240, 287, 335, 435, 437, 539, 542, 544, 647],
        [23, 113, 67, 108, 190, 239, 307, 308, 439, 410, 410, 509]
      ]
    };
    this.hoursChartOptions = {
      low: 0,
      high: 800,
      showArea: true,
      height: '245px',
      axisX: {
        showGrid: false,
      },
      lineSmooth: Chartist.Interpolation.simple({
        divisor: 3
      }),
      showLine: false,
      showPoint: false,
    };
    this.hoursChartResponsive = [
      ['screen and (max-width: 640px)', {
        axisX: {
          labelInterpolationFnc: function (value) {
            return value[0];
          }
        }
      }]
    ];
    this.hoursChartLegendItems = [
      { title: 'Open', imageClass: 'fa fa-circle text-info' },
      { title: 'Click', imageClass: 'fa fa-circle text-danger' },
      { title: 'Click Second Time', imageClass: 'fa fa-circle text-warning' }
    ];

    this.activityChartType = ChartType.Bar;
    this.activityChartData = {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      series: [
        [542, 443, 320, 780, 553, 453, 326, 434, 568, 610, 756, 895],
        [412, 243, 280, 580, 453, 353, 300, 364, 368, 410, 636, 695]
      ]
    };
    this.activityChartOptions = {
      seriesBarDistance: 10,
      axisX: {
        showGrid: false
      },
      height: '245px'
    };
    this.activityChartResponsive = [
      ['screen and (max-width: 640px)', {
        seriesBarDistance: 5,
        axisX: {
          labelInterpolationFnc: function (value) {
            return value[0];
          }
        }
      }]
    ];
    this.activityChartLegendItems = [
      { title: 'Inspection', imageClass: 'fa fa-circle text-info' },
      { title: 'Sample Test', imageClass: 'fa fa-circle text-danger' }
    ];

    this.tableData1 = {
      headerRow: ['Grower Name', 'Farm Address', 'Previous Crop', 'Crop Grown', 'Variety',
        'HA', 'Projected Output', 'Seed Issued', 'Company', 'Seed Source'],
      // dataRows: [
      //   ['1', 'Dakota Rice', 'Niger', 'Oud-Turnhout', '$36,738'],
      //   ['2', 'Minerva Hooper', 'Curaçao', 'Sinaai-Waas', '$23,789'],
      //   ['3', 'Sage Rodriguez', 'Netherlands', 'Baileux', '$56,142'],
      //   ['4', 'Philip Chaney', 'Korea, South', 'Overland Park', '$38,735'],
      //   ['5', 'Doris Greene', 'Malawi', 'Feldkirchen in Kärnten', '$63,542'],
      //   ['6', 'Mason Porter', 'Chile', 'Gloucester', '$78,615']
      // ]
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
    },

    {
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
