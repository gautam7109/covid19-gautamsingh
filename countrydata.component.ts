import { Component, OnInit, ViewChild } from '@angular/core';
import { DataserverService } from '../dataserver.service';
import { ToastrService } from 'ngx-toastr';
import { BarChartComponent } from '../barchart/barchart.component';
import { Router } from '@angular/router';
@Component({
  selector: 'app-countrydata',
  templateUrl: './countrydata.component.html',
  styleUrls: ['./countrydata.component.css'],
})
export class CountryDataComponent implements OnInit {
  @ViewChild('statewiseChart') statewiseChart: BarChartComponent;
  @ViewChild('countryTotalChart') countryTotalChart: BarChartComponent;
  @ViewChild('countryTrendChart') countryTrendChart: BarChartComponent;
  data = [];
  filteredData = [];

  constructor(
    private service: DataserverService,
    private toastr: ToastrService,
    private _router: Router
  ) {
    this.loadCountryData();
  }
  filter() {
    let filterVal = (<HTMLInputElement>document.getElementById('search')).value;
    if (!filterVal) {
      this.filteredData = this.data['statewise'];
      return;
    }
    let regex = new RegExp('^' + filterVal, 'i');
    this.filteredData = this.data['statewise'].filter((state) => {
      return regex.test(state['state']);
    });
  }

  loadCountryData() {
    this.service.getCountryData().subscribe(
      (responce) => {
        console.log(responce);
        this.data = responce;
        this.filteredData = this.data['statewise'];
        this.statewiseChart.updateChart(this.data['statewise'], 'country');
        this.countryTotalChart.updateChart(
          this.data['statewise'],
          'countryTotal'
        );
        this.countryTrendChart.updateChart(
          this.data['cases_time_series'],
          'countryTrend'
        );
      },
      (error) => {
        this.toastr.error('Network Error!');
        console.log(error);
      }
    );
  }
  goToState(state) {
    this._router.navigate(['/home/state', state]);
  }

  ngOnInit(): void {}
}