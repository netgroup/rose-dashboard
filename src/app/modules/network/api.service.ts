import * as Definitions from '@configs/network/api.definitions';

import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';

import {Observable, throwError} from 'rxjs';
import {catchError, take} from 'rxjs/operators';

interface ApiGroup {
    [key: string]: any;
}

@Injectable()
export class ApiService {
    static readonly apiName: string = 'ApiService';

    readonly url: string;

    public Authentication: any;
    public Operators: any;
    public Devices: any; 
    public OverlayNets: any; 
    public Dashboard: any; 
    public Tenants: any; 

    constructor(private http: HttpClient) {
        this.url = `${Definitions.servers[0].url}`;

        this.Authentication = this.constructApisForGroup('Authentication');
        this.Operators = this.constructApisForGroup('Operators');
        this.Devices = this.constructApisForGroup('Devices');
        this.OverlayNets = this.constructApisForGroup('Overlays');
        this.Dashboard = this.constructApisForGroup('Dashboard');
        this.Tenants = this.constructApisForGroup('Tenants');
        
    }

    private constructApisForGroup(group: string): ApiGroup {
        const paths = Definitions.paths;
        const keys = Object.keys(paths);
        const apis = {};

        keys.forEach(path => {
            const descriptor = paths[path];
            const methods = Object.keys(descriptor);

            methods.forEach(method => {
                const operationId = descriptor[method].operationId;

                if (operationId && operationId.startsWith(`${group}.`)) {
                    this.constructApiFromOperation(apis, path, method, descriptor[method]);
                }
            });
        });

        return apis;
    }

    private constructApiFromOperation(root: ApiGroup, path: string, method: string, descriptor: any): ApiGroup {
        const components = descriptor.operationId.split('.');

        let clone = root;

        for (let i = 1; i < components.length - 1; i++) {
            if (!clone[components[i]]) {
                clone[components[i]] = {};
            }

            clone = clone[components[i]];
        }

        clone[components[components.length - 1]] = (data: any, options: any): Observable<any> => {
            if (method === 'get' || method === 'delete') {
                options = options || {};
                options.params = this.buildRequestParams(data);

                // Query parameters will be overwritten inside the api.interceptor
                return this.http[method](path, options).pipe(
                    take(1),
                    catchError((error: any) => {
                        if (error.error != null) {
                            error.message = error.error.message;
                            return throwError(error);
                        }
                    })
                );
            } else {
                return this.http[method](path, data, options).pipe(
                    take(1),
                    catchError((error: any) => {
                        if (error.error != null) {
                            error.message = error.error.message;
                        }
                        return throwError(error);
                    })
                );
            }
        };

        return root;
    }

    private buildRequestParams(data: any): HttpParams {
        const requestParams: string[] = [];

        if (!data) {
            return new HttpParams({});
        }

        Object.keys(data).forEach((key) => {
            requestParams.push(`${key}=${data[key]}`);
        });

        return new HttpParams({
            fromString: requestParams.join('&')
        });
    }
}
