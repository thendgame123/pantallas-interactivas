import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, fromEvent, merge } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class InactivityService {
  private inactivityTimer: any;
  private readonly INACTIVITY_TIME = 30000; // 30 segundos
  private isScreenSaverActive = false;
  private screenSaverSubject = new Subject<boolean>();
  
  screenSaverActive$ = this.screenSaverSubject.asObservable();

  constructor(
    private router: Router,
    private ngZone: NgZone
  ) {}

  startWatching(): void {
    this.ngZone.runOutsideAngular(() => {
      // Eventos de actividad del usuario
      const events$ = merge(
        fromEvent(document, 'mousemove'),
        fromEvent(document, 'mousedown'),
        fromEvent(document, 'keypress'),
        fromEvent(document, 'scroll'),
        fromEvent(document, 'touchstart'),
        fromEvent(document, 'click')
      );

      events$.pipe(
        debounceTime(300)
      ).subscribe(() => {
        this.resetTimer();
      });
    });

    this.resetTimer();
  }

  stopWatching(): void {
    this.clearTimer();
  }

  private resetTimer(): void {
    // No reiniciar si el screensaver está activo
    if (this.isScreenSaverActive) {
      return;
    }

    this.clearTimer();
    
    this.inactivityTimer = setTimeout(() => {
      this.activateScreenSaver();
    }, this.INACTIVITY_TIME);
  }

  private clearTimer(): void {
    if (this.inactivityTimer) {
      clearTimeout(this.inactivityTimer);
    }
  }

  private activateScreenSaver(): void {
    // Solo activar si no estamos ya en el screensaver
    const currentUrl = this.router.url;
    if (!currentUrl.includes('/screen-saver')) {
      this.isScreenSaverActive = true;
      this.screenSaverSubject.next(true);
      this.ngZone.run(() => {
        this.router.navigate(['/screen-saver']);
      });
    }
  }

  deactivateScreenSaver(): void {
    this.isScreenSaverActive = false;
    this.screenSaverSubject.next(false);
    this.resetTimer();
  }

  isActive(): boolean {
    return this.isScreenSaverActive;
  }
}