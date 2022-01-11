import { Component, OnInit } from '@angular/core';
import { ApiService } from '../_services/api.service';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css']
})
export class StockComponent implements OnInit {
  stocks : any = [];
  error : string = "";
  isError = false;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.isError = false;
    this.error = "";
    this.apiService.getAllStocks().subscribe({
      next: data => {
        this.stocks = data
      },
      error: err => {
        this.isError = true;
        this.error = "Попробуйте позже"
      }
    });
  }

}
