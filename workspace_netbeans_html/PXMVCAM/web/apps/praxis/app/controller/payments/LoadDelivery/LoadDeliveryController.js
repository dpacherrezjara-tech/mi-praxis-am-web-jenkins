
/* global URL, fetch */
console.log(prototype.url + '/loadDelivery');
Ext.define('Ext.Praxis.controller.payments.LoadDelivery.LoadDeliveryController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.LoadDeliveryController',
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
        fecha2.setDate(fecha1.getDate() - 90);
        Ext.getCmp(prototype.id + '-fecha1').setValue(fecha2);
        Ext.getCmp(prototype.id + '-fecha2').setValue(fecha1);
        this.OnSearch();
    },
    btnSearch_click: function () {
        this.OnSearch();
    },
    OnSearch: function () {
        //this.search();
        this.onShowTree();
    },
    //<editor-fold defaultstate="collapsed" desc="oldSearch">

//    search: async function () {
//        let url = prototype.url + '/getHeaders';
//        let fecha1 = Ext.util.Format.date(Ext.getCmp(prototype.id + '-fecha1').getValue(), 'Ymd');
//        let fecha2 = Ext.util.Format.date(Ext.getCmp(prototype.id + '-fecha2').getValue(), 'Ymd');
//        let opcion = '1';
//        let procesador = '';
//        let body = {IN_CCUST: '139', IN_PROCESADOR: procesador, IN_OPCION: opcion, IN_FROMDATE: fecha1, IN_TODATE: fecha2};
//        let data = await fetch(url, {
//            method: 'POST',
//            body: JSON.stringify(body),
//            headers: {
//                'Content-Type': 'application/json'
//            }
//        }).then(res => res.json()).then(data => data);
//        Ext.define('Ext.Praxis.store.payments.LoadDeliveryData', {
//            pageSize: 20,
//            extend: 'Ext.data.Store',
//            autoSync: true,
//            data: data,
//            proxy: {
//                type: 'memory',
//                enablePaging: true,
//                reader: {
//                    type: 'json'
//                }
//            },
////             listeners: {
////                beforeload: function (obj) {
////                    obj.proxy.extraParams = body;
////                },
////                load: function (obj, obj2, success, obj4, obj5) {
////                    win.lblUser_toolTip("Estructura: A4298");
////                    // <editor-fold defaultstate="collapsed" desc="paggin">
////                    var pag = Ext.getCmp(prototype.id + '-paggin');
////                    var pagData = pag.getPageData();
////                    var currentPage = Ext.util.Format.number(pagData.currentPage, '0,000');
////                    var pageCount = Ext.util.Format.number(pagData.pageCount, '0,000');
////                    var total = Ext.util.Format.number(pagData.total, '0,000');
////                    Ext.getCmp(prototype.id + '-lbl-currentPage').setText(currentPage);
////                    Ext.getCmp(prototype.id + '-lbl-pageCount').setText(pageCount);
////                    Ext.getCmp(prototype.id + '-lbl-total').setText(total);
////                    // </editor-fold>
////                }
////            }
//
//        });
//        var store = Ext.create('Ext.Praxis.store.payments.LoadDeliveryData');
//        store.loadPage(1);
//        let grid = Ext.getCmp(prototype.id + '-gridData');
//        let pag = Ext.getCmp(prototype.id + '-PagingToolbar');
//        grid.bindStore(store);
//        pag.bindStore(store);
////          var storeGridDatas = Ext.create('Ext.Praxis.store.eecta.SalesList.GridData', {
////            proxy: {
////                url: prototype.url + '/search'
////            },
////            listeners: {
////                beforeload: function (obj) {
////                    obj.proxy.extraParams = bean;
////                },
////                load: function (obj, obj2, success, obj4, obj5) {
////                    win.lblUser_toolTip("Estructura: A3957");
////                    // <editor-fold defaultstate="collapsed" desc="paggin">
////                    var pag = Ext.getCmp(prototype.id + '-paggin');
////                    var pagData = pag.getPageData();
////                    var currentPage = Ext.util.Format.number(pagData.currentPage, '0,000');
////                    var pageCount = Ext.util.Format.number(pagData.pageCount, '0,000');
////                    var total = Ext.util.Format.number(pagData.total, '0,000');
////                    Ext.getCmp(prototype.id + '-lbl-currentPage').setText(currentPage);
////                    Ext.getCmp(prototype.id + '-lbl-pageCount').setText(pageCount);
////                    Ext.getCmp(prototype.id + '-lbl-total').setText(total);
////                    // </editor-fold>
////                    if (obj.data.length === 0) {
////                        global.Msg({
////                            msg: 'Data not found'
////                        });
////                    }
////                    if (obj.data.length === 1) {                    
////                        //console.log('abrir ventana en automatico');
////                        //seleccionar el registro
////                        var grid = Ext.getCmp(prototype.id + '-gridData');
////                        me.onDetailClick( grid , 0, 0 );
////                    }
////                    
////                    global.clear();
////                }
////            }
////        });
//
//
//
//    },
    //</editor-fold>
    onShowDelivery: function (obj, rec) {
        let grid = Ext.getCmp(prototype.id + '-gridMpTree');
        let row = grid.store.getAt(rec).data;
        let params = {IN_TABLE: row.a4298NTAB.trim(), IN_IDFILE: row.a4298IDFIL};
        let nameObj = row.a4298TYPE.trim().replace('00', '') + '_' + row.TYPE.trim() + '_' + row.a4298PRDA;
        params = {name: nameObj, params: {...params}};
        Ext.create('Ext.Praxis.view.payments.LoadDeliveryForm.LoadDeliveryEntry', {
            id: prototype.id + '-LoadDeliveryEntry',
            params: params
        }).show();
    },
    onShowTree: async function () {
        let contenedor = Ext.getCmp(prototype.id + '-boxDetail');
        let box = Ext.getCmp(prototype.id + '-boxMainData');
        box.mask('Loading...');
        contenedor.removeAll();
        let url = prototype.url + '/getHeaders';
        let fecha1 = Ext.util.Format.date(Ext.getCmp(prototype.id + '-fecha1').getValue(), 'Ymd');
        let fecha2 = Ext.util.Format.date(Ext.getCmp(prototype.id + '-fecha2').getValue(), 'Ymd');
        let opcion = Ext.getCmp(prototype.id + '-cmbfiltro').getValue();
        let procesador = Ext.getCmp(prototype.id + '-cmbfiltro-procesador').getValue();
        //console.log(procesador);
        //console.log(opcion);
        let body = {IN_CCUST: '139', IN_PROCESADOR: procesador, IN_OPCION: opcion, IN_FROMDATE: fecha1, IN_TODATE: fecha2};
        let root = [];
        await fetch(url, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json'
            }
        })
                .then(res => res.json())
                .catch(function (error) {
                    console.log('Hubo un problema con la petición Fetch:' + error.message);
                })
                .then(data => {
                    let result = this.groupByType(data);
                    let result2 = Object.entries(result).map((element, index) => {
                        let child = element[1].map(y => {
                            return {TYPE: y.a4298FCOD.trim(), STYLE: 'D', leaf: true, ...y};
                        });
                        return {
                            TYPE: element[0].trim().replace('00', ''),
                            STYLE: 'H',
                            expanded: false,
                            children: child,
                            a4298TLIN: child.reduce((a, b) => a + b.a4298TLIN, 0),
                            a4298QTRN: child.reduce((a, b) => a + b.a4298QTRN, 0),
                            a4298QLIN: child.reduce((a, b) => a + b.a4298QLIN, 0)
                        };
                    });
                    //console.log(result2.length>0?result2.length:0);
                    //<editor-fold defaultstate="collapsed" desc="tree">
                    let tree = Ext.create({
                        xtype: 'treepanel',
                        id: prototype.id + '-gridMpTree',
                        width: '98%',
                        height: 535,
                        border: true,
                        padding: '4 4 4 4',
                        reserveScrollbar: false,
                        scrollable: true,
                        useArrows: true,
                        rootVisible: false,
                        multiSelect: false,
                        columnLines: true,
                        rowLines: true,
                        root: {text: '.', expanded: false, children: result2},
                        columns: {
                            defaults: {
                                menuDisabled: true,
                                sortable: true,
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'treecolumn',
                                    text: 'Record Type',
                                    dataIndex: 'TYPE',
                                    width: 150,
                                    renderer: function (value, metaData, record, rowIndex, colIndex) {
                                        switch (record.data.STYLE) {
                                            case 'H':
                                                metaData.style = "text-align:left;font-weight:bold;color:#0000FF;";
                                                break;
                                            case 'D':
                                                metaData.style = "text-align:left;font-weight:bold;color:#008000;";
                                                break;
                                            case 'C':
                                                metaData.style = "text-align:left;";
                                                break;
                                        }
                                        return value;
                                    }
                                },
                                {text: 'Id File', dataIndex: 'a4298IDFIL', width: 110, align: 'center'},
                                {text: 'Seq.', dataIndex: 'a4298SQFIL', align: 'center', width: 80},
                                {text: 'Processing date', dataIndex: 'a4298PRDA', align: 'center', width: 120},
                                {text: 'Total de <br> Lineas File', dataIndex: 'a4298TLIN', width: 100, align: 'right',
                                    summaryType: 'sum',
                                    summaryRenderer: function (value, summaryData, dataIndex) {
                                        return Ext.util.Format.number(value, '0');
                                    },
                                    renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                                        switch (record.data.STYLE) {
                                            case 'H':
                                                metaData.style = "text-align:right;font-weight:bold;color:#6018B5;";
                                                break;
                                            case 'D':
                                                metaData.style = "text-align:right;font-style: italic;";
                                                break;
                                        }
                                        return Ext.util.Format.number(value, '0');
                                    }
                                },
                                {text: 'Transacciones <br> Grabadas', dataIndex: 'a4298QTRN', width: 120, align: 'right',
                                    summaryType: 'sum',
                                    summaryRenderer: function (value, summaryData, dataIndex) {
                                        return Ext.util.Format.number(value, '0');
                                    },
                                    renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                                        switch (record.data.STYLE) {
                                            case 'H':
                                                metaData.style = "text-align:right;font-weight:bold;color:#6018B5;";
                                                break;
                                            case 'D':
                                                metaData.style = "text-align:right;font-style: italic;";
                                                break;
                                        }
                                        return Ext.util.Format.number(value, '0');
                                    }
                                },
                                {text: 'Lineas <br> Recibicidas', dataIndex: 'a4298QLIN', width: 100, align: 'right',
                                    summaryType: 'sum',
                                    summaryRenderer: function (value, summaryData, dataIndex) {
                                        return Ext.util.Format.number(value, '0');
                                    },
                                    renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                                        switch (record.data.STYLE) {
                                            case 'H':
                                                metaData.style = "text-align:right;font-weight:bold;color:#6018B5;";
                                                break;
                                            case 'D':
                                                metaData.style = "text-align:right;font-style: italic;";
                                                break;
                                        }
                                        return Ext.util.Format.number(value, '0');
                                    }
                                },
                                {
                                    text: 'Estado<br>Carga', dataIndex: 'a4298STREC', width: 100, align: 'center',
                                    renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                        let html = '<img src="resources/img/semaforo/Circle_Silver.png" title="ERROR" >';
                                        if (record.get('a4298STREC') === '0')
                                            html = '<img src="resources/img/semaforo/Circle_Green.png" title="OK" >';
                                        else if (record.get('a4298STREC') === undefined || record.get('a4298STREC') === null) {
                                            html = '';
                                        }
                                        return html;
                                    }
                                },
                                {
                                    text: 'Estado<br>Formateo', dataIndex: 'a4298STCAR', width: 100, align: 'center',
                                    renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                        let html = '<img src="resources/img/semaforo/Circle_Green.png" title="FORMATEADO" >';
                                        if (record.get('a4298STCAR') === 'P')
                                            html = '<img src="resources/img/semaforo/Circle_Silver.png" title="PENDIENTE" >';
                                        else if (record.get('a4298STCAR') === undefined || record.get('a4298STCAR') === null) {
                                            html = '';
                                        }
                                        return html;
                                    }
                                },
                                {
                                    xtype: 'actioncolumn',
                                    sortable: false,
                                    flex: 1,
                                    align: 'center',
                                    items: [
                                        {
                                            getClass: function (value, metadata, record) {
                                                if (record.data.STYLE === 'H')
                                                    return  '';
                                                return 'prx-icon-detail';
                                            },
                                            isDisabled: function (view, rowIndex, colIndex, item, record) {
                                                if (record.data.STYLE === 'H')
                                                    return  true;
                                                return false;
                                            },
                                            tooltip: 'Click for Show Delivery',
                                            handler: 'onShowDelivery'
                                        }
                                    ]
                                }
                            ]
                        },
                        dockedItems: [
                            {
                                xtype: 'toolbar',
                                dock: 'left',
                                border: false,
                                items: [
                                    {
                                        xtype: 'button',
                                        icon: 'resources/img/botones/expanded.png',
                                        tooltip: 'Expand the tree',
                                        enableToggle: true,
                                        toggleHandler: function (button, pressed, eOpts) {
                                            Ext.getCmp(prototype.id + '-gridMpTree').expandAll();
                                        }
                                    },
                                    {
                                        xtype: 'button',
                                        icon: 'resources/img/botones/collaped.png',
                                        tooltip: 'Collapse the tree',
                                        enableToggle: true,
                                        toggleHandler: function (button, pressed, eOpts) {
                                            Ext.getCmp(prototype.id + '-gridMpTree').collapseAll();
                                        }
                                    }
                                ]
                            },
                            {
                                dock: 'bottom',
                                xtype: 'container',
                                border: false,
                                padding: '4 4 4 4',
                                flex:1,
                                layout: {
                                    type: 'hbox',
                                    align: 'border',
                                    pack:'center'
                                },
                                items:[
                                    {
                                        xtype:'label',
                                        text:'Total Procesadores: ',
                                        style: 'display:inline-block;text-align:center;font-weight:bold;'
                                    },
                                    {xtype: 'tbspacer', width: 20},
                                    {
                                        xtype:'label',
                                        text:result2.length>0?result2.length:'0',
                                        style: 'display:inline-block;text-align:center'
                                    },
                                    {xtype: 'tbspacer', width: 40},
                                    {
                                        xtype:'label',
                                        text:'Total Archivos: ',
                                        style: 'display:inline-block;text-align:center;font-weight:bold;'
                                    },
                                    {xtype: 'tbspacer', width: 20},
                                    {
                                        xtype:'label',
                                        text:data.length>0?data.length:'0',
                                        style: 'display:inline-block;text-align:center'
                                    }
                                ]
                            }
                        ],
                        viewConfig: {
                            stripeRows: true,
                            enableTextSelection: true,
                            deferEmptyText: false,
                            emptyText: 'No Records',
                            markDirty: false,
                            getRowClass: function (record, rowIndex, rowParams, store) {
                                if (rowIndex % 2 === 0)
                                    return 'rowA';
                            }
                        }
                    });
                    //</editor-fold>
                    try {
                        //Ext.getCmp(prototype.id + '-gridMpTree').getStore().removeAll();
                        contenedor.add(tree);
                        contenedor.updateLayout();
                    } catch (err) {
                        console.log(err);
                    }
                    box.unmask();
                });
    },
    //<editor-fold defaultstate="collapsed" desc="DateValidate">
    validateDatefield:function(obj,e){
        let fecha = Ext.util.Format.date(e, 'Ymd');
        let df2 = Ext.getCmp(prototype.id + '-fecha2');
        let fecha2 = Ext.util.Format.date(df2.getValue(), 'Ymd');
        if(fecha>fecha2){
            df2.setValue(obj.getValue());
        }
    },
    validateDatefield2:function(obj,e){
        let fecha2 = Ext.util.Format.date(e, 'Ymd');
        let df1 = Ext.getCmp(prototype.id + '-fecha1');
        let fecha1 = Ext.util.Format.date(df1.getValue(), 'Ymd');
        if(fecha2<fecha1){
            obj.setValue(df1.getValue());
        }
    },
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="groupBy">
    groupByType: function (list) {
        let result = list.reduce((x, y) => {
            (x[y.a4298TYPE] = x[y.a4298TYPE] || []).push(y);
            return x;
        }, {});
        return result;
    },
    //</editor-fold>

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



