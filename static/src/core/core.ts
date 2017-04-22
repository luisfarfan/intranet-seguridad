/**
 * Created by Administrador on 21/04/2017.
 */

export class CoreConfig {
    static BASEURL: string;
    static KEY: string;
    static IDUSUARIO: string;

    constructor() {
        this.setUrl();
        this.setSessionVariables();
    }

    setUrl() {
        let pathArray = location.href.split('/');
        let protocol = pathArray[0];
        let host = pathArray[2];
        console.log(pathArray);
        CoreConfig.BASEURL = protocol + '//' + host;
    }

    setSessionVariables() {
        CoreConfig.KEY = localStorage.getItem('key');
        CoreConfig.IDUSUARIO = localStorage.getItem('id_usuario');
    }
}
new CoreConfig()
