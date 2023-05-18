
Ext.define('Ext.Praxis.controller.salesaudit.0425downloadForm.download0425FormController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.download0425FormController',

    /**
     * Constructor
     */
    bean: {},
    beanProc: {},
    init: function (view) {
        var me = this;

    },

    /**
     * Se ejecuta luego de haber cargado todos los componentes
     */
    afterRender: function () {
        var me = this;
        me.setStoresGrids();

        Ext.getCmp(prototype.id0425downloadForm + '-pagginator-01').getCmpPaginator().on('beforechange', me.onPagingBeforeChange01, this);
    },
    onPagingBeforeChange01: function (obj, page, opts) {
        var me = this;
        obj.store.proxy.extraParams = me.bean;
    },
    setStoresGrids: function () {
        var grid01 = Ext.getCmp(prototype.id0425downloadForm + '-gridData');
        var store01 = Ext.create('Ext.data.Store', {
            proxy: {
                type: 'ajax',
                url: prototype.url + '/SearchReportADM/',
                timeout: '300000',
                reader: {
                    type: 'json',
                    rootProperty: 'data',
                    totalProperty: 'total'
                }
            },
            //autoLoad: true,
            pageSize: 25
        });
        grid01.setStore(store01);
        Ext.getCmp(prototype.id0425downloadForm + '-pagginator-01').setStore(store01);

    },
    onCmbSearchAfterRender: function (obj) {
        obj.setValue('');
    },
    onRendererColumnAttr: function (value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.tdAttr = 'data-qtip="' + value + '"';
        return value;
    },
    onColumnAmountRenderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.style = "background:#D5F4D5 !important";
        return Ext.util.Format.number(value, '0,000.00');
    },
    imgSearch_clickHandler: function (obj, e) {
        var me = this;
        var txtIATA = Ext.getCmp(prototype.id0425downloadForm + '-txtIATA').getValue();
        var txtFilterDateFrom = Ext.getCmp(prototype.id0425downloadForm + '-txtFilterDateFrom').getRawValue();
        var txtFilterDateTo = Ext.getCmp(prototype.id0425downloadForm + '-txtFilterDateTo').getRawValue();

        if (txtFilterDateFrom !== '') {
            if (txtFilterDateTo === '') {
                global.Msg({msg: 'Enter Date To'});
                return;
            }
        }
        if (txtFilterDateTo !== '') {
            if (txtFilterDateFrom === '') {
                global.Msg({msg: 'Enter Date From'});
                return;
            }
        }
        if (txtFilterDateFrom !== '' && txtFilterDateTo !== '') {

            if (global.existeFecha(txtFilterDateFrom) !== '') {
                Ext.MessageBox.alert('PRAXIS', global.existeFecha(txtFilterDateFrom), function (btn, text) {
                    if (btn === 'ok' || btn === 'cancel')
                        setTimeout("Ext.getCmp(prototype.id0425downloadForm + '-txtFilterDateFrom').focus();", 100);
                });
                return;
            }

            if (global.existeFecha(txtFilterDateTo) !== '') {
                Ext.MessageBox.alert('PRAXIS', global.existeFecha(txtFilterDateTo), function (btn, text) {
                    if (btn === 'ok' || btn === 'cancel')
                        setTimeout("Ext.getCmp(prototype.id0425downloadForm + '-txtFilterDateTo').focus();", 100);
                });
                return;
            }
        }

        me.bean.VP_OPCION = '4';
        me.bean.VP_PAIS = '';//cmbPais.selectedItem.data;
        me.bean.VP_DATEFROM = txtFilterDateFrom;
        me.bean.VP_DATETO = txtFilterDateTo;
        me.bean.VP_TYPE = 'TKT';
        me.bean.VP_TYPE = 'BA';
        me.bean.VP_IATA = txtIATA;
        /*
         * El valor obtenido del checkbox se interpreta de forma inversa para 
         * aprovechar el uso de la variable bexcel
         */
        me.bean.pexcel = Ext.getCmp(prototype.id0425downloadForm + '-pagination').getValue() ? 0 : 1;

        me.SearchReport(me.bean, obj === true ? obj : false);
    },
    SearchReportADM: function (bean, bExcel) {
        var me = this;
        if (bExcel) {
            me.exportExcel(prototype.url + '/getXLSX?beanString=' + encodeURI(JSON.stringify(bean)));
        } else {
            Ext.getCmp(prototype.id0425downloadForm + '-gridData').getStore().removeAll();
            Ext.getCmp(prototype.id0425downloadForm + '-gridData').getStore().loadPage(1, {
                params: bean,
                callback: function (records, operation, success) {
                    if (records.length !== 0) {

                        var Objtemp = records[0].data;
                        //win.setValue('txtTktTotal', Objtemp.A2548CANTIDAD);
                    } else {
                        global.Msg({msg: "Data not found.", icon: 2, fn: function () {
                            }});

                    }

                }
            });
        }
    },
    exportExcel: function (_path) {
        Ext.Msg.show({
            title: '.:PRAXIS:.',
            msg: 'Download Excel ?',
            buttons: Ext.MessageBox.OKCANCEL,
            scope: this,
            icon: Ext.MessageBox.QUESTION,
            modal: true,
            fn: function (btn) {
                if (btn === 'ok') {
                    global.getFile(_path);
                }
            }
        });
    },
    onTextKeypress: function (obj, e, eOpts) {
        if (e.getKey() === e.ENTER) {
            this.imgSearch_clickHandler();
        }
    },
    imgSerech_clickHandler: function () {
        this.imgSearch_clickHandler(false);
    },
    Processing_clickHandler: function (bean, bExcel) {
        var me = this;
         var txtIATA = Ext.getCmp(prototype.id0425downloadForm + '-txtIATA').getValue();
        var txtFilterDateFrom = Ext.getCmp(prototype.id0425downloadForm + '-txtFilterDateFrom').getRawValue();
        var txtFilterDateTo = Ext.getCmp(prototype.id0425downloadForm + '-txtFilterDateTo').getRawValue();

        if (txtFilterDateFrom !== '') {
            if (txtFilterDateTo === '') {
                global.Msg({msg: 'Enter Date To'});
                return;
            }
        }
        if (txtFilterDateTo !== '') {
            if (txtFilterDateFrom === '') {
                global.Msg({msg: 'Enter Date From'});
                return;
            }
        }
        if (txtFilterDateFrom !== '' && txtFilterDateTo !== '') {

            if (global.existeFecha(txtFilterDateFrom) !== '') {
                Ext.MessageBox.alert('PRAXIS', global.existeFecha(txtFilterDateFrom), function (btn, text) {
                    if (btn === 'ok' || btn === 'cancel')
                        setTimeout("Ext.getCmp(prototype.id0425downloadForm + '-txtFilterDateFrom').focus();", 100);
                });
                return;
            }

            if (global.existeFecha(txtFilterDateTo) !== '') {
                Ext.MessageBox.alert('PRAXIS', global.existeFecha(txtFilterDateTo), function (btn, text) {
                    if (btn === 'ok' || btn === 'cancel')
                        setTimeout("Ext.getCmp(prototype.id0425downloadForm + '-txtFilterDateTo').focus();", 100);
                });
                return;
            }
        }

        me.beanProc.VP_OPCION = '1';
        me.beanProc.VP_PAIS = '';//cmbPais.selectedItem.data;
        me.beanProc.VP_DATEFROM = txtFilterDateFrom;
        me.beanProc.VP_DATETO = txtFilterDateTo;
        me.beanProc.VP_TYPE = 'TKT';
        me.beanProc.VP_TYPE = 'BA';
        me.beanProc.VP_IATA = txtIATA;
        
        global.Msg({
            msg: 'Are you sure to Processing Data?',
            icon: 3,
            buttons: 3,
            fn: function (btn) {
                if (btn === 'yes') {
                    var mask = new Ext.LoadMask(Ext.getCmp(prototype.id0425downloadForm + '-Contenedor'), {
                        msg: 'Please Wait....'
                    });
                    mask.show();
                    Ext.Ajax.request({
                        url: prototype.url + '/ProcesarTKTATOS/',
                        timeout: 60000000,
                        method: 'POST',
                        params: {beanString: JSON.stringify(me.beanProc)},
                        success: function (response, options) {
                            mask.hide();
                            var res = Ext.JSON.decode(response.responseText);
                            if (res.length !== 0) {
                                if (res[0].data.VL_MENSAJE !== '') {
                                    vp_icon = 1;
                                }
                            }
                            //console.log(res.data);
                            var vp_icon = 0;

                            global.Msg({msg: res.data, icon: vp_icon, fn: function () {
                                    if (vp_icon === 1) {
                                        Ext.getCmp(prototype.id0425downloadForm + '-Contenedor').getController().onSearchClick();

                                    }


                                }});
                        }
                    });
                }

            }
        });


    },
});

