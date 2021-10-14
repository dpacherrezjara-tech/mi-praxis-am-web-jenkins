/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.controller.salesaudit.MassiveRefunduatpForm.MassiveRefunduatpFormTicketController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.MassiveRefunduatpFormTicketController',
    beanINI: {},
    beanIniTem: {},
    beanHistorical: {},
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
        me.setStores();
        me.onLoadData();
        me.onLoadDataGrid();
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
    }    


});

