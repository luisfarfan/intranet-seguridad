import {ProyectosService, SistemasService, ModuloService} from './menu-aplicaciones.service';
import * as utils from '../../core/utils';
import {IProyecto, ISistema, ISistemas, IProyectos} from './menu-aplicaciones.interfaces';
import {ObjectHelper, SessionHelper} from '../../core/helper.inei';

declare var $: any;
var objectHelper = new ObjectHelper();
var proyectosService = new ProyectosService();
var sistemasService = new SistemasService();
var moduloService = new ModuloService();


var proyectos: IProyectos;
var sistemas: ISistemas;
var sistema_selected: ISistema;
var proyecto_selected: IProyecto;
var key_tree_node_selected: Array<string>;

var MenuAplicacionesController: any = {
    getProyectos: (byPk: string) => {
        proyectosService.getProyectos(byPk).done(data => {
            proyectos = data;
            let html = '';
            proyectos.map((value, key) => {
                html += `<tr data-value="${value.id}"><td>${value.sigla}</td><td>${value.anio}</td><td>${value.nombre}</td></tr>`;
            })

            $('#table_proyectos').find('tbody').html(html);
            $('#table_proyectos').find('tr').on('click', (event: any) => {
                MenuAplicacionesController.getSistemasbyProyecto($(event.currentTarget).data('value'));
            });
        }).fail((error: any) => {
            utils.showSwalAlert('Ocurrio un error!', 'Error', 'error');
        });
    },
    getSistemasbyProyecto: (by: string) => {
        proyecto_selected = objectHelper.findInArrayObject(proyectos, by, 'id');
        let html = '';
        sistemas = proyecto_selected.sistemas;
        sistemas.map((value: ISistema, key: any) => {
            html += `<tr data-value="${value.id}"><td>${key + 1}</td><td>${value.nombre}</td></tr>`;
        });
        $('#table_sistemas').find('tbody').html(html);
        $('#table_sistemas').find('tr').on('click', (event: any) => {
            sistema_selected = objectHelper.findInArrayObject(sistemas, $(event.currentTarget).data('value'), 'id');
            console.log($(event.currentTarget).data('value'));
            console.log(sistema_selected);
            MenuAplicacionesController.getModuloRecursive(proyecto_selected.id, sistema_selected.id);
        });

    },
    getSistemas: (byPk: string) => {
        sistemasService.getSistemas(byPk).done(data => {
            sistemas = data;
        }).fail((error: any) => {
            utils.showSwalAlert('Ocurrio un error!', 'Error', 'error');
        })
    },
    getModuloRecursive: (id_proyecto: number, id_sistema: number) => {
        console.log(id_proyecto, id_sistema);
        moduloService.getModulosRecursive(id_proyecto, id_sistema).done(data => {
            let treeFormat = utils.jsonFormatFancyTree(data);

            let options_tree = {
                checkbox: false,
                selectMode: 1,
                source: treeFormat,
                beforeSelect: function (event: any, data: any) {
                    if (data.node.folder) {
                        return false;
                    }
                },
                select: function (event: any, data: any) {
                    // Display list of selected nodes
                    var selNodes = data.tree.getSelectedNodes();
                    // convert to title/key array
                    var selKeys = $.map(selNodes, function (node: any) {
                        key_tree_node_selected = node.key;
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

            $('#tree_modulos').fancytree(options_tree);
            $('#tree_modulos').fancytree("destroy")
            $('#tree_modulos').fancytree(options_tree);
        })
    }
}
var appMenuAplicaciones: any = {
    init: () => {
        MenuAplicacionesController.getProyectos();
        MenuAplicacionesController.getSistemas();
    }
}

appMenuAplicaciones.init();







