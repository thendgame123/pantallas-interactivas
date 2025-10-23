export interface Contenido {
  id: number;
  categoryId: number;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  videoUrl?: string;
  pdfUrl?: string;
  type: 'video' | 'image' | 'pdf';
  layout: 'izquierda' | 'derecha' | 'centrado' | 'video';
  protector: boolean;
}