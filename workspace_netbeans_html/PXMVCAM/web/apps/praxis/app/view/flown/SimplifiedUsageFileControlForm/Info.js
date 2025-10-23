/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/JSP_Servlet/JavaScript.js to edit this template
 */

Ext.define('Ext.Praxis.view.flown.SimplifiedUsageFileControlForm.Info', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-info',
    align: 'center',
    bodyStyle: 'background-color: #E3EAEF;',
    defaults: {
        bodyStyle: 'background: transparent;',
        border: false
    },
    items: [
        {
            region: 'center',
            id: prototype.id + '-boxPrincipal',
            layout: {
                type: 'vbox',
                align: 'center'
            },
            defaults: {
                bodyStyle: 'background: transparent;',
                border: false,
                align: 'center'
            },
            items: [
                {
                    region: 'center',
                    id: prototype.id + '-boxMainData',
                    border: false,
                    width: prototype.widthContenedor,
                    hidden: false,
                    layout: {
                        type: 'vbox',
                        align: 'center'
                    },
                    defaults: {
                        bodyStyle: 'background: transparent;',
                        border: false,
                        align: 'left'
                    },
                    items: [
                        // <editor-fold defaultstate="collapsed" desc="grid">
                        {
                            xtype: 'grid',
                            id: prototype.id + '-gridData',
                            columnLines: true,
                            width: '99%',
                            height: 450, //550
                            padding: '0px 5px 1px 5px',
//                            features: [
//                                {
//                                    dock: 'bottom',
//                                    ftype: 'summary'
//                                }
//                            ],
                            columns: {
                                items: [
                                    {text: 'Nbr ID', dataIndex: 'RN', width: 80, align: 'center'},
                                    {text: 'File Date', dataIndex: 'FECHA', align: 'center', width: 80},
                                    {text: 'File Name', dataIndex: 'FILNAME', align: 'left', flex: 1},
                                    {
                                        text: 'Record Type Count',
                                        columns: [
                                            {text: 'Lift', dataIndex: 'QTYLIFT', width: 70, align: 'center'},
                                            {text: 'Payable', dataIndex: 'QTYIPAY', width: 70, align: 'center'},
                                            {
                                                xtype: 'widgetcolumn',
                                                text: 'Total',
                                                dataIndex: 'QTYTOTAL',
                                                width: 90,
                                                widget: {
                                                    xtype: 'button',
                                                    iconCls: 'prx-icon-docum',
                                                    margin: '0px 0px 2px 0px',
                                                    handler: function (btn) {
                                                        const record = btn.getWidgetRecord();
                                                        const FECHA = record.get('FECHA');
                                                        const QTYTOTAL = record.get('QTYTOTAL');
//                                                        console.log(parseInt(QTYTOTAL))
                                                        if ( parseInt(QTYTOTAL) === 0 ){
                                                            return;
                                                        }

                                                        // Crear store con paginación
                                                        const cuponesStore = Ext.create('Ext.data.Store', {
                                                            pageSize: 20,
                                                            proxy: {
                                                                type: 'ajax',
                                                                url: prototype.url + '/detail-cupons',
                                                                extraParams: {VP_FECHA: FECHA},
                                                                reader: {
                                                                    type: 'json',
                                                                    rootProperty: 'data',
                                                                    totalProperty: 'total'  // del backend
                                                                }
                                                            },
                                                            fields: ['ID', 'RECORD', 'TEXT'],
                                                            autoLoad: true
                                                        });

                                                        const win = Ext.create('Ext.window.Window', {
                                                            title: 'Detalle del archivo',
                                                            modal: true,
                                                            layout: 'fit',
                                                            width: 500,
                                                            height: 580,
                                                            bbar: [
                                                                {
                                                                    xtype: 'button',
                                                                    text: 'Descargar TXT',
                                                                    iconCls: 'prx-icon-download',
                                                                    itemId: 'btnDownloadTxt',
                                                                    originalText: 'Descargar TXT',
                                                                    originalIconCls: 'prx-icon-download',
                                                                    handler: function (btn) {
                                                                        //tambien funciona, pero no tiene control asy 
//                                                                        const originalText = btn.getText();
//                                                                        btn.setText('Descargando...');
//                                                                        btn.setDisabled(true);
//                                                                        const url = prototype.url + '/detail-cupons-to-txt?VP_FECHA=' + FECHA;
//                                                                        // Crear un enlace invisible para forzar descarga
//                                                                        const a = document.createElement('a');
//                                                                        a.href = url;
//                                                                        document.body.appendChild(a);
//                                                                        a.click();
//                                                                        document.body.removeChild(a);
//                                                                        // Restaurar luego de 5 segundos
//                                                                        Ext.defer(function () {
//                                                                            btn.setText(originalText);
//                                                                            //btn.setIconCls(originalIcon);
//                                                                            btn.setDisabled(false);
//                                                                        }, 5000); // tiempo en milisegundos
                                                                        const url = prototype.url + '/detail-cupons-to-txt?VP_FECHA=' + FECHA;
                                                                        // Deshabilitar y mostrar estado de carga
                                                                        const originalText = btn.text;
                                                                        btn.setText('Descargando...');
                                                                        btn.setDisabled(true);

                                                                        // Realizar la descarga con fetch
                                                                        fetch(url)
                                                                                .then(response => {
                                                                                    if (!response.ok) {
                                                                                        throw new Error('Error en la descarga');
                                                                                    }
                                                                                    return response.blob();
                                                                                })
                                                                                .then(blob => {
                                                                                    // Crear enlace para forzar descarga
                                                                                    const downloadUrl = URL.createObjectURL(blob);
                                                                                    const a = document.createElement('a');
                                                                                    a.href = downloadUrl;
                                                                                    a.download = 'AM_USAGE_' + FECHA + '.txt';
                                                                                    document.body.appendChild(a);
                                                                                    a.click();
                                                                                    a.remove();
                                                                                    URL.revokeObjectURL(downloadUrl); // liberar recurso
                                                                                })
                                                                                .catch(error => {
                                                                                    Ext.Msg.alert('Error', 'No se pudo descargar el archivo: ' + error.message);
                                                                                })
                                                                                .finally(() => {
                                                                                    // Restaurar el botón
                                                                                    btn.setText(originalText);
                                                                                    btn.setDisabled(false);
                                                                                });
                                                                    }
                                                                }
                                                            ],
                                                            items: [{
                                                                    xtype: 'grid',
                                                                    store: cuponesStore,
                                                                    columns: [
                                                                        {text: 'Nbr', dataIndex: 'ID', width: 60},
                                                                        {text: 'Record <br>Type', dataIndex: 'RECORD', width: 80},
                                                                        {text: 'Text data', dataIndex: 'TEXT', flex: 1}
                                                                    ],
                                                                    bbar: {
                                                                        xtype: 'pagingtoolbar',
                                                                        displayInfo: true,
                                                                        bind: {store: cuponesStore} // o directamente `store: cuponesStore` sin un ViewModel
                                                                    }
                                                                }],
                                                            buttons: [{
                                                                    text: 'Cerrar',
                                                                    iconCls: 'prx-icon-cancel-action',
                                                                    handler: function (btn) {
                                                                        btn.up('window').close();
                                                                    }
                                                                }]
                                                        });

                                                        win.show();
                                                    }
                                                }
                                            }
                                        ]
                                    },
                                    {text: 'Status', dataIndex: 'ESTADO_1', width: 100, align: 'left',
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {

                                            if (record.get('ESTADO') === '1' || record.get('ESTADO') === '3')
                                                metaData.style = 'font-weight:bold;color:blue;';

                                            return value;
                                        }
                                    },
                                    {text: 'Message', dataIndex: 'LOGTXT', width: 200, align: 'left',
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            if (record.get('ESTADO') === '0' || record.get('ESTADO') === '2')
                                                metaData.style = 'font-weight:bold;color:green;';
                                            if (record.get('ESTADO') === '1' || record.get('ESTADO') === '3')
                                                metaData.style = 'font-weight:bold;color:red;';
                                            if (record.get('ESTADO') === '4' || record.get('ESTADO') === '5')
                                                metaData.style = 'font-weight:bold;color:orange;';

                                            return value;
                                        }
                                    },
                                    {
                                        xtype: 'actioncolumn',
                                        sortable: false,
                                        width: 40,
                                        align: 'center',
                                        text: 'Log',
                                        items: [
                                            {
                                                iconCls: 'prx-icon-image-log',
                                                tooltip: 'Detail',
                                                handler: 'onDetailErrorClick',
//                                                handler: function (grid, rowIndex, colIndex, item, e, record) {
//                                                    // Protección extra si llegara a ejecutarse manualmente
//                                                    console.log(record.get('ESTADO'))
//                                                    if (record.get('ESTADO') === '1' || record.get('ESTADO') === '3') {
//                                                        console.log('xxxxxxxxx')
//                                                        this.fireEvent('onDetailErrorClick', record);
//                                                    }
//                                                },
                                                getClass: function (value, meta, record) {
                                                    // Siempre debe mostrar log
                                                    return 'prx-icon-image-log'; 
                                                    // Solo mostrar el ícono si ESTADO === 2
//                                                    if (record.get('ESTADO') === '1' || record.get('ESTADO') === '3' || record.get('ESTADO') === '5') {
//                                                        return 'prx-icon-image-log'; // icono visible
//                                                    } else {
//                                                        return 'x-hidden'; // ocultar el ícono usando clase CSS
//                                                    }
                                                }
                                            }
                                        ]
                                    }
                                ],
                                defaults: {
                                    sortable: false,
                                    menuDisabled: true,
                                    align: 'center'
                                }
                            },
                            viewConfig: {
                                stripeRows: true,
                                enableTextSelection: true,
                                markDirty: false,
                                getRowClass: function (record, rowIndex, rowParams, store) {
                                    if (rowIndex % 2 === 0)
                                        return 'rowA';
                                }
                            },
                            trackMouseOver: true,
                            scope: this,
                            listeners: {
                                scope: this,
                                afterrender: function (obj) {

                                }
                            }
                        },
                        // </editor-fold>
                        // <editor-fold defaultstate="collapsed" desc="pie">
                        {
                            xtype: 'panel',
                            id: prototype.id + '-pie',
                            width: prototype.widthGrid,
                            layout: {
                                type: 'hbox',
                                pack: 'center'
                            },
                            border: true,
                            height: 25,
                            bodyStyle: 'background-color: transparent; border: 1px solid #81BEF7',
                            defaults: {
                                border: true
                            },
                            padding: '1px 1px 1px 1px',
                            items: [
                                {
                                    xtype: 'panel',
                                    width: prototype.widthGrid,
                                    height: 25,
                                    layout: {
                                        type: 'hbox',
                                        pack: 'center'
                                    },
                                    defaults: {
                                        xtype: 'label',
                                        margin: '3px 0px 0px 5px'
                                    },
                                    items: [
                                        {
                                            text: 'Page',
                                            width: 50
                                        },
                                        {
                                            id: prototype.id + '-lbl-currentPage',
                                            text: '1',
                                            width: 50
                                        },
                                        {
                                            text: 'Of',
                                            width: 50
                                        },
                                        {
                                            id: prototype.id + '-lbl-pageCount',
                                            text: '0',
                                            width: 50
                                        },
                                        {xtype: 'tbspacer', width: 100},
                                        {
                                            text: 'Total Records',
                                            width: 80
                                        },
                                        {
                                            id: prototype.id + '-lbl-total',
                                            text: '0',
                                            width: 50
                                        }
                                    ]
                                }
                            ]
                        }
                        // </editor-fold>
                    ]
                }
            ]
        }
    ]
});
