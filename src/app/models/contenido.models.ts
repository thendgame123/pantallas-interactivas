export interface Contenido {
  id: number;
  categoryId: number;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  videoUrl?: string;
  type: 'video' | 'image';
  layout: 'izquierda' | 'derecha' | 'centrado' | 'video';
  protector: boolean;
}