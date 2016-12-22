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

}
