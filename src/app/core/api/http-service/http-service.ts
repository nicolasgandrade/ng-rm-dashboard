import { environment } from '../../../../environments/environment';
import { HttpJsonOptions, OptionsPayload } from './http-service.model';

export abstract class HttpService {
  private readonly baseUrl = environment.baseApi;

  protected getFullUrl(path?: string): string {
    return this.baseUrl + (!!path?.trim() ? `/${path}` : '');
  }

  protected getJsonOptions(args?: OptionsPayload): HttpJsonOptions {
    const { headers, params } = args || {};

    return {
      headers,
      params,
      responseType: 'json',
    };
  }
}
