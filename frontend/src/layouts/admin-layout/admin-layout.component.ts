import { Component } from '@angular/core';
import { HeaderAdminComponent } from '../../app/shared/header-admin/header-admin.component';
import { FooterAdminComponent } from '../../app/shared/footer-admin/footer-admin.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.css'],
  standalone: true,
  imports: [
    HeaderAdminComponent,
    FooterAdminComponent,
    RouterModule
  ]
})
export class AdminLayoutComponent {}
