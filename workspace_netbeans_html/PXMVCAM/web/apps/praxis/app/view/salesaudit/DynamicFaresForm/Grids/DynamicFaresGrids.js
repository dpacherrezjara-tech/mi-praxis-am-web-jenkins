
Ext.define('Ext.Praxis.view.salesaudit.DynamicFaresForm.Grids.DynamicFaresGrids', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-DynamicFaresGrids',
    layout: {
        type: 'vbox',
        align: 'center'
    },
    padding: '0 0 0 0',
    border: false,
    bodyStyle: 'background-color: #E3EAF9;',
    width: '100%',
    defaults: {
        border: false
    },
    items: [
        {
            xtype: 'grid',
            border: false,
            width: '100%',
            minHeight: 250,
            id: prototype.id + '-gridDynamicFares',
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
                    {
                        text: 'RN',
                        xtype: 'rownumberer', // Agrega la columna de números de fila
                        width: 40 // Ajusta el ancho de la columna si es necesario
                    },
                    {text: 'Client', dataIndex: 'CCUST', width: 50,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = "font-weight:bold;";
                            return value;
                        }
                    },
//                    { text: 'IDREC', dataIndex: 'IDREC', width: 80 },
                    { text: 'PRDA', dataIndex: 'PRDA', width: 80 },
                    { text: 'Ticket', dataIndex: 'TICKET', width: 140 },
                    { text: 'DP ID', dataIndex: 'DPID', width: 180 },
                    { text: 'Origin', dataIndex: 'ORIGIN', width: 80 },
                    { text: 'Destination', dataIndex: 'DESTIN', width: 80 },
                    { text: 'POS', dataIndex: 'POS', width: 60 },
                    { text: 'Service', dataIndex: 'SERVIC', width: 80 },
                    { text: 'Departure<br>Date', dataIndex: 'DEPDAT', width: 80 },
                    { text: 'Run<br>Date', dataIndex: 'RUNDAT', width: 80 },
                    { text: 'Expiry<br>Date', dataIndex: 'EXPDAT', width: 80 },
                    { text: 'Original<br>Class', dataIndex: 'ORICLS', width: 100 },
                    { text: 'Original Class<br>Value', dataIndex: 'ORICLV', width: 100 },
                    { text: 'Proposed<br>Class', dataIndex: 'PROCLS', width: 100 },
                    { text: 'Proposed Class<br>Value', dataIndex: 'PROCLV', width: 100 },
                    { text: 'Forced<br>Upsell', dataIndex: 'FORCUP', width: 120 },
                    { text: 'Service<br>Type', dataIndex: 'SERTYP', width: 100 },
                    { text: 'Cabin', dataIndex: 'CABIN', width: 100 },
                    { text: 'LOS<br>Start', dataIndex: 'LOSTAR', width: 80 },
                    { text: 'LOS<br>End', dataIndex: 'LOSEND', width: 80 },
                    { text: 'DP Adjustment<br>Value', dataIndex: 'ADJVAL', width: 120 },
                    { text: 'Final Fare<br>Value', dataIndex: 'FINFAV', width: 100 },
                    { text: 'Run<br>Number', dataIndex: 'RUNNBR', width: 100 },
                    { text: 'User<br>Created', dataIndex: 'USCR', width: 80 },
                    { text: 'Date<br>Created', dataIndex: 'FECR', width: 80 },
                    { text: 'Hour<br>Created', dataIndex: 'HOCR', width: 80 },
                    { text: 'User<br>Updated', dataIndex: 'USUP', width: 80 },
                    { text: 'Date<br>Updated', dataIndex: 'FEUP', width: 80 },
                    { text: 'Hour<br>Updated', dataIndex: 'HOUP', width: 80 }
                    
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
                        xtype: 'button',
                        iconCls: 'prx-icon-excel',
                        scale: 'small',
                        tooltip: 'Export to Excel',
                        listeners: {
                            click: 'downloadMainGrid'
                        }
                    }
                ]
            },
            bbar: {
                xtype: 'pagingtoolbar',
                displayInfo: true
            }
        }
    ]
});

