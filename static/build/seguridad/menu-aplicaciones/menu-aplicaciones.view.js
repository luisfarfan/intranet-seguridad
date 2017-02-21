define(["require", "exports", "./menu-aplicaciones.service", "../../core/utils", "../../core/helper.inei"], function (require, exports, menu_aplicaciones_service_1, utils, helper_inei_1) {
    "use strict";
    var objectHelper = new helper_inei_1.ObjectHelper();
    var proyectosService = new menu_aplicaciones_service_1.ProyectosService();
    var sistemasService = new menu_aplicaciones_service_1.SistemasService();
    var moduloService = new menu_aplicaciones_service_1.ModuloService();
    var proyectos;
    var sistemas;
    var sistema_selected;
    var proyecto_selected;
    var key_tree_node_selected;
    var MenuAplicacionesController = {
        getProyectos: function (byPk) {
            proyectosService.getProyectos(byPk).done(function (data) {
                proyectos = data;
                var html = '';
                proyectos.map(function (value, key) {
                    html += "<tr data-value=\"" + value.id + "\"><td>" + value.sigla + "</td><td>" + value.anio + "</td><td>" + value.nombre + "</td></tr>";
                });
                $('#table_proyectos').find('tbody').html(html);
                $('#table_proyectos').find('tr').on('click', function (event) {
                    MenuAplicacionesController.getSistemasbyProyecto($(event.currentTarget).data('value'));
                });
            }).fail(function (error) {
                utils.showSwalAlert('Ocurrio un error!', 'Error', 'error');
            });
        },
        getSistemasbyProyecto: function (by) {
            proyecto_selected = objectHelper.findInArrayObject(proyectos, by, 'id');
            var html = '';
            sistemas = proyecto_selected.sistemas;
            sistemas.map(function (value, key) {
                html += "<tr data-value=\"" + value.id + "\"><td>" + (key + 1) + "</td><td>" + value.nombre + "</td></tr>";
            });
            $('#table_sistemas').find('tbody').html(html);
            $('#table_sistemas').find('tr').on('click', function (event) {
                sistema_selected = objectHelper.findInArrayObject(sistemas, $(event.currentTarget).data('value'), 'id');
                console.log($(event.currentTarget).data('value'));
                console.log(sistema_selected);
                MenuAplicacionesController.getModuloRecursive(proyecto_selected.id, sistema_selected.id);
            });
        },
        getSistemas: function (byPk) {
            sistemasService.getSistemas(byPk).done(function (data) {
                sistemas = data;
            }).fail(function (error) {
                utils.showSwalAlert('Ocurrio un error!', 'Error', 'error');
            });
        },
        getModuloRecursive: function (id_proyecto, id_sistema) {
            console.log(id_proyecto, id_sistema);
            moduloService.getModulosRecursive(id_proyecto, id_sistema).done(function (data) {
                var treeFormat = utils.jsonFormatFancyTree(data);
                var options_tree = {
                    checkbox: false,
                    selectMode: 1,
                    source: treeFormat,
                    beforeSelect: function (event, data) {
                        if (data.node.folder) {
                            return false;
                        }
                    },
                    select: function (event, data) {
                        // Display list of selected nodes
                        var selNodes = data.tree.getSelectedNodes();
                        // convert to title/key array
                        var selKeys = $.map(selNodes, function (node) {
                            key_tree_node_selected = node.key;
                        });
                    },
                    click: function (event, data) {
                        if (!data.node.folder) {
                            data.node.toggleSelected();
                        }
                    },
                    dblclick: function (event, data) {
                        data.node.toggleExpanded();
                    },
                    keydown: function (event, data) {
                        if (event.which === 32) {
                            data.node.toggleSelected();
                            return false;
                        }
                    },
                    cookieId: "fancytree-Cb3",
                    idPrefix: "fancytree-Cb3-"
                };
                $('#tree_modulos').fancytree(options_tree);
                $('#tree_modulos').fancytree("destroy");
                $('#tree_modulos').fancytree(options_tree);
            });
        }
    };
    var appMenuAplicaciones = {
        init: function () {
            MenuAplicacionesController.getProyectos();
            MenuAplicacionesController.getSistemas();
        }
    };
    appMenuAplicaciones.init();
});
//# sourceMappingURL=menu-aplicaciones.view.js.map