/**
 * Quiz cover images — mapping only (no require calls here).
 * The actual require() calls must be in the component file so Metro can
 * resolve them statically at bundle time.
 */
export interface QuizCover {
  image: ReturnType<typeof require>;
  alt: string;
}

export type QuizCoversMap = Record<number, QuizCover[]>;
