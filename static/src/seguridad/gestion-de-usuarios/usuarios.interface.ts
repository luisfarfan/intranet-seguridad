/**
 * Created by Administrador on 6/03/2017.
 */
export interface IUsuario {
    id: number,
    modulorolpermisousuario: Object[],
    dni: number,
    ape_pat: string,
    ape_mat: string,
    nombre: string,
    fecha_contrato_inicio: string,
    fecha_contrato_extended: string,
    fecha_contrato_fin: string,
    fecha_nacimiento: string,
    email_inst: string,
    email_personal: string,
    usuario: string,
    clave: string,
    tipousuario: number,
    activo: number
}