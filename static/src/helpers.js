/**
 * Created by LFarfan on 19/12/2016.
 */
function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
//var csrftoken = getCookie('csrftoken');
var csrftoken = $('input[name="csrfmiddlewaretoken"]').val();


function csrfSafeMethod(method) {
    // these HTTP methods do not require CSRF protection
    return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
}
$.ajaxSetup({
    beforeSend: function (xhr, settings) {
        if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
            console.log(csrftoken);
            xhr.setRequestHeader("X-CSRFToken", csrftoken);
        }
    }
});


function setSelect_v2(id, json, keys = [], seleccione = false) {
    $('#' + id).find('option').remove();
    let html = '';
    seleccione ? html += '<option value="-1">Seleccione</option>' : '';
    $.each(json, function (key, val) {
        if (typeof val == 'string') {
            html += `<option value="${val}">${val}</option>`
        } else {
            html += `<option value="${val[keys[0]]}">${val[keys[1]]}</option>`
        }
    });
    $('#' + id).html(html);
}

function findInObject(obj, key, value) {
    "use strict";
    let res = [];
    if (value != '-1') {
        if (obj.length > 0) {
            $.each(obj, (k, v) => {
                if (v[key] == value) {
                    res.push(v);
                }
            });
        }
    }
    return res;
}

function setTable(id, json, params, datatable = false, datatable_params = {}) {
    let html = '';
    if (json.length > 0) {
        $.each(json, (key, val) => {
            html += '<tr>';
            for (let i in params) {
                html += `<td>${val[params[i]] == null ? 0 : val[params[i]]}</td>`;
            }
            html += '</tr>';
        });
    }
    $('#' + id).find('tbody').empty();
    if (datatable) {
        ('#' + id).DataTable({datatable_params})
        ('#' + id).dataTable().fnDestroy();
    }
    $('#' + id).find('tbody').html(html);

    if (datatable) {
        ('#' + id).DataTable({datatable_params})
    }

}

function setTablev2(arguments, callback, datatable = false, datatable_params = {}) {
    let html = '';
    $('#' + id).find('tbody').empty();
    if (datatable) {
        ('#' + id).DataTable({datatable_params})
        ('#' + id).dataTable().fnDestroy();
    }
    $.each(arguments.json, (key, val) => {
        html += '<tr>';
        for (let i in arguments.params) {
            html += `<td>${val[arguments.params[i]] == null ? 0 : val[arguments.params[i]]}</td>`;
        }
        if (arguments.params.pk) {
            html += `<td>${val[arguments.params.pk]}</td>`;
        }
        html += '</tr>';
    });
    $('#' + id).find('tbody').html(html);

    if (datatable) {
        ('#' + arguments.id).DataTable({datatable_params})
    }
}

function alert_confirm(callback, title = 'Está seguro de Guardar?', type = 'success') {
    swal({
        title: title,
        text: '',
        type: type,
        showCancelButton: true,
        confirmButtonColor: "#EF5350",
        confirmButtonText: "Si!",
        cancelButtonText: "No!",
        closeOnConfirm: true,
        closeOnCancel: true,
        showLoaderOnConfirm: true
    }, confirm => {
        if (confirm) {
            callback()
        }
    });
}

function objectToForm(obj) {
    "use strict";
    for (let i in obj) {
        let type_input = $(`input[name=${i}]`).attr('type');
        switch (type_input) {
            case 'checkbox':
                if (obj[i] == 1) {
                    $(`input[name=${i}]`).prop('checked', true);
                } else {
                    $(`input[name=${i}]`).prop('checked', false);
                }
                break;
            case 'text':
                $(`input[name=${i}]`).val(obj[i]);
                break;
        }
    }
}

function formToObject(frm) {
    "use strict";
    let form = $('#' + frm).serializeArray();
    let data = {};
    for (let i in form) {
        data[form[i].name] = form[i].value;
    }
    $(`#${frm} input:checkbox`).each((key, val) => {
        data[val.name] = val.checked == true ? 1 : 0;
    });
    return data;
}

function diffSistemas(array, ids) {
    "use strict";
    let asignado = [];
    var no_asignado = Object.assign([], array);
    if (ids.length) {
        for (let i in no_asignado) {
            for (let v in ids) {
                if (no_asignado[i].id == ids[v]) {
                    asignado.push(no_asignado[i]);
                    no_asignado.splice(i, 1);
                }
            }
        }
    } else {
        return {asignado: asignado, no_asignado: no_asignado};
    }

    return {asignado: asignado, no_asignado: no_asignado};
}

$.extend($.fn.dataTable.defaults, {
    autoWidth: false,
    columnDefs: [{
        orderable: false,
        width: '100px',
        targets: [5]
    }],
    dom: '<"datatable-header"fl><"datatable-scroll"t><"datatable-footer"ip>',
    language: {
        search: '<span>Filter:</span> _INPUT_',
        lengthMenu: '<span>Show:</span> _MENU_',
        paginate: {'first': 'First', 'last': 'Last', 'next': '&rarr;', 'previous': '&larr;'}
    },
    "language": {
        "sProcessing": "Procesando...",
        lengthMenu: '<span>Mostrar:</span> _MENU_',
        "sZeroRecords": "No se encontraron resultados",
        "sEmptyTable": "Ningún dato disponible en esta tabla",
        "sInfo": "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
        "sInfoEmpty": "Mostrando registros del 0 al 0 de un total de 0 registros",
        "sInfoFiltered": "(filtrado de un total de _MAX_ registros)",
        "sInfoPostFix": "",
        search: '<span>Buscar:</span> _INPUT_',
        "sUrl": "",
        "sInfoThousands": ",",
        "sLoadingRecords": "Cargando...",
        paginate: {'first': 'Primero', 'last': 'Ultimo', 'next': '&rarr;', 'previous': '&larr;'},
        "oAria": {
            "sSortAscending": ": Activar para ordenar la columna de manera ascendente",
            "sSortDescending": ": Activar para ordenar la columna de manera descendente"
        }
    },
    drawCallback: function () {
        $(this).find('tbody tr').slice(-3).find('.dropdown, .btn-group').addClass('dropup');
    },
    preDrawCallback: function () {
        $(this).find('tbody tr').slice(-3).find('.dropdown, .btn-group').removeClass('dropup');
    }
});
$('.dataTables_filter input[type=search]').attr('placeholder', 'Type to filter...');

