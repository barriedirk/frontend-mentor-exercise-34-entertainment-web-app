export interface TMDBTrailer {
  id: number;
  results: TMDBTrailerItem[];
}

export interface TMDBTrailerItem {
  id: string;
  key: string;
  name: string;
  site: string;
  type: string;
}
