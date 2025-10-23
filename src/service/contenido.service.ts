import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Contenido } from '../app/models/contenido.models';

@Injectable({
  providedIn: 'root'
})
export class ContenidosService {

  private contenidosMock: Contenido[] = [
    // Servicios Portuarios (categoryId: 2)
    {
      id: 1,
      categoryId: 2,
      title: 'Operaciones de Atraque',
      subtitle: 'Procedimientos seguros de amarre',
      description: 'Procedimientos seguros de amarre y desembarque en puertos siguiendo protocolos internacionales para garantizar la seguridad de la carga y tripulación.',
      image: 'assets/images/contenidos/atraque.jpg',
      videoUrl: 'https://www.youtube.com/watch?v=_9dI6UTWoNg',
      type: 'video',
      layout: 'izquierda',
      protector: false
    },
    {
      id: 2,
      categoryId: 2,
      title: 'Manejo de Grúas',
      subtitle: 'Tecnología avanzada en equipos de carga',
      description: 'Tecnología avanzada en equipos de carga y descarga portuaria con operadores especializados en manejo de contenedores y cargas pesadas.',
      image: 'assets/images/contenidos/gruas.jpg',
      pdfUrl: 'assets/pdfs/manual-gruas.pdf',
      type: 'pdf',
      layout: 'derecha',
      protector: true
    },
    {
      id: 3,
      categoryId: 2,
      title: 'Servicios de Remolcadores',
      subtitle: 'Apoyo especializado para maniobras',
      description: 'Apoyo especializado para maniobras en zonas portuarias con embarcaciones de alta potencia para asistir buques de gran calado.',
      image: 'assets/images/contenidos/remolcadores.jpg',
      videoUrl: 'https://www.youtube.com/watch?v=_9dI6UTWoNg',
      type: 'video',
      layout: 'izquierda',
      protector: false
    },

    // Flota y Embarcaciones (categoryId: 1)
    {
      id: 4,
      categoryId: 1,
      title: 'Buques Portacontenedores',
      subtitle: 'Logística Global Moderna',
      description: 'Embarcaciones modernas para el transporte de carga en contenedores con capacidad de miles de TEUs. Nuestra flota de portacontenedores incorpora tecnología de punta en automatización y eficiencia energética, permitiendo conexiones rápidas y seguras entre los principales puertos del comercio internacional.',
      image: 'assets/images/contenidos/portacontenedores.jpg',
      pdfUrl: 'assets/pdfs/especificaciones-portacontenedores.pdf',
      type: 'pdf',
      layout: 'izquierda',
      protector: true
    },
    {
      id: 5,
      categoryId: 1,
      title: 'Buques Tanqueros',
      subtitle: 'Transporte seguro de líquidos',
      description: 'Flota especializada en el transporte de combustibles y químicos con sistemas de seguridad certificados internacionalmente.',
      image: 'assets/images/contenidos/tanqueros.jpg',
      videoUrl: 'https://www.youtube.com/watch?v=_9dI6UTWoNg',
      type: 'video',
      layout: 'derecha',
      protector: false
    },
    {
      id: 6,
      categoryId: 1,
      title: 'Embarcaciones de Apoyo',
      subtitle: 'Servicios auxiliares navales',
      description: 'Lanchas y embarcaciones menores para servicios de apoyo, inspección y transporte de personal en zonas portuarias.',
      image: 'assets/images/contenidos/apoyo.jpg',
      pdfUrl: 'assets/pdfs/catalogo-embarcaciones-apoyo.pdf',
      type: 'pdf',
      layout: 'centrado',
      protector: true
    },

    // Seguridad y Salud Ocupacional (categoryId: 3)
    {
      id: 7,
      categoryId: 3,
      title: 'Protocolos de Emergencia',
      subtitle: 'Respuesta ante situaciones críticas',
      description: 'Procedimientos establecidos para evacuación, control de incendios y rescate en situaciones de emergencia marítima.',
      image: 'assets/images/contenidos/emergencia.jpg',
      videoUrl: 'https://www.youtube.com/watch?v=_9dI6UTWoNg',
      type: 'video',
      layout: 'video',
      protector: true
    },
    {
      id: 8,
      categoryId: 3,
      title: 'Equipos de Protección Personal',
      subtitle: 'EPP certificado para tripulación',
      description: 'Uso correcto de equipos de protección personal incluyendo cascos, chalecos salvavidas, arneses y equipos de respiración.',
      image: 'assets/images/contenidos/epp.jpg',
      pdfUrl: 'assets/pdfs/guia-epp.pdf',
      type: 'pdf',
      layout: 'centrado',
      protector: false
    },
    {
      id: 9,
      categoryId: 3,
      title: 'Capacitación en Seguridad',
      subtitle: 'Programas de entrenamiento continuo',
      description: 'Programas de formación y actualización en normas de seguridad marítima internacional y prevención de accidentes.',
      image: 'assets/images/contenidos/capacitacion.jpg',
      type: 'image',
      layout: 'derecha',
      protector: false
    },

    // Historia Naval (categoryId: 4)
    {
      id: 10,
      categoryId: 4,
      title: 'Submarinos Históricos',
      subtitle: 'Evolución de la flota submarina',
      description: 'Historia y desarrollo de los submarinos desde sus inicios hasta las modernas unidades de propulsión nuclear.',
      image: 'assets/images/contenidos/submarinos.jpg',
      pdfUrl: 'assets/pdfs/historia-submarinos.pdf',
      type: 'pdf',
      layout: 'izquierda',
      protector: false
    },
    {
      id: 11,
      categoryId: 4,
      title: 'Grandes Batallas Navales',
      subtitle: 'Momentos decisivos en la historia',
      description: 'Documentación de las batallas navales más importantes que cambiaron el curso de la historia mundial.',
      image: 'assets/images/contenidos/batallas.jpg',
      videoUrl: 'https://www.youtube.com/watch?v=_9dI6UTWoNg',
      type: 'video',
      layout: 'video',
      protector: false
    },

    // Navegación (categoryId: 5)
    {
      id: 12,
      categoryId: 5,
      title: 'Sistemas GPS Marítimos',
      subtitle: 'Tecnología de posicionamiento global',
      description: 'Uso de sistemas de navegación satelital para posicionamiento preciso y seguridad en la navegación moderna.',
      image: 'assets/images/contenidos/gps.jpg',
      pdfUrl: 'assets/pdfs/manual-gps-maritimo.pdf',
      type: 'pdf',
      layout: 'izquierda',
      protector: false
    },
    {
      id: 13,
      categoryId: 5,
      title: 'Cartas Náuticas Digitales',
      subtitle: 'Navegación electrónica moderna',
      description: 'Implementación de cartas náuticas electrónicas (ENC) y sistemas de información geográfica para navegación segura.',
      image: 'assets/images/contenidos/cartas.jpg',
      videoUrl: 'https://www.youtube.com/watch?v=_9dI6UTWoNg',
      type: 'video',
      layout: 'centrado',
      protector: false
    },

    // Logística y Carga (categoryId: 6)
    {
      id: 14,
      categoryId: 6,
      title: 'Gestión de Contenedores',
      subtitle: 'Optimización de espacios',
      description: 'Sistemas de gestión y organización de contenedores para maximizar la capacidad de carga y eficiencia operativa.',
      image: 'assets/images/contenidos/contenedores.jpg',
      pdfUrl: 'assets/pdfs/normas-contenedores.pdf',
      type: 'pdf',
      layout: 'derecha',
      protector: false
    },
    {
      id: 15,
      categoryId: 6,
      title: 'Cadena de Frío',
      subtitle: 'Transporte refrigerado',
      description: 'Manejo especializado de carga refrigerada y congelada manteniendo la cadena de frío durante todo el trayecto.',
      image: 'assets/images/contenidos/frio.jpg',
      videoUrl: 'https://www.youtube.com/watch?v=_9dI6UTWoNg',
      type: 'video',
      layout: 'derecha',
      protector: false
    },

    // Medio Ambiente Marino (categoryId: 7)
    {
      id: 16,
      categoryId: 7,
      title: 'Conservación de Ecosistemas',
      subtitle: 'Protección de la biodiversidad marina',
      description: 'Programas de conservación y protección de ecosistemas marinos y especies en peligro de extinción.',
      image: 'assets/images/contenidos/conservacion.jpg',
      pdfUrl: 'assets/pdfs/programas-conservacion.pdf',
      type: 'pdf',
      layout: 'izquierda',
      protector: false
    },
    {
      id: 17,
      categoryId: 7,
      title: 'Reducción de Emisiones',
      subtitle: 'Tecnologías limpias en navegación',
      description: 'Implementación de tecnologías para reducir emisiones contaminantes y cumplir con normativas ambientales internacionales.',
      image: 'assets/images/contenidos/emisiones.jpg',
      videoUrl: 'https://www.youtube.com/watch?v=_9dI6UTWoNg',
      type: 'video',
      layout: 'centrado',
      protector: false
    }
  ];

