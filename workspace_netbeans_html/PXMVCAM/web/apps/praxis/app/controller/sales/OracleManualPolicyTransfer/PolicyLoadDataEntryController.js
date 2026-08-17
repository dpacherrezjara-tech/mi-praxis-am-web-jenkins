Ext.define('Ext.Praxis.controller.sales.OracleManualPolicyTransfer.PolicyLoadDataEntryController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.PolicyLoadDataEntryController',
    notifier: new AWN(),

    afterRender: async function () {
        const me = this;
        const view = me.getView();
        const comboModules = Ext.getCmp(prototype.idDE + '-cmbModule');

        let dataModules = (view.dataModules || []).filter(function (m) {
            return (m.CODE || '').toString().trim() !== '';
        });
        
        // Add value default "Selected" option at the beginning
        dataModules.unshift({
            CODE: '',
            NAME: 'Selected'
        });

        await global.setComboStore(comboModules, dataModules, 'CODE', 'NAME', '', false);

    },

    onProcessClick: function () {
        Ext.Msg.show({
            title: '.:PRAXIS:.',
            msg: 'Are you sure you want to process the selected file(s)?',
            buttons: Ext.MessageBox.YESNO,
            scope: this,
            icon: Ext.MessageBox.QUESTION,
            modal: true,
            fn: function (btn) {
                if (btn === 'yes') {
                    this.process();
                }
            }
        });
    },

    // El nombre del .zip siempre inicia con la fecha de proceso, ej. 20260209_DIFFC_114435.zip
    extractFprocFromFilename: function (filename) {
        const match = (filename || '').match(/^(\d{8})/);
        return match ? match[1] : '';
    },

    // Lineas por fila de PRAXIS.XTEMPO. Antes se subia 1 fila por linea (miles de INSERT individuales
    // via global.loadRecordsOnTable, el cuello de botella real de la carga); ahora se agrupan en
    // bloques para que sean muchas menos filas/INSERT. global.loadRecordsOnTable NO cambia -- sigue
    // siendo 1 fila de XTEMPO por cada elemento de la lista que se le pase, sea cual sea su forma.
    XTEMPO_CHUNK_SIZE: 500,

    // Mide cuanto tarda cada paso -- util mientras se hacen pruebas de carga con archivos grandes,
    // para saber si el tiempo se va en leer/descomprimir, en subir a XTEMPO, o en el proceso del SP.
    logStepTime: function (label, startMs) {
        const seconds = ((Date.now() - startMs) / 1000).toFixed(1);
        console.log('[OracleManualPolicyTransfer] ' + label + ': ' + seconds + 's');
    },

    process: async function () {
        const me = this;
        const view = me.getView();
        const form = Ext.getCmp(prototype.idDE + '-loadForm').getForm();
        const params = form.getValues();
        const tTotal = Date.now();

        if (!params.IN_MODULE) {
            me.notifier.alert('Select a Module');
            return;
        }

        const fileInput = Ext.getCmp(prototype.idDE + '-zipFiles').fileInputEl.dom;
        const files = fileInput.files;
        if (!files || files.length === 0) {
            me.notifier.alert('Select at least one .zip file');
            return;
        }

        const progressBar = Ext.getCmp(prototype.idDE + '-progressBar');

        view.setLoading(true);

        try {
            // 1) Registrar el LOTE una sola vez en la cola (A1955/A1956) -- MODULE/FPROC son por archivo,
            // no se le pasan a este SP (SQP06148 solo usa la fecha de registro del lote, V_FECHA).
            progressBar.updateProgress(0, 'Registering batch...');

            const registerRes = await global.callStorePost('PRAXIS', 'SQP06148', {
                IN_CCUST: '139'
            });
            const registerVals = (registerRes && registerRes.data && registerRes.data.lstVals) ? registerRes.data.lstVals : {};
            const envio = (registerVals.IO_ENVIO || '').toString().trim();

            if (!envio || (registerVals.IO_RESPONSE !== 1 && registerVals.IO_RESPONSE !== '1')) {
                me.notifier.alert('Could not register upload batch');
                return;
            }

            // 2) Descomprimir cada archivo y subir sus lineas a XTEMPO -- un CUUID/FUUID por archivo.
            // NAMEZIP/MODULE/FPROC viajan repetidos en cada linea porque SQP06144 no los recibe como parametro.
            const cuuidFuuidPairs = [];
            let readErrCount = 0;

            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                progressBar.updateProgress(i / files.length, 'Reading ' + file.name + ' (' + (i + 1) + ' of ' + files.length + ')');

                try {
                    const fprocValue = me.extractFprocFromFilename(file.name);
                    if (!fprocValue) {
                        readErrCount++;
                        console.warn('Could not extract process date from file name ' + file.name);
                        continue;
                    }

                    let t = Date.now();
                    const unzipped = await global.unzipFile(file);
                    me.logStepTime('Unzip ' + file.name, t);

                    t = Date.now();
                    const allLines = [];

                    unzipped.entries.forEach(function (entry) {
                        if (!entry.filename || !entry.filename.toLowerCase().endsWith('.txt')) {
                            return;
                        }
                        const lines = entry.content.split(/\r?\n/);
                        lines.forEach(function (line, idx) {
                            allLines.push({
                                FOLDER: entry.folder,
                                FILENAME: entry.filename,
                                LINENUM: idx + 1,
                                CONTENT: line
                            });
                        });
                    });

                    // Agrupar en bloques de XTEMPO_CHUNK_SIZE lineas -- 1 elemento de lst = 1 fila de
                    // XTEMPO con un bloque de lineas adentro, en vez de 1 fila de XTEMPO por linea.
                    const lst = [];
                    for (let c = 0; c < allLines.length; c += me.XTEMPO_CHUNK_SIZE) {
                        lst.push({
                            NAMEZIP: file.name,
                            MODULE: params.IN_MODULE,
                            FPROC: fprocValue,
                            LINES: allLines.slice(c, c + me.XTEMPO_CHUNK_SIZE)
                        });
                    }
                    me.logStepTime('Build ' + allLines.length + ' line(s) in ' + lst.length + ' block(s) ' + file.name, t);

                    if (allLines.length === 0) {
                        readErrCount++;
                        console.warn('No .txt entries found in ' + file.name);
                        continue;
                    }

                    t = Date.now();
                    const loadResult = await global.loadRecordsOnTable('PRAXIS', 'XTEMPO', lst);
                    me.logStepTime('Upload to XTEMPO ' + file.name, t);

                    if (!loadResult.success) {
                        readErrCount++;
                        continue;
                    }

                    cuuidFuuidPairs.push(loadResult.cuuid + ',' + loadResult.fuuid);
                } catch (e) {
                    console.error('Error reading file ' + file.name, e);
                    readErrCount++;
                }
            }

            if (cuuidFuuidPairs.length === 0) {
                me.notifier.alert('No file could be read');
                return;
            }

            // 3) Procesar TODO el lote de un jalon: SQP06144 desglosa el concatenado con FN_SPLIT_2D,
            // registra PRAXIS.A4988 (uno por archivo) + PRAXIS.A4989 (detalle) para cada CUUID/FUUID, y al
            // final marca el lote como 'N' Pending en A1955/A1956 (ya no es un paso/SP aparte).
            progressBar.updateProgress(0.6, 'Processing batch...');

            let t = Date.now();
            const res = await global.callStorePost('PRAXIS', 'SQP06144', {
                IN_CCUST: '139',
                IN_ENVIO: envio,
                IN_CUUID_FUUID: cuuidFuuidPairs.join('|')
            });
            me.logStepTime('SQP06144 (process ' + cuuidFuuidPairs.length + ' file(s))', t);
            me.logStepTime('TOTAL', tTotal);

            const lstVals = (res && res.data && res.data.lstVals) ? res.data.lstVals : {};
            const response = lstVals.IO_RESPONSE;

            progressBar.updateProgress(1, 'Done');

            if (response === 1 || response === '1') {
                me.notifier.info((lstVals.IO_MESSAGE || 'Processed').toString() + (readErrCount > 0 ? (' (' + readErrCount + ' file(s) could not be read)') : ''));
            } else {
                me.notifier.alert(lstVals.IO_MESSAGE || 'Error processing batch');
            }

            const mainGrid = Ext.getCmp(prototype.id + '-MainGrid');
            if (mainGrid && mainGrid.getStore() && mainGrid.getStore().reload) {
                mainGrid.getStore().reload();
            }

            if (response === 1 || response === '1') {
                view.close();
            }
        } finally {
            view.setLoading(false);
        }
    },

    onCancelClick: function () {
        this.view.close();
    }
});
