import {Component, OnInit} from '@angular/core';
import {StocksDbService} from "./stocks-db.service";
import {Response} from "@angular/http";
import {Auth} from './auth.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [StocksDbService, Auth]
})
export class AppComponent implements OnInit {
  httpOutput;
  items: any[] = [];
  stocks = {};
  inCompanyLookup = "";
  inStockQuote = "";
  stockToSave = "";
  inStockInteractiveChart = "";
  userStocks = {};
  userStocksArray = [];
  currentStockDetail = {};
  constructor(private stocksDb : StocksDbService, private auth: Auth){}

  ngOnInit(){
    this.stocksDb.getData().subscribe(
      response => this.httpOutput = response,
      error => console.error(error)
    );
  }

  onSubmit(username: string, email : string){

    this.stocksDb.sendData({username: username, email: email}).subscribe(
      data => console.log(data)
    );
  }

  onGetData(){
    this.stocksDb.getOwnData().subscribe(
      data => {
        const myArray = [];
        for(let key in data){
          myArray.push(data[key]);
        }
        this.items = myArray;
      },
      error => console.error(error)
    );
  }

  companyLookup(){
    this.stocksDb.companyLookup(this.inCompanyLookup).subscribe(
      data => {
        this.stocks = JSON.stringify(data);
      },
      error => console.error(error)
    )
  }

  stockQuote(stockCode: string){
    this.stocksDb.stockQuote(stockCode).subscribe(
      data => {
        this.stocks = JSON.stringify(data);
      },
      error => console.error(error)
    )
  }

  getUserStocks(){
    this.stocksDb.getUserStocks(this.auth.userProfile.user_id).subscribe(
      data => {
        this.userStocks = JSON.stringify(data);
        console.log(this.userStocks);
        const myArray = [];
        for(let key in data){
          myArray.push({key: key, data: data[key]});
        }
        this.userStocksArray = myArray;
      },
      error => console.error(error)
    )
  }

  saveUserStock(stock: string) {
    this.stocksDb.saveUserStock(this.auth.userProfile.user_id, {stock: this.stockToSave}).subscribe(
      data => {
        this.stocks = JSON.stringify(data);
      },
      error => console.error(error)
    )
  }

  getStockInfo(stockCode: string) {
    this.stockQuote(stockCode);
  }

  deleteStockInfo(stock: any) {
    console.log(stock);
    return this.stocksDb.deleteUserStock(this.auth.userProfile.user_id, stock.key).subscribe(
      data => {console.log(data)}
    );
  }



}
