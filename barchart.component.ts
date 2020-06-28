import { Component, OnInit, Input } from '@angular/core';
import { DataserverService } from '../dataserver.service';

@Component({
  selector: 'app-barchart',
  templateUrl: './barchart.component.html',
  styleUrls: ['./barchart.component.css'],
})
export class BarChartComponent implements OnInit {
  @Input('set_id') id;
  ChartData = [{ data: [], label: '' }];
  ChartLabels = [];

  ChartLegend = true;
  ChartType = 'bar';
  ChartPlugins = [];
  ChartColors = [];
  constructor(private service: DataserverService) {}

  ngOnInit(): void {}

  changeChart() {
    let type = (<HTMLInputElement>document.getElementById(this.id)).value;
    this.ChartType = type;
  }

  updateChart(data, scope) {
    let ChartColors = ['#0e9aa7', '#e84a5f', '#a8df65', '#888888'];
    if (scope == 'country') {
      let data_new = data.filter(
        (data_) => data_['statecode'] != 'TT' && data_['statecode'] != 'UN'
      );
      this.ChartData = ['confirmed', 'active', 'recovered', 'deaths'].map(
        (type, i) => {
          return {
            data: data_new.reduce((states, state) => {
              states.push(state[type]);
              return states;
            }, []),
            label: type,
            backgroundColor: ChartColors[i],
          };
        }
      );
      this.ChartLabels = data_new.map((state) => {
        return state['statecode'];
      });
    } else if (scope == 'countryTotal') {
      let data_new = data.filter((data_) => data_['statecode'] == 'TT');
      this.ChartData = ['confirmed', 'active', 'recovered', 'deaths'].map(
        (type, i) => {
          return {
            data: data_new.reduce((states, state) => {
              states.push(state[type]);
              return states;
            }, []),
            label: type,
            backgroundColor: ChartColors[i],
          };
        }
      );
      this.ChartLabels = data_new.map((state) => {
        return state['statecode'];
      });
    } else if (scope == 'countryTrend') {
      this.ChartData = [
        'dailyconfirmed',
        'dailyrecovered',
        'dailydeceased',
      ].map((type, i) => {
        return {
          data: data.reduce((days, day) => {
            days.push(day[type]);
            return days;
          }, []),
          label: type,
          backgroundColor: ChartColors[i + 1],
        };
      });
      this.ChartLabels = data.map((day) => {
        return day['date'].slice(0, 6);
      });
    } else if (scope == 'state') {
      this.ChartData = ['confirmed', 'active', 'recovered', 'deceased'].map(
        (type, i) => {
          return {
            data: data.reduce((dists, dist) => {
              dists.push(dist[type]);
              return dists;
            }, []),
            label: type,
            backgroundColor: ChartColors[i],
          };
        }
      );
      this.ChartLabels = data.map((dist) => {
        return dist['district'];
      });
    }
  }
}