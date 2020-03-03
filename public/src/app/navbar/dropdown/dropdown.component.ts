import { Component, OnInit, Input } from '@angular/core';
import { LinksService } from 'src/app/links.service';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent implements OnInit {
  @Input() section_id: Number;
  @Input() section_title: string;
  private links;

  constructor(
    public linksService: LinksService
  ) { }

  ngOnInit() {
    this.links = this.linksService.getLinks(this.section_id);
  }

  public getLinks(){
    return this.links;
  }

}
