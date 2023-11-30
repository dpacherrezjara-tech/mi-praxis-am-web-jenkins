Ext.define('Ext.Praxis.controller.program.CtrlControlLoadARCVoidController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.CtrlControlLoadARCVoidController',
    bean: {},
    PROCESS_OK: 0,
    PROCESS_ERROR: 1,
    init: function(view) {
        prototype.ControlLoadARC = {
            id: 'CtrlControlLoadARCVoidForm',
            url: CONTEXTPATH+'/CtrlControlLoadARCVoid'
        };
    },
    startDisplay: function () {
        me.processLoadARCHOT(this.bean);
        Ext.getCmp(prototype.ControlLoadARC.id+'-btnAccept').hide();
        Ext.getCmp(prototype.ControlLoadARC.id+'-lblMsg').setText('');
    },
    btnAccept_clickHandler: function () {
        Ext.getCmp('CtrlControlLoadARCVoidForm').hide();
    },
    displayMesagge: function (process) {
        switch(process){
            case this.PROCESS_OK:
                Ext.getCmp(prototype.ControlLoadARC.id+'-lblMsg').setStyle('color', '#039318');
                Ext.getCmp(prototype.ControlLoadARC.id+'-lblMsg').setText('Load ARC HOT - OK (Records: ' + this.bean.OU_QTYREG + ')');
                break;
            case this.PROCESS_ERROR:
                Ext.getCmp(prototype.ControlLoadARC.id+'-lblMsg').setStyle('color', '#FF0000');
                Ext.getCmp(prototype.ControlLoadARC.id+'-lblMsg').setText('Load ARC HOT - Error ID File');
                break;
        }
        Ext.getCmp(prototype.ControlLoadARC.id+'-btnAccept').show();
    }
});


