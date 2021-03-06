import { Component, OnInit, Output, EventEmitter, Inject, Input } from '@angular/core';

@Component({
  selector: 'cm-search-product',
  templateUrl: './search-product.component.html',
  styles: []
})
export class SearchProductComponent implements OnInit {

  _vendorId: any;
  _disabled: any;

  @Output('onSelect') onSelect: EventEmitter<any> = new EventEmitter<any>();
  @Output('onChange') onChange: EventEmitter<any> = new EventEmitter<any>();

  @Input('vendorId')
  set setVendorId(value: any) {
    this._vendorId = value;
    this.setApiUrl();
  }  

  @Input('disabled')
  set setDisabled(value: any) {
    this._disabled = value;
  }  
  
  token: any;
  query: any = null;
  searchProductUrl: any;

  constructor(
    @Inject('API_URL') private apiUrl: string) {
    this.token = sessionStorage.getItem('token');
    this.setApiUrl();
  }

  setApiUrl() {
    this.searchProductUrl = `${this.apiUrl}/standard/search/products/autocomplete?token=${this.token}&vendorId=${this._vendorId}`;
  }

  ngOnInit() {
  }

  clearProductSearch() {
    this.query = null;
  }

  clearSelected(event: any) {
    if (event.keyCode === 13 || event.keyCode === 37 || event.keyCode === 38 || event.keyCode === 39 || event.keyCode === 40) {
      this.onChange.emit(false);
    } else {
      this.onChange.emit(true);
    }
  }

  handleResultSelected(event: any) {
    this.onSelect.emit(event);
    this.query = event.generic_name;
  }


}
