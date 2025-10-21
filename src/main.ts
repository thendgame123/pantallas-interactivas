import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { APP_INITIALIZER, ApplicationConfig } from '@angular/core';
import { routes } from './app/app.routes';
import { InactivityService } from './service/inactividad.service';
import { App } from './app/app';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    {
      provide: APP_INITIALIZER,
      useFactory: (inactivityService: InactivityService) => () => {
        inactivityService.startWatching();
      },
      deps: [InactivityService],
      multi: true
    }
  ]
};

bootstrapApplication(App, appConfig)
  .catch(err => console.error(err));