  constructor() { }

  /**
   * Obtiene todos los contenidos
   */
  getContenidos(): Observable<Contenido[]> {
    return of(this.contenidosMock).pipe(delay(300));
  }

  /**
   * Obtiene contenidos por categoría
   */
  getContenidosByCategoria(categoryId: number): Observable<Contenido[]> {
    const contenidos = this.contenidosMock.filter(
      contenido => contenido.categoryId === categoryId
    );
    return of(contenidos).pipe(delay(300));
  }

  /**
   * Obtiene un contenido específico por ID
   */
  getContenidoById(id: number): Observable<Contenido | undefined> {
    const contenido = this.contenidosMock.find(c => c.id === id);
    return of(contenido).pipe(delay(300));
  }

  /**
   * Busca contenidos por término
   */
  searchContenidos(searchTerm: string): Observable<Contenido[]> {
    const term = searchTerm.toLowerCase().trim();
    const resultados = this.contenidosMock.filter(contenido =>
      contenido.title.toLowerCase().includes(term) ||
      contenido.subtitle.toLowerCase().includes(term) ||
      contenido.description.toLowerCase().includes(term)
    );
    return of(resultados).pipe(delay(300));
  }

  /**
   * Obtiene contenidos marcados como protector de pantalla
   */
  getContenidosProtector(): Observable<Contenido[]> {
    const contenidosProtector = this.contenidosMock.filter(
      contenido => contenido.protector === true
    );
    return of(contenidosProtector);
  }
}