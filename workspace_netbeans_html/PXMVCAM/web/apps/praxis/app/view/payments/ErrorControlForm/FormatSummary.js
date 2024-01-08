

Ext.define('Ext.Praxis.view.payments.ErrorControlForm.FormatSummary', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.' + prototype.id + '-formatSummary',
    requires: [
        'Ext.Praxis.view.payments.ErrorControlForm.FormatGrid'
    ],
    height: 625,
    width: 1400,
    layout: 'center',
    border: false,
    bodyStyle: 'background: transparent;',
    //margin: '0 10 0 10',
    config: {
        searchParams: null,
        searchUrl: null
    },
    listeners: {
        afterrender: function () {
            this.getData();
        }
    },
    //<editor-fold defaultstate="collapsed" desc="items">
    items: [
        {
            xtype: 'grid',
            title: 'Summary Log Errors',
            titleAlign: 'center',
            id: prototype.id + '-gridSummary',
            height: 625,
            width: 605,
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
                        text:'RN',
                        xtype: 'rownumberer', // Agrega la columna de números de fila
                        width: 40 // Ajusta el ancho de la columna si es necesario
                    },
                    {
                        text: 'Date', dataIndex: 'a4481FPROC', width: 85
                    },
                    {
                        text: 'File Type', dataIndex: 'a4451DESC1', flex: 1,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = "font-weight:bold;";
                            return value;
                        }
                    },
                    {
                        text: 'Qty. Errors', dataIndex: 'total', width: 90,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = "font-weight:bold;color:#ED4D2B;";
                            return value;
                        }
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
                                    grid.up().up().onShowDetails(obj);
                                }
                            }
                        ]
                    },
                            //</editor-fold>
                ]
            },
            bbar: {
                xtype: 'pagingtoolbar',
                displayInfo: true,
                pageSize: 20
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
                        xtype: 'button',
                        iconCls: 'prx-icon-excel',
                        scale: 'small',
                        tooltip: 'Export to Excel',
                        listeners: {
                            click: 'downloadFormatSummary'
                        }
                    }
                ]
            }
        }
    ],
    //</editor-fold>
    getData: async function () {
        const me = this;
        if (me.searchParams && me.searchUrl) {
            const grid = me.down();
            grid.mask('Loading...');
            const res = await fetch(`${me.searchUrl}/loadErrorSummary?${new URLSearchParams(me.searchParams)}`);
            if (res.ok) {
                const data = await res.json();
                //console.log(data);
                grid.bindStore(Ext.create('Ext.data.Store', {
                    autoLoad: true,
                    data: data.response,
                    pageSize: 20,
                    proxy: {
                        type: 'memory',
                        enablePaging: true
                    }
                }));
            }
            grid.unmask();
        }
    },
    onShowDetails: function (obj) {
        const me = this;
        let rec = obj.record.data;
        console.log(rec);
        let params = {
            DATE_FROM: rec.a4481FPROC,
            ARCHIVO: rec.a4481TYPEP.trim(),
            CERROR: Ext.getCmp(prototype.id + '-cmbError').getValue()
        };
        const panelActual = me.items.items.at(-1);
        panelActual.hide();
        const detPanel = Ext.create('Ext.Praxis.view.payments.ErrorControlForm.FormatGrid', {
            id: prototype.id + '-panelFormatGrid',
            searchParams: params,
            searchUrl: CONTEXTPATH + '/ErrorControl/loadErrorDetail'
        });
        //console.log(detPanel);
        me.add(detPanel);
    }
});