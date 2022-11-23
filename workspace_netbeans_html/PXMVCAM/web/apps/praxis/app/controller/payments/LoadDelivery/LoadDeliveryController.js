
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
        this.search();
    },
    search: async function () {
        let url = prototype.url + '/getHeaders';
        let fecha1 = Ext.util.Format.date(Ext.getCmp(prototype.id + '-fecha1').getValue(), 'Ymd');
        ;
        let fecha2 = Ext.util.Format.date(Ext.getCmp(prototype.id + '-fecha2').getValue(), 'Ymd');
        ;
        let body = {IN_CCUST: '139', IN_FROMDATE: fecha1, IN_TODATE: fecha2};
        let data = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
                .then(data => data);
        Ext.define('Ext.Praxis.store.payments.LoadDeliveryData', {
            pageSize: 5,
            extend: 'Ext.data.Store',
            autoSync: true,
            data: data,
            proxy: {
                type: 'memory',
                enablePaging: true,
                reader: {
                    type: 'json'
                }
            }
        });
        var store = Ext.create('Ext.Praxis.store.payments.LoadDeliveryData');
        store.loadPage(1);
        let grid =  Ext.getCmp(prototype.id + '-gridData');
        let pag = Ext.getCmp(prototype.id + '-PagingToolbar');
        grid.bindStore(store);
        pag.bindStore(store);
    },
    onShowDelivery:function(obj,rec){
        let grid =  Ext.getCmp(prototype.id + '-gridData');
        let row = grid.store.getAt(rec).data;
        let params = {IN_TABLE:row.a4298NTAB.trim(),IN_IDFILE:row.a4298IDFIL};
        Ext.create('Ext.Praxis.view.payments.LoadDeliveryForm.LoadDeliveryEntry', {
            id: prototype.id + '-LoadDeliveryEntry',
            params: params
        }).show();
    },
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



