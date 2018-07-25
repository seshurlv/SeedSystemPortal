import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Globals } from '../../app/globals';

@Injectable()
export class ProductServices {

    constructor(private _http: Http, private globals: Globals) { }

    GetProductCategory() {
        let header = this.globals.getHeaders()

        return this._http.get(this.globals.APIHOST + 'Product/GetProductCategoryById?id=0', { headers: header })
            .map(res => res.json())
    }

    GetProducts() {
        let header = this.globals.getHeaders()

        return this._http.get(this.globals.APIHOST + 'Product/GetProductsById?id=0', { headers: header })
            .map(res => res.json())
    }

    //GetProductsByProductCategoryId
    GetProductsByProductCategoryId(Id) {
        let header = this.globals.getHeaders()
        return this._http.get(this.globals.APIHOST + 'Product/GetProductsByProductCategoryId?id=' + Id, { headers: header })
            .map(res => res.json())
    }

    //ClassOfSeed
    GetProductClassList() {
        let header = this.globals.getHeaders()
        return this._http.get(this.globals.APIHOST + 'Product/GetProductClassList?id=0', { headers: header })
            .map(res => res.json())
    }

}