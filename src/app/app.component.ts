import {Component, OnInit, AfterViewChecked} from '@angular/core';
import {StocksDbService} from "./stocks-db.service";
import {Response} from "@angular/http";
import {Auth} from './auth.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [StocksDbService, Auth]
})
export class AppComponent implements OnInit, AfterViewChecked {
  stocks = {};
  userStocks = {};
  userStocksArray = [];

  constructor(private stocksDb : StocksDbService, private auth: Auth){}

  ngOnInit(){
  }

  ngAfterViewChecked() {
    console.log("ngAfterViewChecked");
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

  saveUserStock(stockToSave: string) {
    this.stocksDb.saveUserStock(this.auth.userProfile.user_id, stockToSave).subscribe(
      data => {
        this.stocks = JSON.stringify(data);
      },
      error => console.error(error)
    )
  }



  deleteStockInfo(stockKey: string) {
    console.log(stockKey);
    return this.stocksDb.deleteUserStock(this.auth.userProfile.user_id, stockKey).subscribe(
      data => {console.log(data)}
    );
  }



}
