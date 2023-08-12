
/* global URL, fetch */

Ext.define('Ext.Praxis.controller.elavon.InputLoad.InputLoadController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.InputLoadController',
    page_current: 0,
    me: '',
    setContext: function () {
        me = this;
    },
    init: function (view) {
        me = this;
    },
    afterRender: function () {
        let fecha1 = new Date();
        let fecha2 = new Date();
        fecha2.setDate(fecha1.getDate() - 30);
        Ext.getCmp(prototype.id + '-fecha1').setValue(fecha2);
        Ext.getCmp(prototype.id + '-fecha2').setValue(fecha1);
        this.OnSearch();
    },
    btnSearch_click: function () {
        this.OnSearch();
    },
    btnProcess_click: function () {
        this.winDataEntry();
    },
    winDataEntry: function () {
        Ext.create('Ext.Praxis.view.elavon.InputLoadForm.InputLoadEntry', {
            id: prototype.id + '-InputLoadEntry'
        }).show();

    },
    OnSearch: function () {
        this.search();
    },
    search: function () {
        var bean = {};
        Ext.getCmp(prototype.id + '-boxPaginacion').show();
        bean.IN_FROMDATE = Ext.util.Format.date(Ext.getCmp(prototype.id + '-fecha1').getValue(), 'Ymd');
        bean.IN_TODATE = Ext.util.Format.date(Ext.getCmp(prototype.id + '-fecha2').getValue(), 'Ymd');
        var storeGridDatas = Ext.create('Ext.Praxis.store.elavon.InputLoad.GridData', {
            proxy: {
                url: prototype.url + '/getHeaderInfo'
            },
            listeners: {
                beforeload: function (obj) {
                    obj.proxy.extraParams = bean;
                },
                load: function (obj, obj2, success, obj4, obj5) {
                    win.lblUser_toolTip("Estructura: A4294");
                    // <editor-fold defaultstate="collapsed" desc="paggin">
                    var pag = Ext.getCmp(prototype.id + '-paggin');
                    var pagData = pag.getPageData();
                    var currentPage = Ext.util.Format.number(pagData.currentPage, '0,000');
                    var pageCount = Ext.util.Format.number(pagData.pageCount, '0,000');
                    var total = Ext.util.Format.number(pagData.total, '0,000');
                    Ext.getCmp(prototype.id + '-lbl-currentPage').setText(currentPage);
                    Ext.getCmp(prototype.id + '-lbl-pageCount').setText(pageCount);
                    Ext.getCmp(prototype.id + '-lbl-total').setText(total);
                    // </editor-fold>
                    if (obj.data.length === 0) {
                        global.Msg({
                            msg: 'Data not found'
                        });
                    }
                    global.clear();
                }
            }
        });
        Ext.getCmp(prototype.id + '-gridData').setStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin').bindStore(storeGridDatas);
    },
    onDownloadClick: function (grid, rowIndex, colIndex) {
        let rec = grid.getStore().getAt(rowIndex);
        switch (rec.data.A4294STCAR){
            case 'P':
                global.Msg({
                            icon:2,
                            msg: 'File '+ rec.data.A4294IDFIL + '  in process. please wait'
                        });
                 break;
            case '0':
                let pb = Ext.getCmp(prototype.id + '-progressBar');
                let formatFile = Object.values(Ext.getCmp(prototype.id + '-formatFile').getValue())[0];
                pb.setVisible(true);
                pb.wait({
                    text: 'Downloading...',
                    interval: 500
                });
                console.log(rec.data.A4294IDFIL);
                let params = rec.data.A4294IDFIL + '?format=' + formatFile;
                fetch(prototype.url + '/getReconFormat/' + params)
                        .then(response => response.blob())
                        .then(blob => {
                            this.downloadFile(blob);
                            pb.reset();
                            pb.setVisible(false);
                        });
                 break;
             default:
                 global.Msg({
                            icon:1,
                            msg: 'File '+ rec.data.A4294IDFIL + ' in Error'
                        });
                 break;
        }

    },
    downloadFile: function (blob, name = "Elavon") {
        console.log("datos recibidos");
        let fecha = new Date();
        let fechaformat = "";
        fechaformat = fechaformat.concat(fecha.getFullYear(), fecha.getMonth(), fecha.getDate(), fecha.getHours(), fecha.getMinutes(), fecha.getSeconds());
        name = name + "_" + fechaformat + ".zip";
        const href = URL.createObjectURL(blob);
        const a = Object.assign(document.createElement("a"), {
            href,
            style: "display:none",
            download: name
        });
        document.body.appendChild(a);
        a.click();
        URL.revokeObjectURL(href);
        a.remove();
    },
    // <editor-fold defaultstate="collapsed" desc="Funciones para la paginación">
    pagFirst: function (obj, e) {
        if (Ext.getCmp(prototype.id + '-boxMainData').isVisible()) {
            Ext.getCmp(prototype.id + '-paggin').moveFirst();
        }
    },
    pagPrevious: function (obj, e) {
        if (Ext.getCmp(prototype.id + '-boxMainData').isVisible()) {
            Ext.getCmp(prototype.id + '-paggin').movePrevious();
        }
    },
    pagNext: function (obj, e) {
        if (Ext.getCmp(prototype.id + '-boxMainData').isVisible()) {
            Ext.getCmp(prototype.id + '-paggin').moveNext();
        }
    },
    pagLast: function (obj, e) {
        if (Ext.getCmp(prototype.id + '-boxMainData').isVisible()) {
            Ext.getCmp(prototype.id + '-paggin').moveLast();
        }
    },
    // </editor-fold>
    // <editor-fold defaultstate="collapsed" desc="Utilitarios">
    getValue: function (id) {
        return Ext.getCmp(prototype.id + '-' + id).getValue();
    },
    focus: function (id) {
        Ext.getCmp(prototype.id + '-' + id).focus();
    },
    setValue: function (id, txt) {
        return Ext.getCmp(prototype.id + '-' + id).setValue(txt);
    },
    onUpperValue: function (field, newValue, oldValue) {
        field.setValue(newValue.toUpperCase());
    },
    onTextKeypress: function (obj, e, eOpts) {
        if (e.getKey() === e.ENTER) {
            this.btnSearch_click();
        }
    },
    onCmbByOrder: function () {
//        var option_order = Ext.getCmp(prototype.id + '-cmbByOrder').getValue();
//        Ext.getCmp(prototype.id + '-txt-filter').show();
//        Ext.getCmp(prototype.id + '-txt-filter').focus();
//        Ext.getCmp(prototype.id + '-txt-filter-num').hide();
//        if (option_order === '03' || option_order === '04') {
//            Ext.getCmp(prototype.id + '-txt-filter').hide();
//            Ext.getCmp(prototype.id + '-txt-filter-num').show();
//            Ext.getCmp(prototype.id + '-txt-filter-num').focus();
//        }
    },
    // </editor-fold>
    // <editor-fold defaultstate="collapsed" desc="FormatRenderer">
    onStringRenderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
        switch (record.get('typeColumn')) {
//            case 1:
//                value = value;
//            break;
            case 2:
                metaData.style = "background-color: #B9B8B6 !important;";
                break;
//            default:
//                value = value;
        }
        return value;
    },
    onAmountRenderer01: function (value, metaData, record, rowIndex, colIndex, store, view) {
        switch (record.get('typeColumn')) {
            case 1:
                value = Ext.util.Format.number(value, '0,000.00');
                value = parseInt(value) === 0 ? '' : value;
                break;
            case 2:
                metaData.style = "background-color: #B9B8B6 !important;";
                value = Ext.util.Format.number(value, '0,000.00');
                break;
            default:
                value = Ext.util.Format.number(value, '0,000.00');
        }
        return value;
    },
    onAmountRenderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
        switch (record.get('typeColumn')) {
            case 1:
                value = Ext.util.Format.number(value, '0,000');
                value = parseInt(value) == 0 ? '' : value;
                break;
            case 2:
                metaData.style = "background-color: #B9B8B6 !important;";
                value = Ext.util.Format.number(value, '0,000');
                break;
            default:
                value = Ext.util.Format.number(value, '0,000');
        }
        return value;
    },
    onMonthStringRenderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
        //console.log(value.substring(4,6));
        var m = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dec'];
        var valor = m[parseInt(value.substring(4, 6)) - 1] + ' - ' + value.substring(0, 4);
        return valor;
        //return '<a href="#gds_analysis" onclick="Ext.getCmp(\'App-Gds_analysis-Contenedor\').getController().onDetailFlownClick00(' + rowIndex + ');">' + valor + '</a>';
    }
    // </editor-fold>
});



