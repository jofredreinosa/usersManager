import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {provideHttpClient} from "@angular/common/http";
import { MatPaginatorIntl} from "@angular/material/paginator";
import {PaginatorTranslation} from "./shared/i18n/mat-paginator-intl-es";
import {MAT_DATE_FORMATS, MAT_DATE_LOCALE} from "@angular/material/core";
import {CUSTOM_DATE_FORMATS} from "./shared/i18n/mat-datepicker-es-format";

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    {
      provide: MatPaginatorIntl,
      useClass: PaginatorTranslation
    },
    {
      provide: MAT_DATE_LOCALE,
      useValue: 'es-CL'
    },
    {
      provide: MAT_DATE_FORMATS,
      useValue: CUSTOM_DATE_FORMATS
    }
  ]
};
