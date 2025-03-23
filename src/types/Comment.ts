  export interface Comment {
    id: number;
    productId: number | string;
    description: string;
    date: Date;
  }

  export type CommentFormData = Omit<Comment, 'id' | 'date'>;