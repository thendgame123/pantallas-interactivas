import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface Categoria {
  id: number;
  nombre: string;
  imagen: string;
  descripcion?: string;
}

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {
  
  private categoriasMock: Categoria[] = [
    {
      id: 1,
      nombre: 'Flota y Embarcaciones',
      imagen: 'assets/images/categorias/flota.jpg',
      descripcion: 'Información sobre la flota naval y embarcaciones'
    },
    {
      id: 2,
      nombre: 'Servicios Portuarios',
      imagen: 'assets/images/categorias/puertos.jpg',
      descripcion: 'Servicios y operaciones portuarias'
    },
    {
      id: 3,
      nombre: 'Seguridad y Salud Ocupacional',
      imagen: 'assets/images/categorias/seguridad.jpg',
      descripcion: 'Protocolos de seguridad y salud ocupacional'
    },
    {
      id: 4,
      nombre: 'Historia Naval',
      imagen: 'assets/images/categorias/historia.jpg',
      descripcion: 'Historia y tradición naval'
    },
    {
      id: 5,
      nombre: 'Navegación',
      imagen: 'assets/images/categorias/navegacion.jpg',
      descripcion: 'Técnicas y sistemas de navegación'
    },
    {
      id: 6,
      nombre: 'Logística y Carga',
      imagen: 'assets/images/categorias/logistica.jpg',
      descripcion: 'Gestión logística y manejo de carga'
    },
    {
      id: 7,
      nombre: 'Medio Ambiente Marino',
      imagen: 'assets/images/categorias/ambiente.jpg',
      descripcion: 'Conservación y protección del medio ambiente marino'
    }
  ];

  constructor() { }

  /**
   * Obtiene todas las categorías disponibles
   * @returns Observable con array de categorías
   */
  getCategorias(): Observable<Categoria[]> {
    // Simular delay de petición HTTP
    return of(this.categoriasMock);
  }

  /**
   * Obtiene una categoría por ID
   * @param id - ID de la categoría
   * @returns Observable con la categoría encontrada o undefined
   */
  getCategoriaById(id: number): Observable<Categoria | undefined> {
    const categoria = this.categoriasMock.find(cat => cat.id === id);
    return of(categoria);
  }
}