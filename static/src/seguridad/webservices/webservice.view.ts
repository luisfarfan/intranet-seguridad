/**
 * Created by Administrador on 8/05/2017.
 */
import {IWebService, IParameter} from '../webservices/webservice.interface';
import {WebServiceService} from '../webservices/webservice.service';

declare var BASEURL: string;
interface IPanel {
    title: string,
    descripcion: string,
    parameters: IParameter[]
}
class WebServiceView {
    private webservices: IWebService[] = null;
    private webserviceService: WebServiceService = new WebServiceService();

    constructor() {
        this.get();
    }

    get() {
        this.webserviceService.get().done((webservices) => {
            this.webservices = webservices;
            this.drawAccordionWebService();
        });
    }

    drawAccordionWebService() {
        let panelshtml: string = '';
        console.log(this.webservices);
        this.webservices.map((ws: IWebService, index: number) => {
            panelshtml += this.setPanelAccordion(ws, index);
        });
        $('#accordion-styled').html(panelshtml);
    }

    setPanelAccordion(panelParameters: IWebService, index: number) {
        let parametersTable: string = '';
        let urlParameters: string = `${panelParameters.url}/`;
        panelParameters.parameters.map((parameter: IParameter) => {
            parametersTable += `<tr><td>${parameter.nombre}</td>
                                   <td>${parameter.descripcion}</td>
                                   <td>${parameter.tipovariable.nombre}</td>
                               </tr>`
            urlParameters += `${parameter.parameterexample}/`
        });
        urlParameters += `?key=r10tuzgqruefb0n8p2ke94bdr4mhk3kn`;

        return `<div class="panel">
                        <div class="panel-heading bg-info">
                            <h6 class="panel-title">
                                <a data-toggle="collapse" data-parent="#accordion-styled"
                                   href="#accordion-styled-group${index}">${panelParameters.nombre}</a>
                            </h6>
                        </div>
                        <div id="accordion-styled-group${index}" class="panel-collapse collapse">
                            <div class="panel-body">
                            <div class="content-group">
										<div class="list-group">
										    <a href="${BASEURL}/services/${urlParameters}" target="_blank" class="list-group-item list-group-item-info"><span class="text-bold">SERVICIO DE EJEMPLO</span>
                                            ${BASEURL}/services/${urlParameters}</a>
											<a href="#" class="list-group-item">
												<h6 class="list-group-item-heading"><i class="icon-bus position-left"></i>Descripción</h6>
												<p class="list-group-item-text">${panelParameters.descripcion}</p>
											</a>
										</div>
									</div>
                                <table class="table table-responsive table-bordered">
                                <thead>
                                <th>Parametro</th>
                                <th>Descripción</th>
                                <th>Tipo Parametro</th>
                                </thead>
                                <tbody>
                                    ${parametersTable}
                                </tbody>
                                </table>
                            </div>
                        </div>
                    </div>`
    }
}
new WebServiceView();