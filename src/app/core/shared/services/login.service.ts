import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { USERS_URL } from "../../constants.model";
import { LoginData, UserDTO } from "../models/app.model";

@Injectable({
    providedIn: 'root'
})
export class LoginService {
    private readonly ROOT_URL = environment.serviceUrlBase;

    constructor(private http: HttpClient) {}

    login(loginData: LoginData): Observable<UserDTO> {
        console.log(loginData, "login data in service");
        return this.http.post<UserDTO>(`${this.ROOT_URL}${USERS_URL}/login`, loginData);
    }
}