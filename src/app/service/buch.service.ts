import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';

@Injectable({
  providedIn: 'root',
})
export class BuchService {
  constructor(private apollo: Apollo) {}

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
          }
        }
      `,
      variables: { suchkriterien },
    }).valueChanges;
  }
}
