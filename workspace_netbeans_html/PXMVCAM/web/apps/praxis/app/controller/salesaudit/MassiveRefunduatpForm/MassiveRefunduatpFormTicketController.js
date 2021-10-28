/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.controller.salesaudit.MassiveRefunduatpForm.MassiveRefunduatpFormTicketController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.MassiveRefunduatpFormTicketController',
    beanguardar: {},
    totalcpn: 0,
    totalcpnuse: 0,
    beanTMP: {},
    urlWin01: CONTEXTPATH + '/MassiveRefunduatpForm',
    init: function (view) {
        var me = this;
    },
    onClickCancel: function (btn) {
        var me = this;
        me.view.close();
    },
    onColumnAirlineRenderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
        var me = this;
        metaData.style = "background:#D5F4D5 !important";
        me.onSumaTaxGrid();
        return Ext.util.Format.number(value, '0,000.00');
    },
    OnAirlineSummary: function (value, summaryData, dataIndex) {
        return Ext.util.Format.number(parseFloat(value), '0,000.00');
    },
    afterRender: function () {
        var me = this;
        me.setStoresFilters();
        me.setStores();
        me.onLoadData();
        me.onLoadDataGrid();
    },
    setStoresFilters: function () {
        var ComboEstatus = Ext.getCmp(prototype.idMassiveRefunduatpFormTicket + '-ComboCambio');
        
        ComboEstatus.bindStore(Ext.create('Ext.data.Store', {
            data: [
                {"code": "", "name": "SELECT"},
                {"code": "M", "name": "MODIFIED"},
                {"code": "R", "name": "REJECT"}
            ]
        }));

    },
    setStores: function () {
        var grid01 = Ext.getCmp(prototype.idMassiveRefunduatpFormTicket + '-gridPAYMENT');
        var grid02 = Ext.getCmp(prototype.idMassiveRefunduatpFormTicket + '-gridListTaxes');

        var store01 = Ext.create('Ext.data.Store', {
            storeId: prototype.idMassiveRefunduatpFormTicket + '-store-grid01'
        });
        var store02 = Ext.create('Ext.data.Store', {
            storeId: prototype.idMassiveRefunduatpFormTicket + '-store-grid02'
        });

        grid01.setStore(store01);
        grid02.setStore(store02);

    },
    onLoadData: function () {
        var me = this;
        var vl_STAT = '';
        var vl_FLAG = '';
        rec = me.view.params.rec;
        switch (String(rec.get('A4076STAT'))) {
            case 'Y':
                vl_STAT = 'PENDING';
                break;
            case 'E':
                vl_STAT = 'SEND BPO';
                break;
            case 'F':
                vl_STAT = 'CAPTURED BPO';
                break;
        }

        switch (String(rec.get('A4076FLAG'))) {
            case 'Y':
                vl_FLAG = 'PENDING';
                break;
            case 'A':
                vl_FLAG = 'APPROVED';
                break;
            case 'E':
                vl_FLAG = 'SALES DATE ERROR';
                break;
            case 'U':
                vl_FLAG = 'WITH USES';
                break;
            case 'D':
                vl_FLAG = 'DUPLICATE TICKET';
                break;
            case 'T':
                vl_FLAG = 'ATO ERROR';
                break;
            case 'B':
                vl_FLAG = 'TAX ERROR';
                break;
        }

        Ext.getCmp(prototype.idMassiveRefunduatpFormTicket + '-txtfolio').setValue(rec.get('A4076PREME') + '-' + rec.get('A4076ANIO'));
        Ext.getCmp(prototype.idMassiveRefunduatpFormTicket + '-txttkt').setValue(rec.get('A4076TICKET'));
        Ext.getCmp(prototype.idMassiveRefunduatpFormTicket + '-txttrnc').setValue(rec.get('A4076TRNCO'));
        Ext.getCmp(prototype.idMassiveRefunduatpFormTicket + '-txtType').setValue(rec.get('A4076TYPE'));
        Ext.getCmp(prototype.idMassiveRefunduatpFormTicket + '-txtBase').setValue(rec.get('A4076BASE'));
        Ext.getCmp(prototype.idMassiveRefunduatpFormTicket + '-txtRefe').setValue(rec.get('A4076REFE'));
        Ext.getCmp(prototype.idMassiveRefunduatpFormTicket + '-txtStatus').setValue(vl_FLAG);
        Ext.getCmp(prototype.idMassiveRefunduatpFormTicket + '-txtBPO').setValue(vl_STAT);
        Ext.getCmp(prototype.idMassiveRefunduatpFormTicket + '-txtAudit').setValue(rec.get('A4076REGIS'));
        Ext.getCmp(prototype.idMassiveRefunduatpFormTicket + '-txtIssdate').setValue(rec.get('A4076FVTA'));
        Ext.getCmp(prototype.idMassiveRefunduatpFormTicket + '-txtSystemDate').setValue(rec.get('A4076FREGI'));
        Ext.getCmp(prototype.idMassiveRefunduatpFormTicket + '-txttidoc').setValue(rec.get('A4076TDOC'));
        // montos
        Ext.getCmp(prototype.idMassiveRefunduatpFormTicket + '-txtFaremda').setValue(rec.get('A4076MDA'));
        Ext.getCmp(prototype.idMassiveRefunduatpFormTicket + '-txtFare').setValue(Ext.util.Format.number(rec.get('A4076TARTK'), '0,000.00'));
        Ext.getCmp(prototype.idMassiveRefunduatpFormTicket + '-txtEquivamda').setValue(rec.get('A4076MONTT'));
        Ext.getCmp(prototype.idMassiveRefunduatpFormTicket + '-txtFarEquiv').setValue(Ext.util.Format.number(rec.get('A4076EQVTK'), '0,000.00'));
        Ext.getCmp(prototype.idMassiveRefunduatpFormTicket + '-txtTotalTax').setValue(Ext.util.Format.number(rec.get('A4076TTAX'), '0,000.00'));
        Ext.getCmp(prototype.idMassiveRefunduatpFormTicket + '-txtTotal').setValue(Ext.util.Format.number(rec.get('A4076NETO'), '0,000.00'));
        Ext.getCmp(prototype.idMassiveRefunduatpFormTicket + '-txtCommi1').setValue(Ext.util.Format.number(rec.get('A4076COMI'), '0,000.00'));
        Ext.getCmp(prototype.idMassiveRefunduatpFormTicket + '-txtTcambi1').setValue(Ext.util.Format.number(rec.get('A4076TCMBC'), '0,000.00'));
        Ext.getCmp(prototype.idMassiveRefunduatpFormTicket + '-txtToca1').setValue(Ext.util.Format.number(rec.get('A4076TAXCO'), '0,000.00'));
        Ext.getCmp(prototype.idMassiveRefunduatpFormTicket + '-txtTcambi2').setValue(Ext.util.Format.number(rec.get('A4076TCMBT'), '0,000.00'));

    },

    onLoadDataGrid: function () {
        var me = this;
        rec = me.view.params.rec;


        Ext.getCmp(prototype.idMassiveRefunduatpFormTicket + '-win').mask('Please Wait....');
        Ext.Ajax.request({
            url: me.urlWin01 + '/SearchUATPRFNDetail/',
            method: 'POST',
            timeout: '300000',
            params: {
                IN_PREME: Ext.String.trim(rec.get('A4076PREME')),
                IN_ANIO: Ext.String.trim(rec.get('A4076ANIO')),
                IN_CORR: rec.get('A4076CORR')
            },
            success: function (response, options) {
                Ext.getCmp(prototype.idMassiveRefunduatpFormTicket + '-win').unmask();
                var res = Ext.JSON.decode(response.responseText);

                Ext.getCmp(prototype.idMassiveRefunduatpFormTicket + '-gridPAYMENT').getStore().removeAll();
                Ext.getCmp(prototype.idMassiveRefunduatpFormTicket + '-gridPAYMENT').getStore().loadData(res.lst_FOP);

                Ext.getCmp(prototype.idMassiveRefunduatpFormTicket + '-gridListTaxes').getStore().removeAll();
                Ext.getCmp(prototype.idMassiveRefunduatpFormTicket + '-gridListTaxes').getStore().loadData(res.lst_TAXES);

            }
        });
    },
    OnAmountSummary: function (value, summaryData, dataIndex) {
        return Ext.util.Format.number(value, '0,000.00');
    },
    onColumnAmountRenderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.style = "background:#D5F4D5 !important";
        return Ext.util.Format.number(value, '0,000.00');
    },
    onClickSave: function (btn) {
        var me = this;
        rec = me.view.params.rec;

        var lstTaxes = new Array();
        var lstFop = new Array();
        var txtRefe = Ext.getCmp(prototype.idMassiveRefunduatpFormTicket + '-txtRefe').getValue();
        var txtIssdate = Ext.getCmp(prototype.idMassiveRefunduatpFormTicket + '-txtIssdate').getValue();
        var txttidoc = Ext.getCmp(prototype.idMassiveRefunduatpFormTicket + '-txttidoc').getValue();
        var ComboEstatus = Ext.getCmp(prototype.idMassiveRefunduatpFormTicket + '-ComboCambio').getValue();
        var txtArgument = Ext.getCmp(prototype.idMassiveRefunduatpFormTicket + '-Argument').getValue();
        var txttkt = Ext.getCmp(prototype.idMassiveRefunduatpFormTicket + '-txttkt').getValue();
        //
        var txtFaremda = Ext.getCmp(prototype.idMassiveRefunduatpFormTicket + '-txtFaremda').getValue();
        var txtFare = Ext.getCmp(prototype.idMassiveRefunduatpFormTicket + '-txtFare').getValue().replace(',', '');
        var txtEquivamda = Ext.getCmp(prototype.idMassiveRefunduatpFormTicket + '-txtEquivamda').getValue();
        var txtFarEquiv = Ext.getCmp(prototype.idMassiveRefunduatpFormTicket + '-txtFarEquiv').getValue().replace(',', '');
        var txtTotalTax = Ext.getCmp(prototype.idMassiveRefunduatpFormTicket + '-txtTotalTax').getValue().replace(',', '');
        var txtTotal = Ext.getCmp(prototype.idMassiveRefunduatpFormTicket + '-txtTotal').getValue().replace(',', '');
        //
        var txtCommi1 = Ext.getCmp(prototype.idMassiveRefunduatpFormTicket + '-txtCommi1').getValue().replace(',', '');
        var txtToca1 = Ext.getCmp(prototype.idMassiveRefunduatpFormTicket + '-txtToca1').getValue().replace(',', '');



        for (var i = 0; i < Ext.getCmp(prototype.idMassiveRefunduatpFormTicket + '-gridListTaxes').getStore().data.length; i++) {
            var bean = Ext.getCmp(prototype.idMassiveRefunduatpFormTicket + '-gridListTaxes').getStore().data.items[i].data;
            lstTaxes.push(bean);
        }
        for (var i = 0; i < Ext.getCmp(prototype.idMassiveRefunduatpFormTicket + '-gridPAYMENT').getStore().data.length; i++) {
            var bean = Ext.getCmp(prototype.idMassiveRefunduatpFormTicket + '-gridPAYMENT').getStore().data.items[i].data;
            lstFop.push(bean);
        }
        //F CAPTURED BPO Y A APPROVED
        if (ComboEstatus === '') {
            Ext.Msg.alert('.: PRAXIS :.', 'Select of Estatus ');
            return;
        }
        if (String(rec.get('A4076STAT')) === 'F' && String(rec.get('A4076FLAG')) === 'A') {
            Ext.Msg.alert('.: PRAXIS :.', 'It cannot be modified as it has captured usage in PRAXIS');
            return;
        }

        me.beanguardar.IN_PREME = Ext.String.trim(rec.get('A4076PREME'));
        me.beanguardar.IN_ANIO = Ext.String.trim(rec.get('A4076ANIO'));
        me.beanguardar.IN_CORR = Ext.String.trim(rec.get('A4076CORR'));
        //
        me.beanguardar.A4076REFE = txtRefe;
        me.beanguardar.A4076FVTA = txtIssdate;
        me.beanguardar.A4076TDOC = txttidoc;
        me.beanguardar.A4076MDA = txtFaremda;
        me.beanguardar.A4076TARTK = txtFare;
        me.beanguardar.A4076MONTT = txtEquivamda;
        me.beanguardar.A4076EQVTK = txtFarEquiv;
        me.beanguardar.A4076TTAX = txtTotalTax;
        me.beanguardar.A4076NETO = txtTotal;
        me.beanguardar.A4076COMI = txtCommi1;
        me.beanguardar.A4076TAXCO = txtToca1;
        me.beanguardar.IN_STATUS=ComboEstatus;
        me.beanguardar.A4076DESC=txtArgument;
        me.beanguardar.IN_TICKET=txttkt;
        
        
        var mask = new Ext.LoadMask(Ext.getCmp(prototype.idMassiveRefunduatpFormTicket + '-win'), {
            msg: 'Please Wait....'
        });
        mask.show();
        //
        Ext.Ajax.request({
            url: me.urlWin01 + '/ProcesaManualUATP/',
            timeout: 60000000,
            method: 'POST',
            params: {beanString: JSON.stringify(me.beanguardar),
                     beanlstTaxes: JSON.stringify(lstTaxes),
                     beanlstlstFop: JSON.stringify(lstFop)
            },
            success: function (response, options) {
                mask.hide();
                var res = Ext.JSON.decode(response.responseText);
                //console.log(res.data);
                var vp_icon = 0;
                if (res.data === 'RECORD INSERTED') {
                    vp_icon = 1;
                }
                global.Msg({msg: res.data, icon: vp_icon, fn: function () {
                        if (vp_icon === 1) {
                            Ext.getCmp(prototype.idMassiveRefunduatpFormTicket + '-win').close();
                            Ext.getCmp(prototype.idMassiveRefunduatpForm + '-Contenedor').getController().onSearchClick();
                        }


                    }});
            }
        });


    }


});

