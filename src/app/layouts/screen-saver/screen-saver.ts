import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ContenidosService } from '../../../service/contenido.service';
import { InactivityService } from '../../../service/inactividad.service';
import { Contenido } from '../../models/contenido.models';

@Component({
  selector: 'app-screen-saver',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './screen-saver.html',
  styleUrl: './screen-saver.scss'
})
export class ScreenSaver {
 contenidosProtector: Contenido[] = [];
  currentIndex: number = 0;
  currentContenido?: Contenido;
  safeVideoUrl?: SafeResourceUrl;
  
  private slideInterval: any;
  private readonly SLIDE_DURATION = 15000; // 15 segundos para contenidos con imagen
  private videoEnded: boolean = false;

  constructor(
    private contenidosService: ContenidosService,
    private router: Router,
    private sanitizer: DomSanitizer,
    private inactivityService: InactivityService
  ) {}

  ngOnInit(): void {
    this.loadScreenSaverContent();
  }

  ngOnDestroy(): void {
    this.stopSlideshow();
  }

  loadScreenSaverContent(): void {
    this.contenidosService.getContenidosProtector().subscribe({
      next: (contenidos) => {
        this.contenidosProtector = contenidos;
        if (this.contenidosProtector.length > 0) {
          this.showSlide(0);
          this.startSlideshow();
        }
      },
      error: (error) => {
        console.error('Error al cargar contenidos protector:', error);
      }
    });
  }

  startSlideshow(): void {
    // Para contenidos con video en layout 'video', esperar a que termine
    if (this.currentContenido?.layout === 'video' && this.currentContenido.type === 'video') {
      // No iniciar timer automático, esperar evento de video
      return;
    }
    
    this.slideInterval = setInterval(() => {
      this.nextSlide();
    }, this.SLIDE_DURATION);
  }

  stopSlideshow(): void {
    if (this.slideInterval) {
      clearInterval(this.slideInterval);
    }
  }

  showSlide(index: number): void {
    this.stopSlideshow();
    this.currentIndex = index;
    this.currentContenido = this.contenidosProtector[index];
    this.videoEnded = false;
    
    if (this.currentContenido && this.currentContenido.type === 'video' && this.currentContenido.videoUrl) {
      this.safeVideoUrl = this.getEmbedUrl(this.currentContenido.videoUrl);
    } else {
      this.safeVideoUrl = undefined;
    }
    
    // Reiniciar slideshow según el tipo de contenido
    this.startSlideshow();
  }

  nextSlide(): void {
    const nextIndex = (this.currentIndex + 1) % this.contenidosProtector.length;
    this.showSlide(nextIndex);
  }

  onVideoEnded(): void {
    // Cuando el video termina, pasar al siguiente slide
    this.videoEnded = true;
    setTimeout(() => {
      this.nextSlide();
    }, 1000); // 1 segundo de delay antes de cambiar
  }

  getEmbedUrl(url: string): SafeResourceUrl {
    const isVideoLayout = this.currentContenido?.layout === 'video';
    
    if (url.includes('youtube.com/watch')) {
      const videoId = url.split('v=')[1]?.split('&')[0];
      // Para layout video: autoplay con audio, sin loop, con controles ocultos
      // Para otros layouts: autoplay con mute, con loop
      const embedUrl = isVideoLayout 
        ? `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=0&controls=0&rel=0&enablejsapi=1`
        : `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=0&controls=1&rel=0&loop=1&playlist=${videoId}`;
      return this.sanitizer.bypassSecurityTrustResourceUrl(embedUrl);
    } else if (url.includes('youtu.be/')) {
      const videoId = url.split('youtu.be/')[1]?.split('?')[0];
      const embedUrl = isVideoLayout
        ? `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=0&controls=0&rel=0&enablejsapi=1`
        : `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=0&controls=1&rel=0&loop=1&playlist=${videoId}`;
      return this.sanitizer.bypassSecurityTrustResourceUrl(embedUrl);
    }
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  goToContent(): void {
    this.stopSlideshow();
    this.inactivityService.deactivateScreenSaver();
    if (this.currentContenido) {
      this.router.navigate(['/panel/detalle-contenido', this.currentContenido.id]);
    }
  }

  goToPanel(): void {
    this.stopSlideshow();
    this.inactivityService.deactivateScreenSaver();
    this.router.navigate(['/']);
  }

  getImagePlaceholder(event: Event): void {
    const target = event.target as HTMLImageElement;
    target.src = 'assets/images/placeholder.jpg';
  }
}
