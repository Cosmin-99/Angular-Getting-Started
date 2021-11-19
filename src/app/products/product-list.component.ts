import { IProduct } from './product';
import { Component, OnInit } from "@angular/core";
import { ProductService } from './product.service';

@Component({
  selector: "pm-products",
  templateUrl: "./poduct-list.component.html",
  styleUrls: ["./product-list.component.css"]
})
export class ProductListComponent implements OnInit {
  pageTitle: string = "Product List";
  imageWidth: number = 50;
  imageMargin: number = 2;
  showImage: boolean = false;
  products: IProduct[] = [];
  private _listFilter: string = "";
  filteredProducts: IProduct[] = [];

  constructor(private productService: ProductService) {}

  performFilter(filterBy: string): IProduct[] {
    filterBy = filterBy.toLowerCase();
    return this.products.filter((el) => el.productName.toLowerCase().includes(filterBy));
  }

  toggleImage(): void {
    this.showImage = !this.showImage;
  }

  get listFilter(): string {
    return this._listFilter
  }

  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredProducts = this.performFilter(value);
  }

   ngOnInit(): void {
     this.products = this.productService.getProducts();
     this.filteredProducts = this.products;
   }

  onRatingClicked(message: string) {
    this.pageTitle = "Product List: " + message;
  }
}
