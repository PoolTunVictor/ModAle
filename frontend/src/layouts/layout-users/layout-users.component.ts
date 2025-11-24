import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../../app/shared/header/header.component';
import { FooterComponent } from '../../app/shared/footer/footer.component';

@Component({
  selector: 'app-user-layout',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './layout-users.component.html',
  styleUrls: ['./layout-users.component.css']
})
export class UserLayoutComponent {}
