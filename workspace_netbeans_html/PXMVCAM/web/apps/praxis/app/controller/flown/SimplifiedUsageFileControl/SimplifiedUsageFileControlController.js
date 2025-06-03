/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/JSP_Servlet/JavaScript.js to edit this template
 */

Ext.define('Ext.Praxis.controller.flown.SimplifiedUsageFileControl.SimplifiedUsageFileControlController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.SimplifiedUsageFileControlController',
    me: '',
    init: function () {
        me = this;
    },
    afterRender: function () {
        this.search();
    },
    btnSearch_click: function () {
        this.search();
    },
    search: function () {

        Ext.getCmp(prototype.id + '-boxPaginacion').show();
        var bean = {};
        bean.VP_STAT = Ext.getCmp(prototype.id + '-cmbfiltroEstado').getValue();
        bean.VP_FECHADESDE = Ext.util.Format.date(Ext.getCmp(prototype.id + '-fecha1').getValue(), 'Ymd');
        bean.VP_FECHAHASTA = Ext.util.Format.date(Ext.getCmp(prototype.id + '-fecha2').getValue(), 'Ymd');
        var storeGridDatas = Ext.create('Ext.Praxis.store.eecta.SalesList.GridData', {
            proxy: {
                url: prototype.url + '/search'
            },
            listeners: {
                beforeload: function (obj) {
                    obj.proxy.extraParams = bean;
                },
                load: function (obj, obj2, success, obj4, obj5) {
                    win.lblUser_toolTip("Estructura: A4737");
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
        var panel = Ext.getCmp(prototype.id + '-contenedor-grid');
        panel.removeAll();
        var gridPanel = Ext.create({
            region: 'center',
            xtype: prototype.id + '-info',
            id: prototype.id + '-contentInfo'
        });
        panel.add(gridPanel);
        Ext.getCmp(prototype.id + '-gridData').setStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin').bindStore(storeGridDatas);
    },   
    
    onDetailErrorClick: function(grid, rowIndex, colIndex) {
        var rec = grid.getStore().getAt(rowIndex);
        this.winDataEntry('U', rec);
    },
    winDataEntry: function(action, rec) {
        action = action === null || action === undefined ? 'U' : action;
        rec = rec === null || rec === undefined ? {} : rec;
//        console.log(rec);
        Ext.create('Ext.Praxis.view.flown.SimplifiedUsageFileControlForm.SimplifiedUsageFileControlDetailError', {
            id: prototype.id01 + '-DetailError',
            params: {
                action: action,
                rec: rec
            }
        }).show();
    }
});
