import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Contenido } from '../../models/contenido.models';

@Component({
  selector: 'app-layout-izquierda',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './layout-izquierda.html',
  styleUrl: './layout-izquierda.scss'
})
export class LayoutIzquierda {
  @Input() contenido!: Contenido;
  safeVideoUrl?: SafeResourceUrl;
  safePdfUrl?: SafeResourceUrl;
  showPdfModal: boolean = false;

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    if (this.contenido.type === 'video' && this.contenido.videoUrl) {
      this.safeVideoUrl = this.getEmbedUrl(this.contenido.videoUrl);
    }
    
    if (this.contenido.type === 'pdf' && this.contenido.pdfUrl) {
      this.safePdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.contenido.pdfUrl);
    }
  }

  getEmbedUrl(url: string): SafeResourceUrl {
    // Convertir URL de YouTube a formato embed con autoplay
    if (url.includes('youtube.com/watch')) {
      const videoId = url.split('v=')[1]?.split('&')[0];
      const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=0&controls=1&rel=0`;
      return this.sanitizer.bypassSecurityTrustResourceUrl(embedUrl);
    } else if (url.includes('youtu.be/')) {
      const videoId = url.split('youtu.be/')[1]?.split('?')[0];
      const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=0&controls=1&rel=0`;
      return this.sanitizer.bypassSecurityTrustResourceUrl(embedUrl);
    }
    
    // Para videos locales
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  getImagePlaceholder(event: Event): void {
    const target = event.target as HTMLImageElement;
    target.src = 'assets/images/placeholder.jpg';
  }

  openPdfModal(): void {
    this.showPdfModal = true;
    // Prevenir scroll en body cuando el modal está abierto
    document.body.style.overflow = 'hidden';
  }

  closePdfModal(): void {
    this.showPdfModal = false;
    // Restaurar scroll en body
    document.body.style.overflow = 'auto';
  }

  downloadPdf(): void {
    if (this.contenido.pdfUrl) {
      const link = document.createElement('a');
      link.href = this.contenido.pdfUrl;
      link.download = `${this.contenido.title}.pdf`;
      link.click();
    }
  }
}
