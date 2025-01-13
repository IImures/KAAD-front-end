import { Injectable } from '@angular/core';
import {jwtDecode, JwtPayload} from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class JwtService {
  /**
   * Decodes a JWT and returns its payload.
  * @param token - The JWT string to decode.
  * @returns The decoded token payload or null if invalid.
  */
  decodeToken(token: string): DecodedToken | null {
    try {
      return jwtDecode<DecodedToken>(token);
    } catch (error) {
      console.error('Failed to decode JWT', error);
      return null;
    }
  }

  /**
   * Checks if a JWT is expired.
   * @param token - The JWT string to check.
   * @returns True if the token is expired, false otherwise.
   */
  isTokenExpired(token: string): boolean {
    const decodedToken = this.decodeToken(token);
    if (!decodedToken || !decodedToken.exp) {
      return true; // Treat tokens without an expiration as expired
    }
    const currentTime = Math.floor(Date.now() / 1000);
    return decodedToken.exp < currentTime;
  }

  /**
   * Retrieves a specific claim from a JWT.
   * @param token - The JWT string to extract the claim from.
   * @param claimKey - The key of the claim to retrieve.
   * @returns The value of the claim or null if not found.
   */
  getClaim(token: string, claimKey: string): any {
    const decodedToken = this.decodeToken(token);
    return decodedToken ? decodedToken[claimKey] : null;
  }
}

export interface DecodedToken extends JwtPayload {
  [key: string]: any;
}
