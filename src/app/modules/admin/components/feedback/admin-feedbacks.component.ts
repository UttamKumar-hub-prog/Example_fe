import { Component, OnInit, inject } from '@angular/core';
import { FeedbackApi } from '../../../../core/feedback.api';
import { Feedback } from '../../../../core/models';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MaterialModule } from "../../../../material.module";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-users-feedbacks',
  template: `
   <h3 class="mb-3 text-center">Feedbacks</h3>

<div class="d-flex justify-content-between mb-3">
  <button mat-raised-button color="primary" (click)="toggleCreate()">New</button>
</div>

<div class="table-responsive">
  <table mat-table [dataSource]="data" class="table table-striped table-hover mat-elevation-z2">
    <ng-container matColumnDef="id">
      <th mat-header-cell *matHeaderCellDef class="text-center">ID</th>
      <td mat-cell *matCellDef="let r" class="text-center">{{ r.id }}</td>
    </ng-container>

    <ng-container matColumnDef="name">
      <th mat-header-cell *matHeaderCellDef>Name</th>
      <td mat-cell *matCellDef="let r">{{ r.name }}</td>
    </ng-container>

    <ng-container matColumnDef="email">
      <th mat-header-cell *matHeaderCellDef>Email</th>
      <td mat-cell *matCellDef="let r">{{ r.email }}</td>
    </ng-container>

    <ng-container matColumnDef="message">
      <th mat-header-cell *matHeaderCellDef>Message</th>
      <td mat-cell *matCellDef="let r">{{ r.message }}</td>
    </ng-container>

    <tr mat-header-row *matHeaderRowDef="displayed"></tr>
    <tr mat-row *matRowDef="let row; columns: displayed;"></tr>
  </table>
</div>

<section *ngIf="createMode" class="card shadow-sm p-4 mt-4">
  <h4 class="mb-3">Submit Feedback</h4>
  <form [formGroup]="form" (ngSubmit)="submit()">
    <div class="row g-3">
      <div class="col-md-4">
        <mat-form-field appearance="outline" class="w-100">
          <mat-label>Name</mat-label>
          <input matInput formControlName="name" placeholder="Enter your name">
        </mat-form-field>
      </div>

      <div class="col-md-4">
        <mat-form-field appearance="outline" class="w-100">
          <mat-label>Email</mat-label>
          <input matInput formControlName="email" placeholder="Enter your email">
        </mat-form-field>
      </div>

      <div class="col-md-12">
        <mat-form-field appearance="outline" class="w-100">
          <mat-label>Message</mat-label>
          <textarea matInput formControlName="message" rows="3" placeholder="Your feedback"></textarea>
        </mat-form-field>
      </div>
    </div>

    <div class="d-flex justify-content-end mt-3">
      <button mat-raised-button color="primary" [disabled]="form.invalid">Save</button>
    </div>
  </form>
</section>

  `,
  imports: [MaterialModule, ReactiveFormsModule, CommonModule],
  standalone: true
})
export class AdminFeedbacksComponent implements OnInit {
  private readonly api = inject(FeedbackApi);
  private readonly fb = inject(NonNullableFormBuilder); // ✅ ensures no nulls

  data: Feedback[] = [];
  displayed = ['id','name','email','message'];
  createMode = false;

  // ✅ form values always `string`
  form = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    message: ['', Validators.required],
  });

  ngOnInit() {
    this.load();
  }

  load() {
    this.api.getAll().subscribe(res => {
      this.data = Array.isArray(res) ? res : res.content;
    });
  }

  toggleCreate() {
    this.createMode = !this.createMode;
  }

  submit() {
    const feedback: Feedback = this.form.getRawValue(); // ✅ no `null`
    this.api.create(feedback).subscribe(() => {
      this.createMode = false;
      this.load();
    });
  }
}
