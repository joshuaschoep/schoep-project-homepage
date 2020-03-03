import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LinksService {

  constructor(
    private http: HttpClient
  ) { }

  public getSections(){
    return this.http.get('api/sections');
  }

  public getSectionTitle(section){
    return this.http.get('api/sections/' + section);
  }

  public getLinks(section){
    return this.http.get('api/sections/' + section + '/links');
  }
}
