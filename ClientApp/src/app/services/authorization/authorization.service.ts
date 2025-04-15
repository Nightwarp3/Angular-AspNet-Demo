import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthorizationService {
    private readonly baseUrl: string = 'https://localhost:7165/api/v1/Authenticate';

    constructor(
        private httpClient: HttpClient
    ) { }

    public authorize(): Observable<string> {
        return of('');
        return this.httpClient.get<string>(this.baseUrl)
            .pipe();
    }
}
