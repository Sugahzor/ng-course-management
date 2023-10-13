import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { EN_LANG } from './core/constants.model';
import { BaseComponent } from './core/shared/base/base.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent extends BaseComponent implements OnInit {
  title = 'ng-course-management';

  constructor(private translate: TranslateService, private router: Router) {
    super();
    this.translate.setDefaultLang(EN_LANG);
  }

  override ngOnInit(): void {
    if (!localStorage.getItem('isLoggedIn')) {
      this.router.navigate(['/login']);
    }
  }
}
