/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/JSP_Servlet/JavaScript.js to edit this template
 */

Ext.define('Ext.Praxis.controller.flown.SimplifiedUsageFileControl.SimplifiedUsageFileControlDetailErrorController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.SimplifiedUsageFileControlDetailErrorController',
    me: '',
    init: function () {
        
    },
    afterRender: function () {
        console.log('this.view.params>>', this.view.params);
        this.search();
    },
    btnSearch_click: function () {
        this.search();
    },
    onCancelClick:function(){
       Ext.getCmp(prototype.id01 + '-DetailError').close();  
    },
    search: function () {
        var p = this.view.params;
        var bean = {};
        bean.VP_FECHA = p.rec.data.FECHA; // Ext.util.Format.date(p.rec.data.FECHA, 'Ymd'); 

        var storeGridDatas = Ext.create('Ext.Praxis.store.eecta.SalesList.GridData', {
            proxy: {
                url: prototype.url + '/detail-error'
            },
            listeners: {
                beforeload: function (obj) {
                    obj.proxy.extraParams = bean;
                },
                load: function (obj) {
                    win.lblUser_toolTip("Estructura: A4738");
                    global.clear();
                    // <editor-fold defaultstate="collapsed" desc="paggin">
//                    var pag = Ext.getCmp(prototype.id01 + '-paggin');
//                    var pagData = pag.getPageData();
//                    var currentPage = Ext.util.Format.number(pagData.currentPage, '0,000');
//                    var pageCount = Ext.util.Format.number(pagData.pageCount, '0,000');
//                    var total = Ext.util.Format.number(pagData.total, '0,000');
//                    Ext.getCmp(prototype.id01 + '-lbl-currentPage').setText(currentPage);
//                    Ext.getCmp(prototype.id01 + '-lbl-pageCount').setText(pageCount);
//                    Ext.getCmp(prototype.id01 + '-lbl-total').setText(total);
                    // </editor-fold>
                    if (obj.data.length === 0) {
                        global.Msg({
                            msg: 'Data not found'
                        });
                    }

                }
            }
        });
        var panel = Ext.getCmp(prototype.id01 + '-contenedor-grid');

        panel.removeAll();
        var gridPanel = Ext.create({
            region: 'center',
            xtype: prototype.id01 + '-infoGridDetError',
            id: prototype.id01 + '-contentInfo'
        });
        panel.add(gridPanel);
        Ext.getCmp(prototype.id01 + '-gridData').setStore(storeGridDatas);
        //Ext.getCmp(prototype.id01 + '-paggin').bindStore(storeGridDatas);
    }
});
