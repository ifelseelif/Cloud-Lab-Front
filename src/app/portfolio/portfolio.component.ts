import { Component, OnInit } from '@angular/core';
import { ApiService } from '../_services/api.service';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit {
  portfolios: any = [];
  portfoliosStocks: any = [];
  stocksRecommended : any = [];
  error: string = "";
  isError = false;
  portfolioId: string = "";

  form: any = {
    portfolioId: 0,
    stockId: "",
    count: 0
  };

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.apiService.getAllPortfolios().subscribe({
      next: data => {
        //console.log(data)
        this.portfolios = data
      },
      error: err => {
        this.isError = true;
        this.error = "Попробуйте позже"
      }
    });
  }

  choosePortfolio(portfolioId: string): void {
    this.stocksRecommended=[]
    this.apiService.getAllStocksFromPortfolio(portfolioId).subscribe({
      next: data => {
        console.log(data)
        this.portfoliosStocks = data
      },
      error: err => {
        this.portfoliosStocks = [];
        this.isError = true;
        this.error = "Попробуйте позже"
      }
    });
    console.log(portfolioId)
    this.portfolioId = portfolioId;
  }

  createPortfolio(): void {
    this.apiService.createPortfolio().subscribe({
      next: data => {
        this.reloadPage();
      },
      error: err => {
        this.isError = true;
        this.error = "Попробуйте позже"
      }
    });
  }

  addStock(): void {
    this.form.portfolioId = this.portfolioId;
    this.apiService.addStockToPortfolio(this.portfolioId, this.form.stockId, this.form.count).subscribe({
      next: data => {
        this.reloadPage();
      },
      error: err => {
        this.isError = true;
        this.error = "Попробуйте позже"
      }
    });
    console.log(this.form)
  }

  updateRecommendation() : void {
    this.apiService.getBalance(this.portfolioId).subscribe({
      next: data => {
        console.log(data)
        this.stocksRecommended = data
      },
      error: err => {
        this.portfoliosStocks = [];
        this.isError = true;
        this.error = "Попробуйте позже"
      }
    });
  }

  reloadPage(): void {
    window.location.reload();
  }
}
