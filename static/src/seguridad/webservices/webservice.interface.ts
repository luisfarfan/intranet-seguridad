/**
 * Created by Administrador on 8/05/2017.
 */

export interface IWebService {
    id: number,
    parameters: IParameter[],
    nombre: string,
    descripcion: string,
    httpmethod: string,
    url: string,
}

export interface IParameter {
    id: number,
    nombre: string,
    descripcion: string,
    tipovariable: ITipoVariable,
    parameterexample: string
}

export interface ITipoVariable {
    id: number,
    nombre: string,
}