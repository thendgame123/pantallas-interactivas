import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ContenidosService } from '../../../service/contenido.service';
import { CategoriasService,Categoria } from '../../../service/categoria.service';
import { Contenido } from '../../models/contenido.models';


@Component({
  selector: 'app-contenidos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contenidos.html',
  styleUrl: './contenidos.scss'
})
export class ContenidosComponent {
  contenidos: Contenido[] = [];
  categoria?: Categoria;
  isLoading: boolean = true;
  categoryId: number = 0;

  constructor(
    private route: ActivatedRoute,
    private contenidosService: ContenidosService,
    private categoriasService: CategoriasService,
    private router : Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.categoryId = +params['id'];
      this.loadCategoria();
      this.loadContenidos();
    });
  }

  loadCategoria(): void {
    this.categoriasService.getCategoriaById(this.categoryId).subscribe({
      next: (categoria) => {
        this.categoria = categoria;
      },
      error: (error) => {
        console.error('Error al cargar categoría:', error);
      }
    });
  }

  loadContenidos(): void {
    this.isLoading = true;
    this.contenidosService.getContenidosByCategoria(this.categoryId).subscribe({
      next: (contenidos) => {
        this.contenidos = contenidos;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error al cargar contenidos:', error);
        this.isLoading = false;
      }
    });
  }

  onContenidoClick(contenido: Contenido): void {
    console.log('Contenido seleccionado:', contenido);
    this.router.navigate(['/panel/detalle-contenido', contenido.id]);
  }

  getImagePlaceholder(event: Event): void {
    const target = event.target as HTMLImageElement;
    target.src = 'assets/images/placeholder.jpg';
  }
}
