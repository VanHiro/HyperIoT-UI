/**
 * HyperIoT Storm Manager
 * HyperIoT StormManager API
 *
 * OpenAPI spec version: 1.0.0
 * Contact: users@acsoftware.it
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
/* tslint:disable:no-unused-variable member-ordering */

import { Inject, Injectable, Optional }                      from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams,
         HttpResponse, HttpEvent }                           from '@angular/common/http';
import { CustomHttpUrlEncodingCodec }                        from '../encoder';

import { Observable }                                        from 'rxjs';


import { BASE_PATH, COLLECTION_FORMATS }                     from '../variables';
import { Configuration }                                     from '../../../models/configuration';


@Injectable()
export class StormService {

    protected basePath = '/hyperiot/storm';
    public defaultHeaders = new HttpHeaders();
    public configuration = new Configuration();

    constructor(protected httpClient: HttpClient, @Optional()@Inject(BASE_PATH) basePath: string, @Optional() configuration: Configuration) {
        if (basePath) {
            this.basePath = basePath;
        }
        if (configuration) {
            this.configuration = configuration;
            this.basePath = basePath || configuration.basePath || this.basePath;
        }
    }

    /**
     * @param consumes string[] mime-types
     * @return true: consumes contains 'multipart/form-data', false: otherwise
     */
    private canConsumeForm(consumes: string[]): boolean {
        const form = 'multipart/form-data';
        for (const consume of consumes) {
            if (form === consume) {
                return true;
            }
        }
        return false;
    }


    /**
     * /hyperiot/storm/topology/{projectId}/activate
     * Activates a topology
     * @param projectId ID of the project
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public activateTopology(projectId: number, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public activateTopology(projectId: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public activateTopology(projectId: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public activateTopology(projectId: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (projectId === null || projectId === undefined) {
            throw new Error('Required parameter projectId was null or undefined when calling activateTopology.');
        }

        let headers = this.defaultHeaders;

        // authentication (jwt-auth) required
        if (this.configuration.apiKeys && this.configuration.apiKeys["AUTHORIZATION"]) {
            headers = headers.set('AUTHORIZATION', this.configuration.apiKeys["AUTHORIZATION"]);
        }

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.get<any>(`${this.basePath}/topology/${encodeURIComponent(String(projectId))}/activate`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * /hyperiot/storm/module/status
     * Simple service for checking module status
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public checkModuleWorking(observe?: 'body', reportProgress?: boolean): Observable<any>;
    public checkModuleWorking(observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public checkModuleWorking(observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public checkModuleWorking(observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.get<any>(`${this.basePath}/module/status`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * /hyperiot/storm/topology/{projectId}/deactivate
     * Deactivates a topology
     * @param projectId ID of the project
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public deactivateTopology(projectId: number, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public deactivateTopology(projectId: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public deactivateTopology(projectId: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public deactivateTopology(projectId: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (projectId === null || projectId === undefined) {
            throw new Error('Required parameter projectId was null or undefined when calling deactivateTopology.');
        }

        let headers = this.defaultHeaders;

        // authentication (jwt-auth) required
        if (this.configuration.apiKeys && this.configuration.apiKeys["AUTHORIZATION"]) {
            headers = headers.set('AUTHORIZATION', this.configuration.apiKeys["AUTHORIZATION"]);
        }

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.get<any>(`${this.basePath}/topology/${encodeURIComponent(String(projectId))}/deactivate`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * /hyperiot/storm/topology/{projectId}/status
     * Gets topology status
     * @param projectId ID of the project
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getTopology(projectId: number, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public getTopology(projectId: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public getTopology(projectId: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public getTopology(projectId: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (projectId === null || projectId === undefined) {
            throw new Error('Required parameter projectId was null or undefined when calling getTopology.');
        }

        let headers = this.defaultHeaders;

        // authentication (jwt-auth) required
        if (this.configuration.apiKeys && this.configuration.apiKeys["AUTHORIZATION"]) {
            headers = headers.set('AUTHORIZATION', this.configuration.apiKeys["AUTHORIZATION"]);
        }

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.get<any>(`${this.basePath}/topology/${encodeURIComponent(String(projectId))}/status`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * /hyperiot/storm/topology/{topology_name}/kill
     * Kills a topology
     * @param projectId ID of the project
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public killTopology(projectId: number, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public killTopology(projectId: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public killTopology(projectId: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public killTopology(projectId: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (projectId === null || projectId === undefined) {
            throw new Error('Required parameter projectId was null or undefined when calling killTopology.');
        }

        let headers = this.defaultHeaders;

        // authentication (jwt-auth) required
        if (this.configuration.apiKeys && this.configuration.apiKeys["AUTHORIZATION"]) {
            headers = headers.set('AUTHORIZATION', this.configuration.apiKeys["AUTHORIZATION"]);
        }

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.get<any>(`${this.basePath}/topology/${encodeURIComponent(String(projectId))}/kill`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * /hyperiot/storm/topology/{project_id}/submit
     * Generates and submit a project topology
     * @param projectId Project id
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public submitProjectTopology(projectId: number, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public submitProjectTopology(projectId: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public submitProjectTopology(projectId: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public submitProjectTopology(projectId: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (projectId === null || projectId === undefined) {
            throw new Error('Required parameter projectId was null or undefined when calling submitProjectTopology.');
        }

        let headers = this.defaultHeaders;

        // authentication (jwt-auth) required
        if (this.configuration.apiKeys && this.configuration.apiKeys["AUTHORIZATION"]) {
            headers = headers.set('AUTHORIZATION', this.configuration.apiKeys["AUTHORIZATION"]);
        }

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.get<any>(`${this.basePath}/topology/${encodeURIComponent(String(projectId))}/submit`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

}