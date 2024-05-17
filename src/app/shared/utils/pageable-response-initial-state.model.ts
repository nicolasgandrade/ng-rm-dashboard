import { PageableResponse } from '../models/pageable-response.model';

export const pageableResponseInitialState: PageableResponse<any> = {
  info: {
    count: 0,
    pages: 0,
    next: null,
    prev: null,
  },
  results: [],
};
