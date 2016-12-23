import {Component, OnInit} from '@angular/core';
import {StocksDbService} from "./stocks-db.service";
import {Response} from "@angular/http";
import {Auth} from './auth.service'
import {UserStock} from "./user-stock";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [StocksDbService, Auth]
})
export class AppComponent implements OnInit {
  stocks = {};
  userStocks : UserStock[] = [];

  constructor(private stocksDb : StocksDbService, private auth: Auth){}

  ngOnInit() {
    console.log("onInit");
    this.userStocks = [];
    this.stocksDb.userStocksChanged.subscribe(
      data => {
        this.userStocks = data;
        console.log(this.userStocks);
      }
    );
  }


  companyLookup(searchedCompany: string){
    this.stocksDb.companyLookup(searchedCompany).subscribe(
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
    this.stocksDb.getUserStocks(this.auth.userProfile.user_id).subscribe()
  }

  saveUserStock(stockCode: string) {
    this.stocksDb.saveUserStock(this.auth.userProfile.user_id, stockCode).subscribe();
  }

  deleteStockInfo(stockKey: string) {
    return this.stocksDb.deleteUserStock(this.auth.userProfile.user_id, stockKey).subscribe();
  }



}
