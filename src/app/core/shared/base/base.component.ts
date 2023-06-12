import { OnInit, OnDestroy, Component } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  template: ''
})
export abstract class BaseComponent implements OnInit, OnDestroy {

    public unsubscribe$ = new Subject();

    ngOnDestroy() {
        this.completeSubscriptions();
    }

    completeSubscriptions() {
        if (!this.unsubscribe$.closed) {
            this.unsubscribe$.complete();
        }
    }

    ngOnInit() {}
}
