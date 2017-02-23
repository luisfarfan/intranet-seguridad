/**
 * Created by Administrador on 21/02/2017.
 */

import RolesModel, {PermisosService} from './roles.service';
import {ObjectHelper, SessionHelper} from '../../core/helper.inei';
import {IPermiso, IPermisos} from './roles_permisos.interface'
import * as util from '../../core/utils';
import {jsonFormatFancyTree} from "../../core/utils";

declare var $: any;
interface RolSelected {
    id: number;
    modulo_rol: Array<any>;
    nombre: string;
    descripcion: string;
    codigo: string
}

var objectHelper = new ObjectHelper();
var sessionHelper = new SessionHelper();
var rolesModel = new RolesModel();
var roles: Array<Object> = [];
var rol_selected: RolSelected;
var session = sessionHelper.getSession();
var tree_menu_format: Array<Object> = [];
var node_keys_selected: Array<number> = [];
var keys_modulos_by_rol: Array<number> = [];
var keys_modulos_deleted: Array<number> = [];
var keys_modulos_added_edited: Array<number> = [];


var RolJsonRules = {
    form_rol: {
        nombre: {
            maxlength: 30
        },
        descripcion: {
            maxlength: 30
        },
    }
}

var form_rol_validate = $('#form_rol').validate(util.validateForm(RolJsonRules.form_rol));

var utils: any = {
    enabledDisabledButtonModuloRol: () => {
        if (node_keys_selected.length) {
            $('#btn_edit_modulo_rol_permiso').prop('disabled', false);
            $('#btn_save_modulo_rol').prop('disabled', false);
        } else {
            $('#btn_edit_modulo_rol_permiso').prop('disabled', true);
            $('#btn_save_modulo_rol').prop('disabled', true);
        }
    },
    diffDeletedAndEdited: () => {
        keys_modulos_deleted = keys_modulos_by_rol.filter(item => node_keys_selected.indexOf(item) < 0);
    }
}

var RolesController: any = {
    getRoles: (pk: number = null) => {
        rolesModel.get().done((data) => {
            roles = data;
            RolesController.drawRoles();
        })
    },
    drawRoles: () => {
        let html = '';
        roles.map((value: any, key: any) => {
            html += `<tr>
                    <td>${parseInt(key) + 1}</td>
                    <td>${value.nombre}</td>
                    <td><ul class="icons-list">
                            <li name="li_rol" data-value=${value.id} class="text-primary-600"><a><i class="icon-pencil7"></i></a></li>
                            <li class="text-danger-600"><a><i class="icon-trash"></i></a></li>
						</ul></td>
                </tr>`;
        });
        $('#table_roles').find('tbody').html(html);
        $('li[name="li_rol"]').on('click', (event: any) => {
            RolesController.getRolSelected($(event.currentTarget).data('value'));
        });
    },
    getRolSelected: (id: number) => {
        rol_selected = objectHelper.findInArrayObject(roles, id, 'id');
        keys_modulos_by_rol = [];
        if (rol_selected.modulo_rol.length) {
            rol_selected.modulo_rol.map((value, key) => {
                keys_modulos_by_rol.push(value.modulo.id);
            });
            tree_menu_format = util.jsonFormatFancyTree(session.menu, keys_modulos_by_rol);
        } else {
            tree_menu_format = util.jsonFormatFancyTree(session.menu);
        }

        let options_tree = {
            checkbox: true,
            selectMode: 3,
            source: tree_menu_format,
            init: function (event: any, data: any) {
                data.tree.getRootNode().visit(function (node: any) {
                    if (node.data.preselected) node.setSelected(true);
                });
            },
            loadChildren: function (event: any, ctx: any) {
                ctx.node.fixSelection3AfterClick();
            },
            select: function (event: any, data: any) {
                // Get a list of all selected nodes, and convert to a key array:
                let selKeys = $.map(data.tree.getSelectedNodes(), function (node: any) {
                    return parseInt(node.key);
                });
                // Get a list of all selected TOP nodes
                let selRootNodes = data.tree.getSelectedNodes(true);
                // ... and convert to a key array:
                let selRootKeys = $.map(selRootNodes, function (node: any) {
                    return node.key;
                });
                node_keys_selected = selKeys;
            },
            dblclick: function (event: any, data: any) {
                data.node.toggleSelected();
            },
            keydown: function (event: any, data: any) {
                if (event.which === 32) {
                    data.node.toggleSelected();
                    return false;
                }
            },
            // The following options are only required, if we have more than one tree on one page:
//				initId: "SOURCE",
            cookieId: "fancytree-Cb3",
            idPrefix: "fancytree-Cb3-"
        }
        $('#tree_menu_rol').fancytree(options_tree);
        $('#tree_menu_rol').fancytree("destroy");
        $('#tree_menu_rol').fancytree(options_tree);
    },
    addRol: () => {
        if (form_rol_validate.valid()) {
            let valid_form = objectHelper.formToObject(util.serializeForm('form_rol'));
            rolesModel.add(valid_form).done((response) => {
                util.showSwalAlert('Se ha agregado el Rol correctamente', 'Exito!', 'success');
                RolesController.getRoles();
                form_rol_validate.resetForm();
                $('#modal_rol').modal('hide');
            }).fail((error: any) => {
                util.showSwalAlert('Ha ocurrido un error, por favor intente nuevamente', 'Error!', 'error');
            })
        }
    }

}


var permisosService = new PermisosService();
var permiso_selected: IPermiso;
var permisos: IPermisos;
var PermisosController: any = {
    getPermisos: () => {
        permisosService.get().done((data => {
            let html = '';
            permisos = data;
            permisos.map((value, key) => {
                html += `<tr><td>${key + 1}</td><td>${value.nombre}</td><td>${value.descripcion}</td><td>${value.codigo}</td><td>${value.dom_name_sufijo}</td>
                        <td><ul class="icons-list">
                            <li name="li_permiso_update" data-value=${value.id} class="text-primary-600"><a><i class="icon-pencil7"></i></a></li>
                            <li name="li_permiso_delete" data-value=${value.id} class="text-danger-600"><a><i class="icon-trash"></i></a></li>
						</ul></td></tr>`
            })
            $('#table_permisos').find('tbody').html(html);

            $('li[name="li_permiso_update"]').on('click', (event: any) => {
                // getRolSelected($(event.currentTarget).data('value'));
            });

            $('li[name="li_permiso_delete"]').on('click', (event: any) => {
                // getRolSelected($(event.currentTarget).data('value'));
            });
        }))
    }
}

var App: any = {
    init: () => {
        $('#btn_submit_form').on('click', (event: any) => {
            RolesController.addRol();
        });
        RolesController.getRoles();
        PermisosController.getPermisos();
        utils.enabledDisabledButtonModuloRol();
    }
}

App.init();