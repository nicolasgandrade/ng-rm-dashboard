import { HttpHeaders, HttpParams } from '@angular/common/http';

export interface HttpJsonOptions {
  responseType: 'json';
  params?: HttpParams;
  headers?: HttpHeaders;
}

export type OptionsPayload = Omit<HttpJsonOptions, 'responseType'>;
