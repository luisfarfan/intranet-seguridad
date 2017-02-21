/**
 * Created by Administrador on 21/02/2017.
 */
export interface IProyecto {
    anio: number;
    cod_meta: string;
    descripcion: string;
    estado: number;
    fecha_fin: string;
    fecha_inicio: string;
    id: number;
    id_siga: number;
    nombre: string;
    sigla: string;
    sistemas: Array<ISistema>
}

export interface IProyectos extends Array<IProyecto> {
}

export interface ISistema {
    codigo: string;
    descripcion: string;
    estado: number;
    id: number;
    nombre: string;
}

export interface ISistemas extends Array<ISistema> {
}
