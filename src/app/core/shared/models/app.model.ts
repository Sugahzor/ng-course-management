export interface LoginData {
    userEmail: string;
    userPassword: string;
}

export interface UserDTO {
        id: number | null;
        userName: string;
        userEmail: string;
        userRole: string;
}