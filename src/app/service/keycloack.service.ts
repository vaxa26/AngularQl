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
    if (typeof window === 'undefined') {
      return null; // lokal nicht verfügbar in SSR
    }
    return localStorage.getItem('access_token');
  }

  getRoles(): string[] {
    if (typeof window === 'undefined') return [];

    const token = this.getToken();
    if (!token) return [];

    const payload = JSON.parse(atob(token.split('.')[1]));
    console.log('Token payload:', payload);
    return payload?.realm_access?.roles || [];
  }

  hasRole(role: string): boolean {
    const token = this.getToken();
    if (!token) return false;

    const payload = JSON.parse(atob(token.split('.')[1]));

    // 1. Prüfe Realm-Rollen
    const realmRoles = payload?.realm_access?.roles || [];
    if (realmRoles.includes(role)) return true;

    // 2. Prüfe Client-Rollen (z. B. "nest-client")
    const clientRoles = payload?.resource_access?.['nest-client']?.roles || [];
    return clientRoles.includes(role);
  }
}
