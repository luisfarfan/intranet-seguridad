/**
 * Created by Administrador on 21/02/2017.
 */
define(["require", "exports", "./roles.service", "../../core/helper.inei", "../../core/utils"], function (require, exports, roles_service_1, helper_inei_1, util) {
    "use strict";
    var objectHelper = new helper_inei_1.ObjectHelper();
    var sessionHelper = new helper_inei_1.SessionHelper();
    var rolesModel = new roles_service_1["default"]();
    var roles = [];
    var rol_selected;
    var session = sessionHelper.getSession();
    var tree_menu_format = [];
    var node_keys_selected = [];
    var keys_modulos_by_rol = [];
    var keys_modulos_deleted = [];
    var keys_modulos_added_edited = [];
    var RolJsonRules = {
        form_rol: {
            nombre: {
                maxlength: 30
            },
            descripcion: {
                maxlength: 30
            }
        }
    };
    var form_rol_validate = $('#form_rol').validate(util.validateForm(RolJsonRules.form_rol));
    var utils = {
        enabledDisabledButtonModuloRol: function () {
            if (node_keys_selected.length) {
                $('#btn_edit_modulo_rol_permiso').prop('disabled', false);
                $('#btn_save_modulo_rol').prop('disabled', false);
            }
            else {
                $('#btn_edit_modulo_rol_permiso').prop('disabled', true);
                $('#btn_save_modulo_rol').prop('disabled', true);
            }
        },
        diffDeletedAndEdited: function () {
            keys_modulos_deleted = keys_modulos_by_rol.filter(function (item) { return node_keys_selected.indexOf(item) < 0; });
        }
    };
    var RolesController = {
        getRoles: function (pk) {
            if (pk === void 0) { pk = null; }
            rolesModel.get().done(function (data) {
                roles = data;
                RolesController.drawRoles();
            });
        },
        drawRoles: function () {
            var html = '';
            roles.map(function (value, key) {
                html += "<tr>\n                    <td>" + (parseInt(key) + 1) + "</td>\n                    <td>" + value.nombre + "</td>\n                    <td><ul class=\"icons-list\">\n                            <li name=\"li_rol\" data-value=" + value.id + " class=\"text-primary-600\"><a><i class=\"icon-pencil7\"></i></a></li>\n                            <li class=\"text-danger-600\"><a><i class=\"icon-trash\"></i></a></li>\n\t\t\t\t\t\t</ul></td>\n                </tr>";
            });
            $('#table_roles').find('tbody').html(html);
            $('li[name="li_rol"]').on('click', function (event) {
                RolesController.getRolSelected($(event.currentTarget).data('value'));
            });
        },
        getRolSelected: function (id) {
            rol_selected = objectHelper.findInArrayObject(roles, id, 'id');
            keys_modulos_by_rol = [];
            if (rol_selected.modulo_rol.length) {
                rol_selected.modulo_rol.map(function (value, key) {
                    keys_modulos_by_rol.push(value.modulo.id);
                });
                tree_menu_format = util.jsonFormatFancyTree(session.menu, keys_modulos_by_rol);
            }
            else {
                tree_menu_format = util.jsonFormatFancyTree(session.menu);
            }
            var options_tree = {
                checkbox: true,
                selectMode: 3,
                source: tree_menu_format,
                init: function (event, data) {
                    data.tree.getRootNode().visit(function (node) {
                        if (node.data.preselected)
                            node.setSelected(true);
                    });
                },
                loadChildren: function (event, ctx) {
                    ctx.node.fixSelection3AfterClick();
                },
                select: function (event, data) {
                    // Get a list of all selected nodes, and convert to a key array:
                    var selKeys = $.map(data.tree.getSelectedNodes(), function (node) {
                        return parseInt(node.key);
                    });
                    // Get a list of all selected TOP nodes
                    var selRootNodes = data.tree.getSelectedNodes(true);
                    // ... and convert to a key array:
                    var selRootKeys = $.map(selRootNodes, function (node) {
                        return node.key;
                    });
                    node_keys_selected = selKeys;
                },
                dblclick: function (event, data) {
                    data.node.toggleSelected();
                },
                keydown: function (event, data) {
                    if (event.which === 32) {
                        data.node.toggleSelected();
                        return false;
                    }
                },
                // The following options are only required, if we have more than one tree on one page:
                //				initId: "SOURCE",
                cookieId: "fancytree-Cb3",
                idPrefix: "fancytree-Cb3-"
            };
            $('#tree_menu_rol').fancytree(options_tree);
            $('#tree_menu_rol').fancytree("destroy");
            $('#tree_menu_rol').fancytree(options_tree);
        },
        addRol: function () {
            if (form_rol_validate.valid()) {
                var valid_form = objectHelper.formToObject(util.serializeForm('form_rol'));
                rolesModel.add(valid_form).done(function (response) {
                    util.showSwalAlert('Se ha agregado el Rol correctamente', 'Exito!', 'success');
                    RolesController.getRoles();
                    form_rol_validate.resetForm();
                    $('#modal_rol').modal('hide');
                }).fail(function (error) {
                    util.showSwalAlert('Ha ocurrido un error, por favor intente nuevamente', 'Error!', 'error');
                });
            }
        }
    };
    var permisosService = new roles_service_1.PermisosService();
    var permiso_selected;
    var permisos;
    var PermisosController = {
        getPermisos: function () {
            permisosService.get().done((function (data) {
                var html = '';
                permisos = data;
                permisos.map(function (value, key) {
                    html += "<tr><td>" + (key + 1) + "</td><td>" + value.nombre + "</td><td>" + value.descripcion + "</td><td>" + value.codigo + "</td><td>" + value.dom_name_sufijo + "</td>\n                        <td><ul class=\"icons-list\">\n                            <li name=\"li_permiso_update\" data-value=" + value.id + " class=\"text-primary-600\"><a><i class=\"icon-pencil7\"></i></a></li>\n                            <li name=\"li_permiso_delete\" data-value=" + value.id + " class=\"text-danger-600\"><a><i class=\"icon-trash\"></i></a></li>\n\t\t\t\t\t\t</ul></td></tr>";
                });
                $('#table_permisos').find('tbody').html(html);
                $('li[name="li_permiso_update"]').on('click', function (event) {
                    // getRolSelected($(event.currentTarget).data('value'));
                });
                $('li[name="li_permiso_delete"]').on('click', function (event) {
                    // getRolSelected($(event.currentTarget).data('value'));
                });
            }));
        }
    };
    var App = {
        init: function () {
            $('#btn_submit_form').on('click', function (event) {
                RolesController.addRol();
            });
            RolesController.getRoles();
            PermisosController.getPermisos();
            utils.enabledDisabledButtonModuloRol();
        }
    };
    App.init();
});
//# sourceMappingURL=roles.view.js.map