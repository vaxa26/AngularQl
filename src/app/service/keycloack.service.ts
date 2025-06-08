import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class KeycloakService {
  constructor(private http: HttpClient) {}

  login(username: string, password: string): Promise<boolean> {
    const body = {
      query: `
        mutation Token($username: String!, $password: String!) {
          token(username: $username, password: $password) {
            access_token
            refresh_token
            expires_in
          }
        }
      `,
      variables: { username, password },
    };

    return this.http
      .post<any>('/graphql', body)
      .toPromise()
      .then((res: { data: { token: { access_token: any } } }) => {
        const token = res?.data?.token?.access_token;
        if (!token) return false;
        localStorage.setItem('access_token', token);
        return true;
      });
  }

  getToken(): string | null {
    return localStorage.getItem('access_token');
  }
}
