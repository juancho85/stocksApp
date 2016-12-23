import { Injectable } from '@angular/core';
import {Http, Response, Headers} from "@angular/http";
import 'rxjs/Rx';

@Injectable()
export class StocksDbService {

  constructor(private http: Http) { }

  getUserStocks(userId : string) {
    return this.http.get('https://stocks-app-4db05.firebaseio.com/'+userId+'/stocks.json').map((response: Response) => response.json())
  }

  saveUserStock(userId : string, stock: any) {
    const body = JSON.stringify(stock);
    const headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post('https://stocks-app-4db05.firebaseio.com/'+userId+'/stocks.json', body, {
      headers: headers
    })
      .map((data: Response) => data.json());
  }

  deleteUserStock(userId : string, stockKey: string) {
    const url = encodeURI('https://stocks-app-4db05.firebaseio.com/'+userId+'/stocks/'+stockKey+'.json');
    return this.http.delete(url).map((data: Response) => data.json());
  }

  getOwnData(){
    return this.http.get('https://stocks-app-4db05.firebaseio.com/data.json').map((response: Response) => response.json())
  }

  companyLookup(stockCode : string){
    return this.http.get('http://dev.markitondemand.com/MODApis/Api/v2/Lookup/json?input='+stockCode).map((response: Response) => response.json())
  }

  stockQuote(stockCode : string){
    return this.http.get('http://dev.markitondemand.com/MODApis/Api/v2/Quote/json?symbol='+stockCode).map((response: Response) => response.json())
  }

}
