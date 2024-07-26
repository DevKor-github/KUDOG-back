export interface NoticeMetadata {
  title: string;
  url: string;
}

export interface NotiByCategory {
  category: string;
  categoryId: number;
  notices: NoticeMetadata[];
}
