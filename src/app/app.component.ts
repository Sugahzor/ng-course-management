import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { EN_LANG } from './core/constants.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ng-course-management';

  constructor(private translate: TranslateService) {
    this.translate.setDefaultLang(EN_LANG);
  }
}
