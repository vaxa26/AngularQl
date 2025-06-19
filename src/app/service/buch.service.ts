/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';

@Injectable({
  providedIn: 'root',
})
export class BuchService {
  constructor(private apollo: Apollo) {}

  getBuchById(id: string) {
    return this.apollo.query<{ buch: any }>({
      query: gql`
        query ($id: ID!) {
          buch(id: $id) {
            id
            isbn
            titel {
              titel
              untertitel
            }
            rating
            art
            preis
            rabatt
            lieferbar
            datum
            homepage
          }
        }
      `,
      variables: { id },
    });
  }

  getBuecher(suchkriterien: any) {
    return this.apollo.watchQuery<{ buecher: any[] }>({
      query: gql`
        query ($suchkriterien: SuchkriterienInput) {
          buecher(suchkriterien: $suchkriterien) {
            id
            isbn
            titel {
              titel
              untertitel
            }
            rating
            art
            preis
            rabatt
            lieferbar
            datum
            homepage
          }
        }
      `,
      variables: { suchkriterien },
    }).valueChanges;
  }

  createBuch(input: any) {
    return this.apollo.mutate<{ create: { id: number } }>({
      mutation: gql`
        mutation ($input: BuchInput!) {
          create(input: $input) {
            id
          }
        }
      `,
      variables: { input },
    });
  }

  deleteBuch(id: string) {
    return this.apollo.mutate({
      mutation: gql`
        mutation ($id: ID!) {
          delete(id: $id)
        }
      `,
      variables: { id },
    });
  }
}
