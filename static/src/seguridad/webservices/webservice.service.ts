/**
 * Created by Administrador on 8/05/2017.
 */
declare var BASEURL: string;
export class WebServiceService {
    private url: string = `${BASEURL}/rest_webservices/webservices/`;

    get(): JQueryXHR {
        return $.getJSON(this.url)
    }
}