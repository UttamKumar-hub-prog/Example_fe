import { Component, OnInit, inject } from '@angular/core';
import { AccountApi } from '../../../../core/account.api';
import { Account } from '../../../../core/models';
import { MaskAadhaarPipe, MaskPanPipe } from '../../../../core/mask.pipes';
import { MaterialModule } from '../../../../material.module';
import { CommonModule, DecimalPipe } from '@angular/common';
import { StorageService } from '../../../../auth/services/storage.service';

@Component({
  selector: 'app-users-accounts',
  template: `
    <h3>My Account</h3>

    <!-- ✅ If account exists -->
    <table mat-table [dataSource]="[account]" class="mat-elevation-z2" *ngIf="account">
      <ng-container matColumnDef="id">
        <th mat-header-cell *matHeaderCellDef>ID</th>
        <td mat-cell *matCellDef="let r">{{ r.id }}</td>
      </ng-container>

      <ng-container matColumnDef="accNo">
        <th mat-header-cell *matHeaderCellDef>Acc No</th>
        <td mat-cell *matCellDef="let r">{{ r.accNo }}</td>
      </ng-container>

      <ng-container matColumnDef="username">
        <th mat-header-cell *matHeaderCellDef>Username</th>
        <td mat-cell *matCellDef="let r">{{ r.username }}</td>
      </ng-container>

      <ng-container matColumnDef="aadhaar">
        <th mat-header-cell *matHeaderCellDef>Aadhaar</th>
        <td mat-cell *matCellDef="let r">{{ r.aadhaar | maskAadhaar }}</td>
      </ng-container>

      <ng-container matColumnDef="pan">
        <th mat-header-cell *matHeaderCellDef>PAN</th>
        <td mat-cell *matCellDef="let r">{{ r.pan | maskPan }}</td>
      </ng-container>

      <ng-container matColumnDef="bankType">
        <th mat-header-cell *matHeaderCellDef>Bank Type</th>
        <td mat-cell *matCellDef="let r">{{ r.bankType }}</td>
      </ng-container>

      <ng-container matColumnDef="balance">
        <th mat-header-cell *matHeaderCellDef>Balance</th>
        <td mat-cell *matCellDef="let r">{{ r.balance | number:'1.0-0' }}</td>
      </ng-container>

      <ng-container matColumnDef="loan">
        <th mat-header-cell *matHeaderCellDef>Loan</th>
        <td mat-cell *matCellDef="let r">{{ r.loan | number:'1.0-0' }}</td>
      </ng-container>

      <ng-container matColumnDef="address">
        <th mat-header-cell *matHeaderCellDef>Address</th>
        <td mat-cell *matCellDef="let r">{{ r.address }}</td>
      </ng-container>

      <tr mat-header-row *matHeaderRowDef="displayed"></tr>
      <tr mat-row *matRowDef="let row; columns: displayed;"></tr>
    </table>

    <!-- ✅ If no account -->
    <p *ngIf="!account">No account found for this user.</p>
  `,
  imports: [
    MaskAadhaarPipe,
    MaskPanPipe,
    MaterialModule,
    DecimalPipe,
    CommonModule,
  ],
  standalone: true
})
export class UsersAccountsComponent implements OnInit {
  private readonly api = inject(AccountApi);

  account?: Account;
  displayed = ['id', 'accNo', 'username', 'aadhaar', 'pan', 'bankType', 'balance', 'loan', 'address'];

  ngOnInit() {
    const user = StorageService.getUser(); // 👈 contains {id, username}
    if (user?.id) {
      this.loadCustomerInfo(user.id);
    }
  }

  loadCustomerInfo(id: number) {
    this.api.getCustomerInfo(id).subscribe({
      next: (res) => (this.account = res),
      error: () => (this.account = undefined), // if not found → show message
    });
  }
}
