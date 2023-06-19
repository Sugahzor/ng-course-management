import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { UserDTO } from "../core/shared/models/app.model";
import { LoginService } from "../core/shared/services/login.service";
import { LoginUser, LoginStateModel } from "./login.actions";

@State<LoginStateModel>({
    name: 'login',
    defaults: {
        userResponse: {
            id: null,
            userEmail: '',
            userName: '',
            userRole: ''
        },
        loginError: '',
    }
})
@Injectable()
export class LoginState {
    constructor(private loginService: LoginService) {}

    @Selector()
    static userResponse(state: LoginStateModel) {
        return state.userResponse;
    }

    @Selector()
    static loginError(state: LoginStateModel) {
        return state.loginError;
    }

    @Action(LoginUser)
    loginUser(ctx: StateContext<LoginStateModel>, action: LoginUser) {
        return this.loginService.login(action.loginData)
            .pipe(
                catchError((err: string) => {
                    ctx.patchState({
                        loginError: err
                    });
                    throw throwError(() => new Error(err));
                }),
                tap((userResponse: UserDTO) => {
                    ctx.patchState({
                        userResponse: userResponse,
                        loginError: ''
                    })
                })
            );
    }

}