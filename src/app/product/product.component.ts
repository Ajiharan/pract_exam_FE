import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { InventoryService } from '../services/inventory.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  public offset: number = 0;
  public limit: number = 5;
  public count: number = 10;

  public isEdit: boolean = false;
  public isLoading: boolean = false;
  public isFormLoading: boolean = false;
  public isSearch: boolean = false;

  private productName: string = '';
  private productId: string = '';

  private ProductTableHeader: string[] = [
    'Name',
    'Part Number',
    'label',
    'Starting Inventory',
    'Inventory Received',
    'On-hand',
    'Minumum Required',
  ];
  private productTableData: any[] = [];
  public getPurchaseTableHeader(): string[] {
    return this.ProductTableHeader;
  }
  public getPurchaseTableData(): any[] {
    return this.productTableData;
  }
  productFormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    part: new FormControl('', [Validators.required]),
    label: new FormControl('', [Validators.required]),
    start: new FormControl('', [Validators.required]),
    received: new FormControl('', [Validators.required]),
    onHand: new FormControl('', [Validators.required]),
    minimum: new FormControl('', [Validators.required]),
  });
  constructor(private inventoryService: InventoryService) {}

  public validInput(control: AbstractControl | null): string | null {
    const formGroup = control?.parent?.controls;

    const controlName =
      Object.keys(formGroup!)?.find(
        (name) => control === control?.parent?.get(name)
      ) || null;

    if (!control?.errors) {
      return null;
    }
    if (!(control.invalid && (control.dirty || control.touched))) {
      return null;
    }
    if (control?.hasError('required')) {
      return `${controlName}  is required`;
    }

    return null;
  }
  private getProductData(): void {
    if (!this.isSearch) {
      this.isLoading = true;
    }

    this.resetFom();
    this.inventoryService
      .getProducts({ limit: this.limit, offset: this.offset }, this.productName)
      .subscribe((res: any[]) => {
        setTimeout(() => {
          this.isLoading = false;
          this.isFormLoading = false;
        }, 2000);

        if (res.length > 0) {
          this.count = res[0];
          this.productTableData = res[1].map(
            ({
              name,
              part,
              label,
              start,
              received,
              onHand,
              minimum,
              _id,
            }: {
              name: string;
              part: string;
              label: string;
              start: number;
              received: number;
              onHand: number;
              minimum: number;
              _id: string;
            }) => {
              return {
                name,
                part,
                label,
                start,
                received,
                onHand,
                minimum,
                _id,
              };
            }
          );
        }
      });
  }
  public paginationFunc(event: any): void {
    this.limit = event.pageSize;
    this.offset = event.pageIndex * event.pageSize;
    this.isSearch = false;
    this.getProductData();
  }
  public onNameChangeFunc(name: string): void {
    this.productName = name;
    this.isSearch = true;
    this.getProductData();
  }
  public onEditFormFunc(product: any): void {
    this.isEdit = true;
    const { _id, ...formData } = product;
    this.productId = _id;
    this.productFormGroup.patchValue(formData);
  }

  public resetFom(): void {
    this.productFormGroup.reset();
    this.isEdit = false;
    this.productId = '';
  }

  ngOnInit(): void {
    this.getProductData();
  }

  onDeleteFormFunc(id: string): void {
    this.inventoryService.deleteProduct(id).subscribe(() => {
      this.isSearch = false;
      this.getProductData();
    });
  }

  onSubmit() {
    this.isFormLoading = true;
    if (this.isEdit) {
      this.inventoryService
        .updateProduct(this.productId, this.productFormGroup.value)
        .subscribe(() => {
          this.isSearch = false;
          this.getProductData();
        });
    } else {
      this.inventoryService
        .addProduct(this.productFormGroup.value)
        .subscribe(() => {
          this.isSearch = false;
          this.getProductData();
        });
    }
  }
}
