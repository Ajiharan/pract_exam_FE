import { Component, OnInit } from '@angular/core';
import { InventoryService } from '../services/inventory.service';

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.scss'],
})
export class PurchaseComponent implements OnInit {
  public offset = 0;
  public limit = 5;
  public count = 10;
  private productName: string = '';
  private PurchaseTableHeader: string[] = [
    'Name',
    'Date',
    'Received',
    'Supplier Name',
  ];
  private PurchaseTableData: any[] = [];
  public getPurchaseTableHeader(): string[] {
    return this.PurchaseTableHeader;
  }
  public getPurchaseTableData(): any[] {
    return this.PurchaseTableData;
  }
  constructor(private inventoryService: InventoryService) {}
  private getPurchaseData(): void {
    this.inventoryService
      .getPurchases(
        { limit: this.limit, offset: this.offset },
        this.productName
      )
      .subscribe((res: any[]) => {
        if (res.length > 0) {
          this.count = res[0];
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
  ngOnInit(): void {
    this.getPurchaseData();
  }
  public paginationFunc(event: any) {
    this.limit = event.pageSize;
    this.offset = event.pageIndex * event.pageSize;
    this.getPurchaseData();
  }
  public onNameChangeFunc(name: string) {
    this.productName = name;
    this.getPurchaseData();
  }
}
