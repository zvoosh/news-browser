export interface IBookmark {
  id: string;
  webUrl: string;
  webPublicationDate: string;
  fields: {
    thumbnail?: string;
    headline: string;
    body: string;
    byline?: string;
  };
}

export interface ArticleFields {
  headline: string;
  body: string;
  thumbnail?: string;
  byline?: string;
}

export interface Article {
  id: string;
  type: string;
  sectionId: string;
  sectionName: string;
  webPublicationDate: string;
  webTitle: string;
  fields: ArticleFields;
  webUrl: string;
}

export interface GuardianResponse {
  response: {
    status: string;
    userTier: string;
    total: number;
    startIndex: number;
    pageSize: number;
    currentPage: number;
    pages: number;
    results: Article[];
  };
}
