import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ContenidosService } from '../../../service/contenido.service';
import { Contenido } from '../../models/contenido.models';
import { LayoutIzquierda } from '../../layouts/layout-izquierda/layout-izquierda';
import { LayoutDerecha } from '../../layouts/layout-derecha/layout-derecha';
import { LayoutCentro } from '../../layouts/layout-centro/layout-centro';
import { LayoutVideo } from '../../layouts/layout-video/layout-video';

@Component({
  selector: 'app-detalle-contenido',
  standalone: true,
  imports: [CommonModule,LayoutIzquierda,LayoutDerecha,LayoutCentro,LayoutVideo],
  templateUrl: './detalle-contenido.html',
  styleUrl: './detalle-contenido.scss'
})
export class DetalleContenidoComponent {
  contenido?: Contenido;
  isLoading: boolean = true;
  contenidoId: number = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private contenidosService: ContenidosService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.contenidoId = +params['id'];
      this.loadContenido();
    });
  }

  loadContenido(): void {
    this.isLoading = true;
    this.contenidosService.getContenidoById(this.contenidoId).subscribe({
      next: (contenido) => {
        if (contenido) {
          this.contenido = contenido;
        } else {
          console.error('Contenido no encontrado');
          this.router.navigate(['/']);
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error al cargar contenido:', error);
        this.isLoading = false;
        this.router.navigate(['/']);
      }
    });
  }

  goBack(): void {
    if (this.contenido) {
      this.router.navigate(['/categoria', this.contenido.categoryId]);
    } else {
      this.router.navigate(['/']);
    }
  }
}
