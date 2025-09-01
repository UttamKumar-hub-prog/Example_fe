import { Component, OnInit, inject } from '@angular/core';
import { AuditApi } from '../../../../core/audit.api';
import { AuditLog } from '../../../../core/models';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../../material.module';

@Component({
  selector: 'app-users-audits',
  standalone: true,
  imports: [CommonModule, MaterialModule, ReactiveFormsModule],
  template: `
    <div class="container mt-4">
      <div class="card shadow p-4">
        <h3 class="text-center text-primary mb-3">📜 Audit Logs</h3>

        <!-- Filters -->
        <form (ngSubmit)="load()" class="row g-3 align-items-end">
          <div class="col-md-3">
            <mat-form-field appearance="outline" class="w-100">
              <mat-label>Service</mat-label>
              <input matInput [formControl]="serviceName" />
            </mat-form-field>
          </div>

          <div class="col-md-3">
            <mat-form-field appearance="outline" class="w-100">
              <mat-label>Action</mat-label>
              <input matInput [formControl]="action" />
            </mat-form-field>
          </div>

          <div class="col-md-2">
            <mat-form-field appearance="outline" class="w-100">
              <mat-label>Status</mat-label>
              <input matInput [formControl]="status" />
            </mat-form-field>
          </div>

          <div class="col-md-2">
            <mat-form-field appearance="outline" class="w-100">
              <mat-label>User ID</mat-label>
              <input matInput type="number" [formControl]="userId" />
            </mat-form-field>
          </div>

          <div class="col-md-2 text-center">
            <button mat-raised-button color="primary" class="w-100">
              🔍 Search
            </button>
          </div>
        </form>

        <!-- Table -->
        <div class="table-responsive mt-4">
          <table
            mat-table
            [dataSource]="data"
            class="mat-elevation-z2 table table-bordered table-hover"
          >
            <ng-container matColumnDef="createdAt">
              <th mat-header-cell *matHeaderCellDef>At</th>
              <td mat-cell *matCellDef="let r">
                {{ r.createdAt | date : 'short' }}
              </td>
            </ng-container>

            <ng-container matColumnDef="serviceName">
              <th mat-header-cell *matHeaderCellDef>Service</th>
              <td mat-cell *matCellDef="let r">{{ r.serviceName }}</td>
            </ng-container>

            <ng-container matColumnDef="action">
              <th mat-header-cell *matHeaderCellDef>Action</th>
              <td mat-cell *matCellDef="let r">{{ r.action }}</td>
            </ng-container>

            <ng-container matColumnDef="status">
              <th mat-header-cell *matHeaderCellDef>Status</th>
              <td mat-cell *matCellDef="let r">{{ r.status }}</td>
            </ng-container>

            <ng-container matColumnDef="userId">
              <th mat-header-cell *matHeaderCellDef>User</th>
              <td mat-cell *matCellDef="let r">{{ r.userId }}</td>
            </ng-container>

            <ng-container matColumnDef="amount">
              <th mat-header-cell *matHeaderCellDef>Amount</th>
              <td mat-cell *matCellDef="let r">{{ r.amount }}</td>
            </ng-container>

            <ng-container matColumnDef="remarks">
              <th mat-header-cell *matHeaderCellDef>Remarks</th>
              <td mat-cell *matCellDef="let r">{{ r.remarks }}</td>
            </ng-container>

            <tr mat-header-row *matHeaderRowDef="displayed"></tr>
            <tr mat-row *matRowDef="let row; columns: displayed"></tr>
          </table>
        </div>
      </div>
    </div>
  `,
})
export class UsersAuditsComponent implements OnInit {
  private readonly api = inject(AuditApi);
  data: AuditLog[] = [];
  displayed = [
    'createdAt',
    'serviceName',
    'action',
    'status',
    'userId',
    'amount',
    'remarks',
  ];

  serviceName = inject(FormBuilder).control('');
  action = inject(FormBuilder).control('');
  status = inject(FormBuilder).control('');
  userId = inject(FormBuilder).control<number | null>(null);

  ngOnInit() {
    this.load();
  }

  load() {
    this.api
      .getAll({
        serviceName: this.serviceName.value || undefined,
        action: this.action.value || undefined,
        status: this.status.value || undefined,
        userId: this.userId.value ?? undefined,
      })
      .subscribe((res) => (this.data = Array.isArray(res) ? res : res.content));
  }
}
