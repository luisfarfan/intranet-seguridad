/**
 * Created by Administrador on 21/02/2017.
 */

import RolesModel, {ModulosRolService} from './roles.service';
import {PermisosService} from '../permisos/permisos.service';
import {ObjectHelper, SessionHelper} from '../../core/helper.inei';
import {IPermiso, IPermisos} from '../permisos/permisos.interface'
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
var rol_selected: RolSelected = null;
var session = sessionHelper.getSession();
var tree_menu_format: Array<Object> = [];
var tree_menu_format_selecteds: Array<Object> = [];
var node_keys_selected: Array<number> = [];
var keys_modulos_by_rol: Array<number> = [];
var key_tree_node_selected: number = null;

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
        $('#tab_modulos_rol').click(() => {
            if (rol_selected) {
                $('#btn_edit_modulo_rol_permiso').prop('disabled', true);
                $('#btn_save_modulo_rol').prop('disabled', false);
            } else {
                $('#btn_edit_modulo_rol_permiso').prop('disabled', true);
                $('#btn_save_modulo_rol').prop('disabled', true);
            }
        });

        $('#tab_modulos_rol_permisos').click(() => {
            if (rol_selected) {
                $('#btn_edit_modulo_rol_permiso').prop('disabled', false);
                $('#btn_save_modulo_rol').prop('disabled', true);
            } else {
                $('#btn_edit_modulo_rol_permiso').prop('disabled', true);
                $('#btn_save_modulo_rol').prop('disabled', true);
            }
        });
        if (rol_selected) {
            if ($('#tab_modulos_rol').hasClass('active')) {
                $('#btn_edit_modulo_rol_permiso').prop('disabled', true);
                $('#btn_save_modulo_rol').prop('disabled', false);
            } else if ($('#tab_modulos_rol_permisos').hasClass('active')) {
                $('#btn_edit_modulo_rol_permiso').prop('disabled', false);
                $('#btn_save_modulo_rol').prop('disabled', true);
            }
        } else {
            $('#btn_edit_modulo_rol_permiso').prop('disabled', true);
            $('#btn_save_modulo_rol').prop('disabled', true);
        }

    },
    diffDeletedAndEdited: () => {
        keys_modulos_deleted = keys_modulos_by_rol.filter(item => node_keys_selected.indexOf(item) < 0);
        keys_modulos_added_edited = node_keys_selected.filter(item => keys_modulos_deleted.indexOf(item) < 0);
    }
}

var RolesController: any = {
    getRoles: (pk: number = null, rol_id_selected: number = null) => {
        rolesModel.get().done((data) => {
            roles = data;
            RolesController.drawRoles();
            rol_id_selected ? RolesController.getRolSelected(rol_selected.id) : '';
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
            tree_menu_format_selecteds = util.jsonFormatFancyTreeSelecteds(session.menu, keys_modulos_by_rol);
        } else {
            tree_menu_format = util.jsonFormatFancyTree(session.menu);
        }
        utils.enabledDisabledButtonModuloRol();

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
                //utils.enabledDisabledButtonModuloRol();
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
        let options_tree_selecteds = {
            checkbox: false,
            selectMode: 1,
            source: tree_menu_format_selecteds,
            beforeSelect: function (event: any, data: any) {
                if (data.node.folder) {
                    return false;
                }
            },
            select: function (event: any, data: any) {
                // Display list of selected nodes
                var selNodes = data.tree.getSelectedNodes();
                // convert to title/key array
                selNodes.length == 0 ? key_tree_node_selected = null : '';
                var selKeys = $.map(selNodes, function (node: any) {
                    key_tree_node_selected = parseInt(node.key);
                });
            },
            click: function (event: any, data: any) {
                if (!data.node.folder) {
                    data.node.toggleSelected();
                }
            },
            dblclick: function (event: any, data: any) {
                data.node.toggleExpanded();
            },
            keydown: function (event: any, data: any) {
                if (event.which === 32) {
                    data.node.toggleSelected();
                    return false;
                }
            },
            cookieId: "fancytree-Cb3",
            idPrefix: "fancytree-Cb3-"
        }

        $('#tree_menu_rol').fancytree(options_tree);
        $('#tree_menu_rol').fancytree("destroy");
        $('#tree_menu_rol').fancytree(options_tree);

        $('#tree_modulo_rol_permiso').fancytree(options_tree_selecteds);
        $('#tree_modulo_rol_permiso').fancytree("destroy");
        $('#tree_modulo_rol_permiso').fancytree(options_tree_selecteds);
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

class ModuloRolController {
    private modulorolService = new ModulosRolService();
    private rolesController = RolesController;

    constructor() {

    }

    editModulosRol(objectData: Object) {
        this.modulorolService.editModulosRol(objectData).done(() => {
            this.rolesController.getRoles(null, rol_selected.id);
            util.showSwalAlert('Se ha editado con éxito!', 'Exito!', 'success');
        }).fail((error: any) => {
            console.log(error);
        });
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

        }));
    }
}
var moduloRolController = new ModuloRolController()
var App: any = {
    init: () => {
        $('#btn_submit_form').on('click', (event: any) => {
            RolesController.addRol();
        });
        $('#btn_save_modulo_rol').on('click', (event: any) => {
            util.alert_confirm(() => {
                utils.diffDeletedAndEdited();
                moduloRolController.editModulosRol({
                    id_rol: rol_selected.id,
                    delete: keys_modulos_deleted,
                    edited: keys_modulos_added_edited
                })
            }, 'Esta seguro de guardar?', 'info')
        });

        RolesController.getRoles();
        PermisosController.getPermisos();
        utils.enabledDisabledButtonModuloRol();

    }
}

App.init();