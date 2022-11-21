export class UsuarioModel{
    id?: String;
    nombre?: String;
    apellidos?: String;
    telefono?: String;
    correo?: String;
    tokem?: String;
    isLoggedIn?: boolean = false;
}