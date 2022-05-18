import { Component, OnInit } from '@angular/core';
import { InventoryService } from '../services/inventory.service';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss'],
})
export class InventoryComponent implements OnInit {
  private offset = 0;
  private limit = 5;
  private count = 10;

  constructor(private inventoryService: InventoryService) {}

  private productTableHeader: string[] = [
    'Name',
    'Part Number',
    'label',
    'Starting Inventory',
    'Inventory Received',
    'On-hand',
    'Minumum Required',
  ];
  private PurchaseTableHeader: string[] = [
    'Name',
    'Date',
    'Received',
    'Supplier Name',
  ];
  private OrderTableHeader: string[] = [
    'Product Name',
    'Date',
    'Number Shipped',
    'First Name',
    'Last Name',
  ];
  private productTableData: any[] = [];
  private PurchaseTableData: any[] = [];
  private orderTableData: any[] = [];

  public getOrderTableHeader(): string[] {
    return this.OrderTableHeader;
  }
  public getOrderTableData(): any[] {
    return this.orderTableData;
  }
  public getPurchaseTableHeader(): string[] {
    return this.PurchaseTableHeader;
  }
  public getPurchaseTableData(): any[] {
    return this.PurchaseTableData;
  }

  public getProductTableHeader(): string[] {
    return this.productTableHeader;
  }
  public getProductTableData(): any[] {
    return this.productTableData;
  }

  private getPurchaseData(): void {
    this.inventoryService
      .getPurchases({ limit: this.limit, offset: this.offset })
      .subscribe((res: any[]) => {
        if (res.length > 0) {
          this.PurchaseTableData = res[1].map(
            ({
              productName,
              purchaseDate,
              received,
              supplierName,
            }: {
              productName: string;
              purchaseDate: string;
              received: number;
              supplierName: string;
            }) => {
              return { productName, purchaseDate, received, supplierName };
            }
          );
        }
      });
  }
  private getOrderData(): void {
    this.inventoryService
      .getOrders({ limit: this.limit, offset: this.offset })
      .subscribe((res: any[]) => {
        if (res.length > 0) {
          console.log(res[1]);
          this.orderTableData = res[1].map(
            ({
              productName,
              orderDate,
              shipped,
              firstName,
              lastName,
            }: {
              productName: string;
              orderDate: string;
              shipped: number;
              firstName: string;
              lastName: string;
            }) => {
              return { productName, orderDate, shipped, firstName, lastName };
            }
          );
        }
      });
  }

  private getProductData(): void {
    this.inventoryService
      .getProducts({ limit: this.limit, offset: this.offset })
      .subscribe((res: any[]) => {
        if (res.length > 0) {
          this.productTableData = res[1].map(
            ({
              name,
              part,
              label,
              start,
              received,
              onHand,
              minimum,
            }: {
              name: string;
              part: string;
              label: string;
              start: number;
              received: number;
              onHand: number;
              minimum: number;
            }) => {
              return { name, part, label, start, received, onHand, minimum };
            }
          );
        }
      });
  }

  ngOnInit(): void {
    this.getProductData();
    this.getPurchaseData();
    this.getOrderData();
  }
}
