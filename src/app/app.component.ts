import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { CookieService } from 'ngx-cookie-service';
import { EN_LANG } from './core/constants.model';
import { BaseComponent } from './core/shared/base/base.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent extends BaseComponent implements OnInit {
  title = 'ng-course-management';

  constructor(
    private translate: TranslateService,
    private router: Router,
    private cookieService: CookieService
  ) {
    super();
    this.translate.setDefaultLang(EN_LANG);
  }

  override ngOnInit(): void {
    if (!this.cookieService.get('isLoggedIn')) {
      this.router.navigate(['/login']);
    }
  }
}
