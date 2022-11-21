const baseUrl = 'http://localhost:3000/';
export const environment = {
  production: true,

  servicios: {
    login: baseUrl + 'usuarios/login',
    usuarios:baseUrl+ 'usuarios/',
    aeropuertos:baseUrl+"aeropuertos/",
    rutas:baseUrl+"rutas/",
    vuelos:baseUrl+"vuelos/",
  },
};