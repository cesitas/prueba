import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class FeedProvider {

    constructor(public http: HttpClient) {
        console.log('Hello FeedProvider Provider');
    }

}
