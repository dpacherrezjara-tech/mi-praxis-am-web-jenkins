Ext.define('Ext.Praxis.view.flown.AircraftMasterForm.Filters', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-filters',
    border: true,
    bodyStyle: 'background-color: #E3EAF9;',
    padding: '2px 0px 1px 0px',
    layout: 'column',
    items: [
        {
            xtype: 'form',
            border: false,
            bodyStyle: 'background: transparent',
            padding: '2px 5px 1px 5px',
            layout: 'column',
            defaults: {
                padding: '5 1',
                anchor: '100%'
            },
            items: [
                {
                    xtype: 'combo',
                    fieldLabel: '<strong>Search By</strong>',
                    store: Ext.create('Ext.Praxis.store.flown.AircraftMaster.SearchBy'),
                    id: prototype.id + '-cbxFiltro',
                    labelAlign: 'left',
                    queryMode: 'local',
                    triggerAction: 'all',
                    autoSelect: false,
                    enableKeyEvents: true,
                    forceSelection: true,
                    caseSensitive: true,
                    editable: false,
                    value: "",
                    valueField: 'code', displayField: 'name',
                    labelWidth: 75,
                    labelClsExtra: 'prx-label-search',
                    width: 212,
                    listeners: {
                        change: 'cbxFiltro_clickHandler'
                    }
                },
                {xtype: 'tbspacer', width: 7},
                {
                    xtype: 'textfield',
                    id: prototype.id + '-txtCampo',
                    fieldStyle: 'text-align:center',
                    enforceMaxLength: true,
                    hidden: true,
                    maskRe: /[a-zA-Z0-9]/,
                    width: 180,
                    enableKeyEvents: true,
                    listeners: {
                        afterrender: function (cmp, eOpts) {
                            cmp.inputEl.dom.maxLength = 10;
                        },
                        change: 'onUpperValue',
                        keypress: 'onTextKeypress'
                    }
                },
                {xtype: 'tbspacer', width: 665},
                {
                    xtype: 'label',
                    html: 'Update catalog:',
                    align: 'center',
                    fieldStyle: 'text-align: center;',
                    padding: '7px 7px 6px 0px'
                },
                {
                    xtype: 'form',
                    id: prototype.id + '-form-01_VLO',
                    border: false,
                    bodyStyle: 'background-color: #E3EAF9;',
                    items: [{
                            xtype: 'filefield',
                            id: prototype.id + '-file_VLO',
                            name: 'excelfile_VLO',
//                                fieldLabel: '<strong style="font-weight:bold;color:#0B333C;">Update VLO</strong>',
                            allowBlank: true,
                            accept: '.xlsx, .xls',
                            labelWidth: 85,
                            width: 250,
                            buttonText: 'Select excel...',
                            regex: /(.)+((\.xlsx)|(\.xls)|(\.csv)(\w)?)$/i,
                            regexText: 'Only XLS and XLSX formats are accepted',
                            buttonConfig: {
                                text: '<strong>Select file</strong>',
                                width: 80
                            },
                            listeners: {
                                //change: 'onUploadChange'
                            }
                        }]
                },
                {xtype: 'tbspacer', width: 20},
                {
                    xtype: 'button',
                    id: prototype.id + '-btn-upload_VLO',
                    margin: '2 0 0 0',
                    width: 90,
                    html: '<strong style="color:white;">Process File</strong>',
                    style: 'background:#24678D;color:white;font-weight:bold;',
                    border: false,
                    listeners: {
                        click: 'onClickFileLoad_VLO'
                    }
                }
            ]
        }
    ]
});

