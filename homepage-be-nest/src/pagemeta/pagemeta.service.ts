import { Injectable, HttpService } from '@nestjs/common';
import * as domino from 'domino';
import { getMetadata } from 'page-metadata-parser';

@Injectable()
export class PagemetaService {
  constructor(private http: HttpService) {}

  async getByUrl(url: string) {
    try {
      const response = await this.http.get(url).toPromise();
      const doc = domino.createWindow(response.data).document;
      const metadata_ = getMetadata(doc, url);
      // metadata.image = metadata.image;
      // metadata.image.url = metadata.image;
      const metadata = {
        ...metadata_,
        image: {
          url: metadata_.image,
        },
      };
      const res = {
        success: 1,
        meta: metadata,
      };
      return res;
    } catch (error) {
      return new Error(error);
    }
  }
}
