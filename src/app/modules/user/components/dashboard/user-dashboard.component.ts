import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { RouterOutlet ,Router} from "@angular/router";
import { StorageService } from "../../../../auth/services/storage.service";

 

@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  template: `
    <!-- Navbar -->
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
      <div class="container-fluid">
        <a class="navbar-brand" routerLink="/user/dashboard">Bank Portal</a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <a class="nav-link" routerLink="/user/useraccount">Accounts</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" routerLink="/user/usercustomer">Customers</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" routerLink="/user/userpayment">Payments</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" routerLink="/user/userfeedback">Feedback</a>
            </li>
          </ul>
          <button class="btn btn-outline-light" (click)="logout()">Logout</button>
        </div>
      </div>
    </nav>

    <!-- Hero Section -->
    <section class="container text-center my-5">
      <h1 class="mb-3">Welcome to Your Dashboard</h1>
      <p class="lead">
        Manage your accounts, customers, payments, and feedback in one place.
      </p>
      <img
        src="https://via.placeholder.com/800x300"
        class="img-fluid rounded shadow mt-4"
        alt="Dashboard Banner"
      />
    </section>

    <!-- Router Content -->
    <div class="container mt-4">
      <router-outlet></router-outlet>
    </div>

    <!-- Footer -->
    <footer class="bg-dark text-white text-center py-3 mt-5">
      <p class="mb-0">&copy; 2025 Bank Portal. All Rights Reserved.</p>
    </footer>
  `,
  styles: [``],
})
export class UserDashboardComponent {
  constructor(
    private readonly router: Router,
    private readonly storageService: StorageService
  ) {}

  logout() {
    console.log('User logged out');
    this.storageService.logout(); // ✅ injected service, not static
    this.router.navigateByUrl('/login');
  }
}
