Ext.define('Ext.Praxis.controller.payments.SalesReconciliationControl.ChangeStandByCommentDataEntryController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.ChangeStandByCommentDataEntryController',
    
    onAfterRender: function () {
        const me = this;
        const combo = Ext.getCmp(prototype.idDE + '-cmbCommentCode');
        const form = Ext.getCmp(prototype.idDE + '-changeStandByCommentForm');

        const data = me.view.standByComment || [];
        
        if (combo && combo.getStore()) {
            // Cargar la lista de comentarios Stand By que viene desde TransacErrorBPODataEntryController
            combo.getStore().loadData(data);
            
            // Si existe un código actual en el bean, lo seleccionamos por defecto
            const bean = me.view.obj || {};
            const currentCode = bean.CODE_COMMENT || bean.CODE || null;
            
            if (currentCode) {
                combo.setValue(currentCode);
            }

            // Commentario adicional
            const autoComment = bean.BPOCOMMENT || bean.bpocoment || '';
        
            if (autoComment.includes('|')) {
                // Dividimos por el pipe
                const parts = autoComment.split('|');
                
                if (parts.length > 1) {
                    const extraText = parts[1].trim();
                    form.getForm().setValues({
                        ADD_COMMENT: extraText
                    });
                }
            }
        }
    },
    
    onExecuteClick: async function() {
        const me = this;
        const form = Ext.getCmp(prototype.idDE + '-changeStandByCommentForm');
        // const combox = Ext.getCmp(prototype.idDE + '-cmbCommentCode');
        
        // Obtener todos los valores del formulario en un objeto
        const values = form.getForm().getValues();

        if (values.CODE_COMMENT === '' && values.ADD_COMMENT.trim() === ''){
            global.Msg({msg: 'Please select a comment or add comment'});
            return;
        }
        
        // Obtener los parámetros del objeto bean pasado al diálogo
        const bean = me.view.obj;
        if (!bean) {
            global.Msg({msg: 'Error: No data found'});
            return;
        }
        
        // Preparar los parámetros para el stored procedure
        // Los campos del bean pueden venir en minúsculas o mayúsculas
        const params = {
            IN_CCUST: bean.CCUST || bean.ccust || '139',
            IN_TDOC: (bean.TDOC || bean.tdoc || '').toString().trim(),
            IN_PRDA: (bean.PRDA || bean.prda || '').toString().trim(),
            IN_AREFNBR: (bean.AREFNBR || bean.arefnbr || '').toString().trim(),
            IN_CODE_COMMENT: values.CODE_COMMENT || '', //combox.getValue(),
            IN_ADD_COMMENT: values.ADD_COMMENT || '',
            IO_RESPONSE: 0,
            IO_MESSAGE: 'Not Found'
        };
        
        me.view.setLoading(true);
        
        let responseCode, message;

        try {
            const res = await global.callStorePost('PRAXISMP', 'SQP05841', params);
                        
            responseCode = parseInt(res.data.lstVals.IO_RESPONSE, 10);
            message = res.data.lstVals.IO_MESSAGE;
            
        } catch (error) {
            console.error('Error of process: ', error);
            global.Msg({msg: 'Error of process: ' + (error.message || 'Unknown error')});
        } finally {
            me.view.setLoading(false);
        }

        if (responseCode === 1) {
            // Success
            Ext.toast({
                html: `<b>${message}</b>`,
                title: 'Success',
                align: 't',
                closable: true,
                width: 350,
                timeout: 5000
            });

            // Si hay una función de callback para recargar datos, ejecutarla
            if (me.view.callback && typeof me.view.callback === 'function') {
                me.view.callback();
            }

            me.view.close();
        } else {
            // Cualquier otro valor lo consideramos error genérico
            global.Msg({ msg: message  });
        }

    },
    
    onCancelClick: function() {
        this.view.close();
    }
});

