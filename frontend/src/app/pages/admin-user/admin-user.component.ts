import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../core/service/usuario/usuario.service';
import { Usuario } from '../../core/models/user.models';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-admin-user',
  templateUrl: './admin-user.component.html',
  styleUrls: ['./admin-user.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule],
})
export class AdminUsersComponent implements OnInit {

  usuarios: Usuario[] = [];

  constructor(private usuarioService: UsuarioService) {}

  ngOnInit(): void {
    this.usuarioService.getUsuarios().subscribe({
      next: (data: Usuario[]) => {
        console.log("Usuarios recibidos:", data);
        this.usuarios = data;
      },
      error: (err: any) => {
        console.error('Error cargando usuarios:', err);
      }
    });
  }
}
