import {Component, OnInit, ViewChild} from '@angular/core';
import {Covid19} from '../../entities/covid19';
import {Covid19Service} from '../../services/covid19.service';
import {Chart} from 'chart.js';
import {DatePipe} from '@angular/common';
@Component({
  selector: 'app-covid',
  templateUrl: './covid.component.html',
  styleUrls: ['./covid.component.css']
})
export class CovidComponent implements OnInit {
  listaCasos: Covid19[];
  p = 1;
  order = 'Date';
  MapFecha: any;
  fixedDate: any = [];
  MapConfirmados: any;
  MapMuertos: any;
  MapRecuperados: any;
  MapActivos: any;
  fec: any;
  constructor(private covid19Service: Covid19Service, private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.fec = new Date();
    this.leerInfo();
  }
  leerInfo(): void{
    this.covid19Service.CargarInfo().subscribe(
      (res: Covid19[]) => {
        this.listaCasos = res;
        this.MapFecha = this.listaCasos.map((x) => x.Date);
        for (let i = 0; i < this.MapFecha.length; i++)
        {
          this.fixedDate.push(this.datePipe.transform(this.MapFecha[i], 'M/dd/yyyy'));
        }
        this.MapConfirmados = this.listaCasos.map((x) => x.Confirmed);
        this.MapMuertos = this.listaCasos.map((x) => x.Deaths);
        this.MapRecuperados = this.listaCasos.map((x) => x.Recovered);
        this.MapActivos = this.listaCasos.map((x) => x.Active);
        const myChart = new Chart('myChart', {
          type: 'line',
          data: {
            labels: this.fixedDate,
            datasets: [{
              label: 'Confirmados',
              data: this.MapConfirmados,

              borderColor: '#2FB8F4',
              borderWidth: 1.5,
              fill: false
            },
              {
                label: 'Muertos',
                data: this.MapMuertos,
                borderColor: '#FF0D47',
                borderWidth: 1.5,
                fill: false
              },
              {
                label: 'Recuperados',
                data: this.MapRecuperados,
                borderColor: '#FF630D',
                borderWidth: 1.5,
                fill: false
              },
              {
                label: 'Activos',
                data: this.MapActivos,
                borderColor: '#49FF0D',
                borderWidth: 1.5,
                fill: false
              }]
          },
          options: {
            scales: {
              yAxes: [{
                ticks: {
                  beginAtZero: true
                }
              }]
            }
          }
        });
      }
    );
  }
}
