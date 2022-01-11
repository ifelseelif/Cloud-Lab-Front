import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const STOCK_API = 'https://ifelseelif-api.azurewebsites.net/stocks/';
const PORTFOLIO_API = 'https://ifelseelif-api.azurewebsites.net/portfolio/';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  getBalance(portfolioId: string) {
    return this.http.get(PORTFOLIO_API+"recommendation?portfolioId="+portfolioId);
  }

  constructor(private http: HttpClient) { }

  getAllStocks(): Observable<any> {
    return this.http.get(STOCK_API);
  }

  getAllStocksFromPortfolio(portfolioId: string): Observable<any> {
    return this.http.get(STOCK_API + "byPortfolio?portfolioId=" + portfolioId);
  }

  getAllPortfolios(): Observable<any> {
    return this.http.get(PORTFOLIO_API);
  }

  createPortfolio(): Observable<any> {
    return this.http.post(PORTFOLIO_API, {});
  }

  addStockToPortfolio(portfolioId: string, stockId: string, count: string): Observable<any> {
    return this.http.post(PORTFOLIO_API + "stock?portfolioId=" + portfolioId + "&stockId=" + stockId + "&count=" + count, {});
  }
}
