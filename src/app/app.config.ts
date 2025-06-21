import { provideHttpClient, withInterceptors } from '@angular/common/http';
import {
  ApplicationConfig,
  inject,
  provideZoneChangeDetection,
} from '@angular/core';
import {
  provideClientHydration,
  withEventReplay,
} from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { ApolloLink, InMemoryCache } from '@apollo/client/core';
import { provideApollo } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),

    // Interceptor statt fetch
    provideHttpClient(
      withInterceptors([
        (req, next) => {
          const modified = req.clone({
            setHeaders: {
              'content-type': 'application/json',
              'x-apollo-operation-name': 'DefaultQuery', // Wird später ggf. überschrieben
            },
          });
          return next(modified);
        },
      ]),
    ),

    // Apollo Client Setup mit HttpLink
    provideApollo(() => {
      const httpLink = inject(HttpLink);
      const authLink = new ApolloLink((operation, forward) => {
        const token =
          typeof window !== 'undefined'
            ? localStorage.getItem('access_token')
            : null;
        operation.setContext(({ headers = {} }) => ({
          headers: {
            ...headers,
            Authorization: token ? `Bearer ${token}` : '',
            'x-apollo-operation-name':
              operation.operationName || 'UnnamedOperation',
          },
        }));
        return forward(operation);
      });

      return {
        link: authLink.concat(httpLink.create({ uri: '/graphql' })),
        cache: new InMemoryCache(),
      };
    }),
  ],
};
