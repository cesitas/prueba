import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class FileProvider {

    constructor(public http: HttpClient) { }

}
