import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Select } from '@ngxs/store';
import { filter, Observable, takeUntil } from 'rxjs';
import { EN_LANG } from './core/constants.model';
import { BaseComponent } from './core/shared/base/base.component';
import { AuthState } from './redux/auth.state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent extends BaseComponent implements OnInit {
  title = 'ng-course-management';
  @Select(AuthState.logoutUser) logoutUser$: Observable<boolean>;

  constructor(private translate: TranslateService, private router: Router) {
    super();
    this.translate.setDefaultLang(EN_LANG);
  }

  override ngOnInit(): void {
    this.logoutUser$
      .pipe(
        filter((value: any) => value === true),
        takeUntil(this.unsubscribe$)
      )
      .subscribe(() => this.router.navigate(['/login']));
  }
}
