import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class SearchService {

    constructor(private http: HttpClient) { }

    getCities() {
        let url = environment.backendUrl + "city/getAll";
        return new Observable((o: any) => {
            this.http.get(url, {}).subscribe((data) => {
                o.next(data);
                return o.complete();
            }, (err) => {
                return o.console.error(err);

            });
        });
    }

    getCitiesByCountry(name) {
        let url = environment.backendUrl + "city/get/"+name;
        return new Observable((o: any) => {
            this.http.get(url, {}).subscribe((data) => {
                o.next(data);
                return o.complete();
            }, (err) => {
                return o.console.error(err);

            });
        });
    }

    getCountries() {
        let url = environment.backendUrl + "country/getAll";
        return new Observable((o: any) => {
            this.http.get(url, {}).subscribe((data) => {
                o.next(data);
                return o.complete();
            }, (err) => {
                return o.console.error(err);

            });
        });
    }

    
}
