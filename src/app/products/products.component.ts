import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ProductService} from "../services/product.service";
import {Product} from "../model/product.model";
import { Router } from '@angular/router';
import { AppStateService } from '../services/app-state.service';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit{
  constructor(private productService:ProductService,
    private router:Router,public appState :AppStateService
    ) {
  }

  ngOnInit() {
    this.getProducts();
  }

  getProducts(){
    // this.appState.setProductState({status:"LOADING"});
    this.productService.getProducts(this.appState.productsState.keyword,this.appState.productsState.currentPge,this.appState.productsState.pageSize)
      .subscribe({
        next : (resp) => {
          let products=resp.body as Product[];
          let totalProducts:number=parseInt(resp.headers.get('x-total-count')!);
          // this.appState.productsState.totalProducts=totalProducts;
          // this.appState.productsState.pageSize=
          let totalPages=Math.floor( totalProducts/this.appState.productsState.pageSize);
          if(totalProducts%this.appState.productsState.pageSize!=0){
            totalPages++;
          }
          this.appState.setProductState({
          products:products,
          totalProducts:totalProducts,
          totalPages:totalPages,
          status:"LOADED"
          })
          console.log(this.appState.productsState.totalPages);
        },
        error : err => {
          this.appState.setProductState({
            status:"ERROR",
            errorMessage:err
          })
        }
      })

    //this.products=this.productService.getProducts();
  }


  handleCheckProduct(product: Product) {
    this.productService.checkProduct(product).subscribe({
      next :updatedProduct => {
        // LA VALEUR PAR DEFAUT PAR EXEMPLE C 'EST TRUE SI JE CLIQUE DEVIENT FALSE CA VEUT DIRE DIFFERENT AU VALEUR 
        product.checked=!product.checked;
        // SI ON UTILISE CA VA APPELER LE GET CHAQUE MODIFICATION
        //this.getProducts();
      }
    })
  }

  handleDelete(product: Product) {
    if(confirm("Etes vous sûre?"))
    this.productService.deleteProduct(product).subscribe({
      next:value => {
        //this.getProducts();
        //this.appState.productsState.products=this.appState.productsState.products.filter((p:any)=>p.id!=product.id);
        this.getProducts();
      }
    })
  }

  handleEdit(product: Product) {
    this.router.navigateByUrl(`/admin/editProduct/${product.id}`)
  }
  handleGotoPage(page:number){
    this.appState.productsState.currentPge=page;
    this.getProducts();
  }

  
}
