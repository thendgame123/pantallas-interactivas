
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet, NavigationEnd } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { filter, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Subject, Subscription } from 'rxjs';
import { NavCategoriasComponent } from '../../pages/nav-categorias/nav-categorias';
import { ContenidosService } from '../../../service/contenido.service';
import { Contenido } from '../../models/contenido.models';


@Component({
  selector: 'app-panel',
  standalone: true,
  imports: [CommonModule,RouterOutlet,NavCategoriasComponent,FormsModule],
  templateUrl: './panel.html',
  styleUrl: './panel.scss'
})
export class PanelComponent {
  searchQuery: string = '';
  showHomeContent: boolean = true;
  showSearchBar: boolean = true;
  isContentDetailView: boolean = false;
  
  // Búsqueda
  isSearching: boolean = false;
  searchResults: Contenido[] = [];
  showSearchResults: boolean = false;
  private searchSubject = new Subject<string>();
  private searchSubscription?: Subscription;

  constructor(
    private router: Router,
    private contenidosService: ContenidosService
  ) {}

  ngOnInit(): void {
    // Detectar cambios de ruta
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      const url = event.url;
      
      this.showHomeContent = url === '/' || url === '';
      this.isContentDetailView = url.includes('/panel/detalle-contenido/');
      this.showSearchBar = !this.isContentDetailView;
      
      // Limpiar búsqueda al cambiar de ruta
      if (url !== '/' && url !== '') {
        this.clearSearch();
      }
    });

    // Verificar la ruta inicial
    const currentUrl = this.router.url;
    this.showHomeContent = currentUrl === '/' || currentUrl === '';
    this.isContentDetailView = currentUrl.includes('/panel/detalle-contenido/');
    this.showSearchBar = !this.isContentDetailView;

    // Configurar búsqueda en tiempo real con debounce
    this.searchSubscription = this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(searchTerm => {
      this.performSearch(searchTerm);
    });
  }

  ngOnDestroy(): void {
    if (this.searchSubscription) {
      this.searchSubscription.unsubscribe();
    }
  }

  onSearch(): void {
    if (this.searchQuery.trim()) {
      this.searchSubject.next(this.searchQuery.trim());
    }
  }

  onSearchInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchQuery = input.value;
    
    if (this.searchQuery.trim().length > 0) {
      this.searchSubject.next(this.searchQuery.trim());
    } else {
      this.clearSearch();
    }
  }

  performSearch(searchTerm: string): void {
    this.isSearching = true;
    this.showSearchResults = true;
    this.showHomeContent = false;

    this.contenidosService.searchContenidos(searchTerm).subscribe({
      next: (contenidos) => {
        this.searchResults = contenidos;
        this.isSearching = false;
      },
      error: (error) => {
        console.error('Error al buscar contenidos:', error);
        this.isSearching = false;
        this.searchResults = [];
      }
    });
  }

  clearSearch(): void {
    this.searchQuery = '';
    this.searchResults = [];
    this.showSearchResults = false;
    this.isSearching = false;
    
    // Restaurar vista home si estamos en la raíz
    if (this.router.url === '/' || this.router.url === '') {
      this.showHomeContent = true;
    }
  }

  onContenidoClick(contenido: Contenido): void {
    this.router.navigate(['/panel/detalle-contenido/', contenido.id]);
  }

  getImagePlaceholder(event: Event): void {
    const target = event.target as HTMLImageElement;
    target.src = 'assets/images/placeholder.jpg';
  }
}
