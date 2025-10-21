
import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Contenido } from '../../models/contenido.models';

@Component({
  selector: 'app-layout-video',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './layout-video.html',
  styleUrl: './layout-video.scss'
})
export class LayoutVideo {
 @Input() contenido!: Contenido;
  safeVideoUrl?: SafeResourceUrl;

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    if (this.contenido.videoUrl) {
      this.safeVideoUrl = this.getEmbedUrl(this.contenido.videoUrl);
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
}
