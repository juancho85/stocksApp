import { Injectable, EventEmitter } from '@angular/core';
import {Http, Response, Headers} from "@angular/http";
import 'rxjs/Rx';
import {UserStock} from "./user-stock";
import {Observable} from "rxjs";

@Injectable()
export class StocksDbService {

  userStocks : UserStock[] = [];
  userStocksChanged = new EventEmitter<UserStock[]>();

  constructor(private http: Http) { }

  getUserStocks(userId : string) {
    return this.http.get('https://stocks-app-4db05.firebaseio.com/'+userId+'/stocks.json').map((response: Response) => {
      const data = response.json();
      this.userStocks = [];
      for(let key in data){
        this.userStocks.push(new UserStock(key, data[key]));
      }
      this.userStocksChanged.emit(this.userStocks);
    });
  }

  saveUserStock(userId : string, stockCode: string) {
    const body = JSON.stringify(stockCode);
    const headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post('https://stocks-app-4db05.firebaseio.com/'+userId+'/stocks.json', body, {
      headers: headers
    })
      .map((response: Response) => {
        const data = response.json();
        for(let key in data){
          this.userStocks.push(new UserStock(data[key], stockCode));
        }
        this.userStocksChanged.emit(this.userStocks);
      });
  }

  deleteUserStock(userId : string, stockKey: string) {
    const url = encodeURI('https://stocks-app-4db05.firebaseio.com/'+userId+'/stocks/'+stockKey+'.json');
    return this.http.delete(url)
      .map((data: Response) => {
        for(let stock of this.userStocks){
          if(stock.key == stockKey){
            console.log('user stock deleted');
            const index = this.userStocks.indexOf(stock.key, 0);
            this.userStocks.splice(index, 1);
            break;
          }
        }
        this.userStocksChanged.emit(this.userStocks);
    });
  }

  companyLookup(stockCode : string){
    return this.http.get('http://dev.markitondemand.com/MODApis/Api/v2/Lookup/json?input='+stockCode).map((response: Response) => response.json())
  }

  stockQuote(stockCode : string){
    return this.http.get('http://dev.markitondemand.com/MODApis/Api/v2/Quote/json?symbol='+stockCode).map((response: Response) => response.json())
  }

}
