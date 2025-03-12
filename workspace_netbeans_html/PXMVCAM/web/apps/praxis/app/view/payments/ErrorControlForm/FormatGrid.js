

Ext.define('Ext.Praxis.view.payments.ErrorControlForm.FormatGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.' + prototype.id + '-formatGrid',
    requires: [
        'Ext.Praxis.view.payments.ErrorControlForm.FormatDataEntry'
    ],
    config: {
        searchParams: null,
        searchUrl: null,
        url: CONTEXTPATH + '/ErrorControl'
    },
    listeners: {
        afterrender: function (view) {
            this.getData();
        }
    },
    //<editor-fold defaultstate="collapsed" desc="Items">
    title: 'Detail Log Errors',
    titleAlign: 'center',
    height: 625,
    width: 1350,
    viewConfig: {
        stripeRows: true,
        enableTextSelection: true,
        markDirty: false
    },
    columnLines: true,
    columns: {
        defaults: {
            align: 'center',
            menuDisabled: true,
            sortable: true
        },
        items: [
            //<editor-fold defaultstate="collapsed" desc="Summary Cols">
            {
                text: 'RN', dataIndex: 'rn', width: 40
            },
            {
                text: 'Fecha<br>de Proceso', dataIndex: 'a4481fproc', width: 85
            },
            {
                text: 'ID File', dataIndex: 'a4481idfil', width: 85
            },
            {
                text: 'Procesador', dataIndex: 'a4451DESC1', flex: 1
            },
            {
                text: 'Pais<br>de venta', dataIndex: 'a4481psvta', width: 85
            },
            {
                text: 'ID Reference', dataIndex: 'a4481idref', width: 85
            },
            {
                text: 'Ticket<br>Number', width: 120,
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                    const rec = record.data;
                    return rec.a4481cia + rec.a4481forma + rec.a4481serie;
                }
            },
            {
                text: 'Status<br>Error', dataIndex: 'a4481stser', width: 85,
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                    let opts = {
                        '0': 'Pending',
                        '1': 'Audited',
                        '2': 'Pending System'
                    };
                    return opts[value] || '';
                }
            },
            {
                text: 'Tipo de<br>Correccion', dataIndex: 'a4481tipco', width: 85,
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                    let opts = {
                        'A': 'Automatic',
                        'F': 'Forced Match'
                    };
                    return opts[value] || '';
                }
            },
            {
                text: 'Program', dataIndex: 'a4481prog', width: 85
            },
            {
                text: 'Error Code', dataIndex: 'a4481coder', width: 85,
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                    metaData.style = "font-weight:bold;";
                    return value;
                }
            },
            {
                text: 'Error Description', dataIndex: 'a4481data', flex: 1
            },
            {
                text: 'Audited By', dataIndex: 'a4481usrfz', width: 95
            },
            {
                text: 'Audited Date', dataIndex: 'a4481fecfz', width: 85
            },
            {
                xtype: 'actioncolumn',
                sortable: false,
                width: 50,
                align: 'center',
                items: [
                    {
                        getClass: function (value, metadata, record) {
                            return 'prx-icon-detail';
                        },
                        tooltip: 'Click for Show Details',
                        handler: function (grid, html, rowIndex, colIndex, obj) {
                            //console.log(grid.up().up());
                            grid.up().onShowDetails(obj);
                        }
                    }
                ]
            }
            //</editor-fold>
        ]
    },
    tbar: {
        layout: {
            pack: 'end'
        },
        defaults: {
            scale: 'medium'
        },
        items: [
            {
                xtype: 'fieldset',
                collapsible: true,
                collapsed: true,
                title: 'Filters',
                titleAlign: 'bottom',
                layout: 'hbox',
                flex: 1,
                bodyStyle: 'background: transparent;',
                border: false,
                padding: '0 10 0 10',
                items: [
                    {
                        xtype: 'combobox',
                        fieldLabel: 'Status Error',
                        id: prototype.id + '-gd-STERR',
                        store: Ext.create('Ext.data.SimpleStore', {
                            fields: ['code', 'name'],
                            data: [
                                ['', 'All'],
                                ['0', 'Pending'],
                                ['1', 'Audited'],
                                ['2', 'Pending System']
                            ]
                        }),
                        labelWidth: 70,
                        width: 200,
                        displayField: 'name',
                        valueField: 'code',
                        queryMode: 'local',
                        editable: false,
                        value: '',
                        listeners: {
                            change: function (obj) {
                                obj.up().up().up().getData();
                            }
                        }
                    },
                    {xtype: 'tbspacer', width: 10},
                    {
                        xtype: 'combobox',
                        fieldLabel: 'Status Rev.',
                        id: prototype.id + '-gd-TIPCO',
                        store: Ext.create('Ext.data.SimpleStore', {
                            fields: ['code', 'name'],
                            data: [
                                ['', 'All'],
                                ['A', 'Automatic'],
                                ['F', 'Forced Match']
                            ]
                        }),
                        labelWidth: 70,
                        width: 200,
                        displayField: 'name',
                        valueField: 'code',
                        queryMode: 'local',
                        editable: false,
                        value: '',
                        listeners: {
                            change: function (obj) {
                                obj.up().up().up().getData();
                            }
                        }
                    },
                    {xtype: 'tbspacer', width: 10},
                    {

                        xtype: 'button',
                        iconCls: 'prx-icon-clear',
                        tooltip: 'Clear Options',
                        listeners: {
                            click: function(obj){
                                const err = Ext.getCmp(prototype.id + '-gd-STERR');
                                err.suspendEvents(false);
                                err.setValue('');
                                Ext.getCmp(prototype.id + '-gd-TIPCO').setValue('');
                                err.resumeEvents();
                                obj.up().up().up().getData();
                            }
                        }
                    }
                ]
            },
            {xtype: 'tbspacer', width: 10},
            {
                xtype: 'button',
                //id: prototype.id + '-btnExcel',
                //text:'<strong>Excel</strong>',
                iconCls: 'prx-icon-excel',
                scale: 'small',
                tooltip: 'Export to Excel',
                listeners: {
                    click: function (obj) {
                        obj.up().up().downloadGrid();
                    }
                }
            },
            {xtype: 'tbspacer', width: 5},
            {
                text: '<strong style="color:white;">Back<strong>',
                id: prototype.id + '-det-btnBack',
                cls: 'x-btn-sent',
                width: 100,
                scale: 'small',
                overCls: 'x-btn-sent-over',
                tooltip: 'Back to Summary',
                listeners: {
                    click: function (btn) {
                        const panel = btn.up().up().up();
                        const views = panel.items.items;
                        views.at(-1).destroy();
                        views.at(-1).show();
                    }
                }
            }
        ]
    },
    bbar: {
        xtype: 'pagingtoolbar',
        displayInfo: true
    },
    //</editor-fold>
    getData: function () {
        const me = this;
        if (me.searchParams && me.searchUrl) {
            const grid = me;
            let store = Ext.create('Ext.data.Store', {
                storeId: prototype.id + `-detail-store`,
                loadMask: true,
                pageSize: 20,
                proxy: {
                    type: 'ajax',
                    enablePaging: true,
                    url: me.searchUrl,
                    extraParams: me.formatParams(me.searchParams),
                    timeout: 600000,
                    reader: {
                        type: 'json',
                        rootProperty: 'lst',
                        totalProperty: 'total'
                    }
                },
                autoLoad: true,
                listeners: {
                    load: function (store, records, successful, operation) {
                        if (!successful) {
                            global.Msg({msg: 'Data not Found'});
                        } else {
                            if (records.length === 0) {
                                global.Msg({msg: 'Data not Found'});
                            }
                            //console.log(records);
                        }
                    }
                }
            });
            //console.log(this.formatParams(me.searchParams));
            grid.bindStore(store);
        }
    },
    formatParams: function (searchParams) {
        const sterror = Ext.getCmp(prototype.id + '-gd-STERR');
        const tcorreccion = Ext.getCmp(prototype.id + '-gd-TIPCO');
        let params = {
            STS_ERROR: sterror.getValue(),
            TIPO_CORRECCION: tcorreccion.getValue(),
            ...searchParams
        };
        return params;
    },
    onShowDetails: function (obj) {
        const me = this;
        let rec = obj.record.data;
        let url = CONTEXTPATH + '/ErrorControl';
        let params = {
            IN_CCUST: rec.a4481ccust,
            IN_PROCTYPE: rec.a4481typep.trim(),
            IN_TKT: rec.a4481cia + rec.a4481forma + rec.a4481serie,
            IN_IDREF: rec.a4481idref.trim()
        };
        console.log(params);
        const opts = {
            'VN0002': () => {
                const VN0002dataEntry = Ext.create('Ext.Praxis.view.payments.ErrorControlForm.FormatDataEntry', {
                    id: prototype.id + '-formatDataEntry',
                    searchParams: params,
                    searchUrl: url + '/loadVN0002Info'
                });
                VN0002dataEntry.show();
            }
        };
        if (opts[rec.a4481coder]) {
            opts[rec.a4481coder]();
        } else {
            global.Msg({
                msg: 'Function not implemented'
            });
        }
    },
    downloadGrid:function(){
        const me = this;
        if(me.searchParams){
           let params = me.formatParams(me.searchParams);
           params.excel = true;
           console.log(params);
           global.getFile(`${me.url}/downloadErrorDetail?${new URLSearchParams(params)}`);
        }
    }
});