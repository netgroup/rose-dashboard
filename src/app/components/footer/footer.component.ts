import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

    isLinkActive(url): boolean {
        const queryParamsIndex = this.router.url.indexOf('?');
        const baseUrl = queryParamsIndex === -1 ? this.router.url :
            this.router.url.slice(0, queryParamsIndex);
        return baseUrl === url;
    }

}
