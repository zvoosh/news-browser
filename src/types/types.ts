export interface ArticleFields {
  body: string;
  headline: string;
  byline: string;
  thumbnail: string;
}

export interface Article {
  id: string;
  webTitle: string;
  webPublicationDate: string;
  fields: ArticleFields;
}

export interface GuardianResponse {
  response: {
    results: Article[];
  };
}