import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-loading',
  templateUrl: './product-loading.component.html',
  styleUrls: ['./product-loading.component.scss'],
  host: {'class': 'card w-1/4 px-[10px]'}
})
export class ProductLoadingComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
