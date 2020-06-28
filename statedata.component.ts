import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BarChartComponent } from '../barchart/barchart.component';
import { DataserverService } from '../dataserver.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-statedata',
  templateUrl: './statedata.component.html',
  styleUrls: ['./statedata.component.css'],
})
export class statedataComponent implements OnInit {
  @ViewChild('childChart') childChart: BarChartComponent;
  data = [];
  name = 'Unknown';

  constructor(
    private service: DataserverService,
    private toastr: ToastrService,
    private route_: ActivatedRoute
  ) {
    this.loadStateData();
  }
  loadStateData() {
    this.service.getStateData().subscribe(
      (responce) => {
        this.data = responce.find(
          (data) => data['statecode'] == [this.route_.snapshot.params['id']]
        );
        this.name = this.data['state'];
        this.data = this.data['districtData'];

        console.log(this.data);
        this.childChart.updateChart(this.data, 'state');
      },
      (error) => {
        this.toastr.error('Network Error!');
        console.log(error);
      }
    );
  }
  ngOnInit(): void {}
}
