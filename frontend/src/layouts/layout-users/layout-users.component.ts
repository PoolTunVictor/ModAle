import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../../app/shared/header/header.component';

@Component({
  selector: 'app-user-layout',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './layout-users.component.html',
  styleUrls: ['./layout-users.component.css']
})
export class UserLayoutComponent {}
