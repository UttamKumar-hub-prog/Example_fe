import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { Router, NavigationEnd } from "@angular/router";
import { filter } from "rxjs/operators";
import { StorageService } from "../../../../auth/services/storage.service";
import { MaterialModule } from "../../../../material.module";
import { AdminNavComponent } from "../admin-nav/admin-nav.component";
import { AdminRoutingModule } from "../../admin-routing.module";

@Component({
  selector: "app-dashboard",
  standalone: true,
  imports: [CommonModule, MaterialModule, AdminNavComponent, AdminRoutingModule],
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"],
})
export class AdminDashboardComponent {
  isAdminLoggedIn = StorageService.isAdminLoggedIn();

  constructor(public readonly router: Router) {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.isAdminLoggedIn = StorageService.isAdminLoggedIn();
      });
  }

  logout() {
    StorageService.logout();
    this.router.navigateByUrl("/login");
  }
}
