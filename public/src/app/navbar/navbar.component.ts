import { Component, OnInit } from '@angular/core';
import { LinksService } from '../links.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  private sections;
  constructor(
    public linksService: LinksService
  ) { }

  ngOnInit() {
    this.sections = this.linksService.getSections();
  }

  public getSections(){
    return this.sections;
  }

}
