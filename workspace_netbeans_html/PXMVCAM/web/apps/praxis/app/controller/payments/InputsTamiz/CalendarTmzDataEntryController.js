Ext.define('Ext.Praxis.controller.payments.InputsTamiz.CalendarTmzDataEntryController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.CalendarTmzDataEntryController',
    searchUrl:CONTEXTPATH + '/InputsTmz/getCalendarFechaInfo',
    afterRender: function () {
//        const view = this.view;
//        console.log('params',view.searchParams);
        this.getData()
    },
    getData:async function(){
        let me = this.view;
        me.mask('Loading Data...');
        const data = await fetch(`${this.searchUrl}?${new URLSearchParams(me.searchParams)}`)
                .then(async res => {
                    if (res.ok) {
                        const data = res.json();
                        return data;
                    }
                    return [];
                });
        //console.log(data);
        if(data.length === 0){
            global.Msg({msg:'Data not found'});
            me.close()
            return;
        }
        let calendarInfo = Ext.create('Ext.data.Store', {
            storeId: prototype.id + '-calendar-de-data',
            //pageSize: 20,
            proxy: {
                type: 'memory',
                //enablePaging: true
            },
            autoLoad: true,
            autoSync: true,
            data: data
        });
        Ext.getCmp(prototype.id + '-grid-calendar-de01').bindStore(calendarInfo);
        me.unmask()
    },
    onCancelClick:function(){
      this.view.close();  
    }
});
