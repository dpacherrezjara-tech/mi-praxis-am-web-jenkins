Ext.define('Ext.Praxis.controller.payments.InputsTamiz.CalendarTmzDataEntryController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.CalendarTmzDataEntryController',
    searchUrl:CONTEXTPATH + '/InputsTmz/getCalendarFechaInfo',
    afterRender: function () {
        const view = this.view;
        console.log('params',view.searchParams);
//        this.getData();
        this.getAllData();
    },
    getAllData : async function( ){
       
        const me = this;
        me.view.setLoading(true);
        
        try {
            const gridCalendar = Ext.getCmp(prototype.id + '-grid-calendar-de01');
            const gridErrorControl = Ext.getCmp(prototype.id + '-grid-error-control-de01');
            const panelBPOComment = Ext.getCmp(prototype.id + '-panel-comment-de01');
            const panelErrorControl = Ext.getCmp(prototype.id + '-panel-error-control-de01');
            
            const res = await global.callStoreGet('PRAXISMP', 'SQP04975', me.view.searchParams);
            const dataOfCalendar = res.lstRs.at(0);
            let   dataOfBPOComment = res.lstRs.at(1);
            const dataOfErrorControl = res.lstRs.at(2);
            const { NUM_FILES, STS } = res.lstVals ;
            
            // collapse or expand
            if (dataOfBPOComment.length === 0) {
                // Nuevo
                dataOfBPOComment = [{
                    PRDA: me.view.searchParams.FECHA_FROM,
                    PROCTYPESQ: me.view.searchParams.TIPO,
                    OPTION: 'C',
                    NOTE: ''
                }];
                panelBPOComment.collapse();
            } else {
                // Ya existe comentario → se editará
                dataOfBPOComment = dataOfBPOComment.map(item => ({
                    ...item,
                    OPTION: 'U'
                }));
                
                const buttonDeleteComment = Ext.getCmp(prototype.id + '-btn-delete-comment');
                buttonDeleteComment.show();
                panelBPOComment.expand();
            }
            if ( dataOfErrorControl.length === 0) {
                panelErrorControl.collapse();
            } else {
                panelErrorControl.expand();
            }
            
            // setear data
            gridCalendar.setStore(dataOfCalendar);
            panelBPOComment.getForm().setValues(dataOfBPOComment[0]);
            gridErrorControl.setStore(dataOfErrorControl);
            
            console.log("data: ", { dataOfCalendar , dataOfBPOComment, dataOfErrorControl } ) ;
            
        } catch (e) {
            console.error(e);
        } finally {
            me.view.setLoading(false);
        }
    },
//    getData:async function(){
//        let me = this.view;
//        me.mask('Loading Data...');
//        console.log("me.searchParams",me.searchParams);
//        const data = await fetch(`${this.searchUrl}?${new URLSearchParams(me.searchParams)}`)
//                .then(async res => {
//                    if (res.ok) {
//                        const data = res.json();
//                        return data;
//                    }
//                    return [];
//                });
//        //console.log(data);
//        if(data.length === 0){
//            global.Msg({msg:'Data not found'});
//            me.close();
//            return;
//        }
//        let calendarInfo = Ext.create('Ext.data.Store', {
//            storeId: prototype.id + '-calendar-de-data',
//            //pageSize: 20,
//            proxy: {
//                type: 'memory',
//                //enablePaging: true
//            },
//            autoLoad: true,
//            autoSync: true,
//            data: data
//        });
//        Ext.getCmp(prototype.id + '-grid-calendar-de01').bindStore(calendarInfo);
//        me.unmask();
//    },
    onCancelClick:function(){
        this.view.close();  
    },
    
    //<editor-fold defaultstate="collapsed" desc="Comment of BPO">
    onSaveCommentClick: function(){
        const me = this;
        const form = Ext.getCmp(prototype.id + '-panel-comment-de01');
        const values = form.getForm().getValues();

        console.log("values", values);
        me.SendDataCommentBPO(values);
    },
    onDeleteCommentClick:  function(){
        const me = this;
        const form = Ext.getCmp(prototype.id + '-panel-comment-de01');
        const values = form.getForm().getValues();
        values.OPTION = "D" ;
        console.log("values", values);

        me.SendDataCommentBPO(values);
//        me.view.close();
    },
    SendDataCommentBPO: async function (params){
        const me = this;
        let success = false;
        let message = "" ;
        let notifier = new AWN();
        
        me.view.setLoading(true);
        
        try {
            
            const parameters = {
                IN_CCUST : "139",
                IN_PRDA : params.PRDA,
                IN_PROCTYPESQ: params.PROCTYPESQ,
                IN_OPTION : params.OPTION,
                IN_NOTE : params.NOTE
            }
            console.log('parameters',parameters);
            
            const res = await global.callStorePost('PRAXISMP', 'SQP05714 ', parameters);
            console.log(res);
            
            success = res.data.lstVals.IO_RESPONSE === 1 ;
            message = res.data.lstVals.IO_MESSAGE ;
            
            if ( success ) {
                notifier.success(message);
            }else{
                notifier.warning('Error: ' + message);        
            }
            
        } catch (e) {
            console.log(e) ;
            notifier.alert('System Error');
        }
        finally {
            me.view.setLoading(false);
            me.getAllData();
        }
    },
    //</editor-fold>
});
