// types/story.ts — cập nhật type để có field audio
export type Choice = {
  text: string;
  next: string;
};

export type Scene = {
  background?: string;
  audio?: string;       // đường dẫn file audio (mp3/ogg/wav)
  text: string;
  choices?: Choice[];
};

export type Story = Record<string, Scene>;