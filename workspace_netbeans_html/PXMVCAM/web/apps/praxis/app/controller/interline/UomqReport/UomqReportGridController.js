Ext.define('Ext.Praxis.controller.interline.UomqReport.UomqReportGridController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.UomqReportGridController',
    afterRender: function() {
        this.getData();
    },
    getData: async function(){
        const me = this;
        try{
            const res = global.callStorePaggin('PRAXIS','SQP06004',me.view.searchParams);
            me.view.setStore(res);
        }catch (e){
            console.error(e);
        }
    },
    loadGroup: function(grid, td, rowIndex, cellIndex, e, record, tr, eOpts){
        const dataEntry = Ext.create('Ext.Praxis.view.interline.UomqReportForm.DataEntrys.UomqReportGroupDataEntry', {
            id: prototype.id + '-UomqReportGroupDataEntry-1',
            obj: record.data
        });
        dataEntry.show();
    }
});
