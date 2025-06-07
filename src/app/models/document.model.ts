export interface DocumentDto {
  id: number;
  title: string;
  content: string;
  isForPatient: boolean;
  senderId: number;
  receiverId: number;
  fileName?: string;
}
