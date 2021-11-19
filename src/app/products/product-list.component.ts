import { IProduct } from './product';
import { Component, OnDestroy, OnInit } from "@angular/core";
import { ProductService } from './product.service';
import { Subscription } from 'rxjs';

@Component({
  templateUrl: "./poduct-list.component.html",
  styleUrls: ["./product-list.component.css"]
})
export class ProductListComponent implements OnInit, OnDestroy {
  pageTitle: string = "Product List";
  imageWidth: number = 50;
  imageMargin: number = 2;
  showImage: boolean = false;
  products: IProduct[] = [];
  private _listFilter: string = "";
  filteredProducts: IProduct[] = [];
  errorMessage: string = "";
  sub!: Subscription;

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
     this.productService.getProducts().subscribe(
       {
         next: products => {
           this.products = products;
           this.filteredProducts = this.products;
         },
         error: err => this.errorMessage = err
       }
     );
   }

  ngOnDestroy(): void {
    // this.sub.unsubscribe();
  }

  onRatingClicked(message: string) {
    this.pageTitle = "Product List: " + message;
  }
}
