import { Routes } from '@angular/router';
import { PanelComponent } from './main/panel/panel';
import { ContenidosComponent } from './pages/contenidos/contenidos';
import { DetalleContenidoComponent } from './pages/detalle-contenido/detalle-contenido';
import { ScreenSaver } from './layouts/screen-saver/screen-saver';

export const routes: Routes = [
  {
    path: 'screen-saver',
    component: ScreenSaver
  },
    {
        path: 'panel',
        component: PanelComponent,
        children: [
            { path: 'categoria/:id', component: ContenidosComponent},
            { path: 'detalle-contenido/:id',component: DetalleContenidoComponent }
        ]
    },
      {
    path: '**',
    redirectTo: 'panel'
  }

];
