import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CustomerApi } from '../../../../core/customer.api';
import { Customer } from '../../../../core/models';
import { MaterialModule } from '../../../../material.module';

@Component({
  selector: 'app-users-customers',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MaterialModule],
  template: `
    <section *ngIf="creating" class="create-customer-container">
      <h4>Create Customer</h4>
      <form [formGroup]="form" (ngSubmit)="submit()">
        <div class="form-fields">
          <mat-form-field appearance="outline">
            <mat-label>Name</mat-label>
            <input matInput formControlName="name" />
          </mat-form-field>

          <mat-form-field appearance="outline">
            <mat-label>Email</mat-label>
            <input matInput formControlName="email" />
          </mat-form-field>

          <mat-form-field appearance="outline">
            <mat-label>Phone</mat-label>
            <input matInput formControlName="phone" />
          </mat-form-field>

          <mat-form-field class="w-100" appearance="outline">
            <mat-label>Address</mat-label>
            <input matInput formControlName="address" />
          </mat-form-field>

          <mat-form-field appearance="outline">
            <mat-label>Aadhaar</mat-label>
            <input matInput formControlName="aadhaar" />
          </mat-form-field>

          <mat-form-field appearance="outline">
            <mat-label>PAN</mat-label>
            <input matInput formControlName="pan" />
          </mat-form-field>

          <mat-form-field appearance="outline">
            <mat-label>Age</mat-label>
            <input matInput type="number" formControlName="age" />
          </mat-form-field>

          <mat-form-field appearance="outline">
            <mat-label>Gender</mat-label>
            <mat-select formControlName="gender">
              <mat-option value="MALE">Male</mat-option>
              <mat-option value="FEMALE">Female</mat-option>
              <mat-option value="OTHER">Other</mat-option>
            </mat-select>
          </mat-form-field>

          <mat-form-field appearance="outline">
            <mat-label>KYC Status</mat-label>
            <mat-select formControlName="kycStatus">
              <mat-option value="PENDING">Pending</mat-option>
              <mat-option value="VERIFIED">Verified</mat-option>
              <mat-option value="REJECTED">Rejected</mat-option>
            </mat-select>
          </mat-form-field>

          <mat-form-field appearance="outline">
            <mat-label>Account Type</mat-label>
            <mat-select formControlName="accountType">
              <mat-option value="SAVINGS">Savings</mat-option>
              <mat-option value="CURRENT">Current</mat-option>
              <mat-option value="FIXED">Fixed</mat-option>
            </mat-select>
          </mat-form-field>

          <button mat-raised-button color="primary" [disabled]="form.invalid">
            Save
          </button>
        </div>
      </form>
    </section>
  `,
  styles: [
    `
      .create-customer-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        margin-top: 24px;
      }

      .form-fields {
        display: flex;
        flex-wrap: wrap;
        gap: 16px;
        justify-content: center;
        max-width: 800px;
      }

      .w-100 {
        flex: 1 1 100%;
      }
    `,
  ],
})
export class UserCustomerComponent implements OnInit {
  private api = inject(CustomerApi);

  creating = true;

  form = inject(FormBuilder).group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', Validators.required],
    address: ['', Validators.required],
    aadhaar: ['', [Validators.pattern(/^[0-9]{12}$/)]],
    pan: ['', [Validators.pattern(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/)]],
    age: [null],
    gender: [''],
    kycStatus: [''],
    accountType: [''],
  });

  ngOnInit() {}

  submit() {
    if (this.form.valid) {
      this.api.create(this.form.value as Partial<Customer>).subscribe(() => {
        this.creating = false;
        this.form.reset();
      });
    }
  }
}
