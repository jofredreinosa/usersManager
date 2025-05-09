import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {provideHttpClient} from "@angular/common/http";
import { MatPaginatorIntl} from "@angular/material/paginator";
import {PaginatorTranslation} from "./shared/i18n/mat-paginator-intl-es";

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    {
      provide: MatPaginatorIntl,
      useClass: PaginatorTranslation
    }
  ]
};
