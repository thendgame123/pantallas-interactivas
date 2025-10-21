import { Component, OnInit, ViewChild, ElementRef, OnDestroy, inject  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriasService,Categoria } from '../../../service/categoria.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-categorias',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './nav-categorias.html',
  styleUrl: './nav-categorias.scss'
})
export class NavCategoriasComponent implements OnInit, OnDestroy {
  @ViewChild('sliderContainer') sliderContainer!: ElementRef;
  
  categorias: Categoria[] = [];
  categoriasExtendidas: Categoria[] = [];
  isLoading: boolean = true;
  isSliderVisible: boolean = true;
  
  private router = inject(Router)
  private autoScrollInterval: any;
  private isDragging: boolean = false;
  private startX: number = 0;
  private scrollLeft: number = 0;

  constructor(private categoriasService: CategoriasService) {}

  ngOnInit(): void {
    this.loadCategorias();
  }

  ngOnDestroy(): void {
    this.stopAutoScroll();
  }

  loadCategorias(): void {
    this.isLoading = true;
    this.categoriasService.getCategorias().subscribe({
      next: (data) => {
        this.categorias = data;
        // Duplicar las categorías para crear el efecto de loop infinito
        this.categoriasExtendidas = [...data, ...data, ...data];
        this.isLoading = false;
        setTimeout(() => this.initializeSlider(), 100);
      },
      error: (error) => {
        console.error('Error al cargar categorías:', error);
        this.isLoading = false;
      }
    });
  }

  initializeSlider(): void {
    const container = this.sliderContainer.nativeElement;
    // Posicionar en el medio del scroll para permitir scroll infinito
    const middlePosition = (container.scrollWidth - container.clientWidth) / 2;
    container.scrollLeft = middlePosition;
    this.startAutoScroll();
  }

  startAutoScroll(): void {
    this.stopAutoScroll();
    this.autoScrollInterval = setInterval(() => {
      if (!this.isDragging && this.isSliderVisible) {
        this.checkAndResetScroll();
      }
    }, 50);
  }

  stopAutoScroll(): void {
    if (this.autoScrollInterval) {
      clearInterval(this.autoScrollInterval);
    }
  }

  checkAndResetScroll(): void {
    const container = this.sliderContainer.nativeElement;
    const maxScroll = container.scrollWidth - container.clientWidth;
    const currentScroll = container.scrollLeft;
    
    // Si llega al final, reiniciar al inicio
    if (currentScroll >= maxScroll - 10) {
      const resetPosition = (container.scrollWidth / 3);
      container.scrollLeft = resetPosition;
    }
    
    // Si llega al inicio, saltar al medio
    if (currentScroll <= 10) {
      const resetPosition = (container.scrollWidth / 3) * 2;
      container.scrollLeft = resetPosition;
    }
  }

  onCategoriaClick(categoria: Categoria): void {
    console.log('Categoría seleccionada:', categoria);
    this.router.navigate(['/panel/categoria', categoria.id]);
  }

  toggleSliderVisibility(): void {
    this.isSliderVisible = !this.isSliderVisible;
    
    if (!this.isSliderVisible) {
      this.stopAutoScroll();
    } else {
      this.startAutoScroll();
    }
  }

  // Eventos para el drag manual del slider
  onMouseDown(event: MouseEvent): void {
    this.isDragging = true;
    const container = this.sliderContainer.nativeElement;
    this.startX = event.pageX - container.offsetLeft;
    this.scrollLeft = container.scrollLeft;
    container.style.cursor = 'grabbing';
  }

  onMouseLeave(): void {
    this.isDragging = false;
    const container = this.sliderContainer.nativeElement;
    container.style.cursor = 'grab';
  }

  onMouseUp(): void {
    this.isDragging = false;
    const container = this.sliderContainer.nativeElement;
    container.style.cursor = 'grab';
  }

  onMouseMove(event: MouseEvent): void {
    if (!this.isDragging) return;
    event.preventDefault();
    const container = this.sliderContainer.nativeElement;
    const x = event.pageX - container.offsetLeft;
    const walk = (x - this.startX) * 2;
    container.scrollLeft = this.scrollLeft - walk;
    this.checkAndResetScroll();
  }

  onTouchStart(event: TouchEvent): void {
    this.isDragging = true;
    const container = this.sliderContainer.nativeElement;
    this.startX = event.touches[0].pageX - container.offsetLeft;
    this.scrollLeft = container.scrollLeft;
  }

  onTouchEnd(): void {
    this.isDragging = false;
  }

  onTouchMove(event: TouchEvent): void {
    if (!this.isDragging) return;
    const container = this.sliderContainer.nativeElement;
    const x = event.touches[0].pageX - container.offsetLeft;
    const walk = (x - this.startX) * 2;
    container.scrollLeft = this.scrollLeft - walk;
    this.checkAndResetScroll();
  }
}
