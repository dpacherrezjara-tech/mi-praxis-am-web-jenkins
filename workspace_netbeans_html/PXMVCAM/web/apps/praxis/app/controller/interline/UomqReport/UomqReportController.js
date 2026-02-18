Ext.define('Ext.Praxis.controller.interline.UomqReport.UomqReportController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.UomqReportController',
    afterRender: function() {
        this.getData();
    },
    onSearchHandler:function(){
        this.getData();
    },
    getData:function(){
        const params = Ext.getCmp(prototype.id + '-formFilters').getForm().getValues();
        
        const mainPanel = Ext.getCmp(prototype.id + '-mainContent');
        mainPanel.removeAll();
        
        const gridData = Ext.create('Ext.Praxis.view.interline.UomqReportForm.Grids.UomqReportGrid',{
            id: prototype.id + '-UomqReportGrid-1',
            searchParams: params
        });
        mainPanel.add(gridData);
    },
    onProcessClick: function(){
        const newWin = Ext.create('Ext.Praxis.view.interline.UomqReportForm.DataEntrys.UoqmReportProcessDataEntry',{
            id: prototype.id + '-UoqmReportProcessDataEntry-1'
        });
        newWin.show();
    },
    onClearFilters: function(){
        Ext.getCmp(prototype.id + '-formFilters').getForm().reset();
    }
});
