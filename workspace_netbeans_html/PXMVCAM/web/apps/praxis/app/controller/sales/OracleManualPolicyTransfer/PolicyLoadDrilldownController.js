Ext.define('Ext.Praxis.controller.sales.OracleManualPolicyTransfer.PolicyLoadDrilldownController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.PolicyLoadDrilldownController',

    afterRender: async function () {
        const me = this;
        const view = me.getView();
        const contentArea = Ext.getCmp(prototype.idDD + '-contentArea');
        const headerInfo = Ext.getCmp(prototype.idDD + '-headerInfo');

        headerInfo.setHtml(
            '<b>File:</b> ' + Ext.String.htmlEncode(view.namezip || '') +
            ' &nbsp;|&nbsp; <b>Module:</b> ' + Ext.String.htmlEncode(view.module || '') +
            ' &nbsp;|&nbsp; <b>Correlativo:</b> ' + Ext.String.htmlEncode(view.envio || '')
        );

        contentArea.setLoading(true);
        try {
            const rows = await global.callStorePagginExcel('PRAXIS', 'SQP06147', {
                IN_CCUST: view.ccust || '',
                IN_ENVIO: view.envio || '',
                IN_MODULE: view.module || '',
                IN_NAMEZIP: view.namezip || '',
                IN_FOLDER: ''
            });

            me.allRows = rows || [];

            me.buildTree();
            me.showTree();
        } catch (e) {
            console.error('Error loading detail', e);
            global.Msg({msg: 'Error loading detail'});
        } finally {
            contentArea.setLoading(false);
        }
    },

    // Arma el arbol carpeta -> archivo a partir de las filas planas ya cargadas en memoria
    buildTree: function () {
        const me = this;
        const folders = {};

        (me.allRows || []).forEach(function (r) {
            const folder = r.FOLDER || '';
            const filename = r.FILENAME || '';
            if (!folders[folder]) {
                folders[folder] = {};
            }
            folders[folder][filename] = (folders[folder][filename] || 0) + 1;
        });

        const children = Object.keys(folders).map(function (folder) {
            const files = folders[folder];
            const fileNodes = Object.keys(files).map(function (filename) {
                return {
                    text: filename,
                    leaf: true,
                    iconCls: 'prx-icon-image-file',
                    FOLDER: folder,
                    FILENAME: filename,
                    LINES_COUNT: files[filename]
                };
            });

            const totalLines = fileNodes.reduce(function (sum, f) {
                return sum + f.LINES_COUNT;
            }, 0);

            return {
                text: folder,
                expanded: true,
                LINES_COUNT: totalLines,
                children: fileNodes
            };
        });

        me.treePanel = Ext.create('Ext.tree.Panel', {
            border: false,
            rootVisible: false,
            useArrows: true,
            singleExpand: false,
            viewConfig: {
                stripeRows: true,
                enableTextSelection: true
            },
            store: {
                root: {
                    expanded: true,
                    children: children
                }
            },
            columns: [
                {
                    xtype: 'treecolumn',
                    text: 'Name',
                    flex: 2,
                    sortable: true,
                    dataIndex: 'text'
                },
                {
                    text: 'Lines',
                    dataIndex: 'LINES_COUNT',
                    width: 100,
                    align: 'center',
                    sortable: true,
                    renderer: function (v) {
                        return Ext.util.Format.number(v || 0, '0,000');
                    }
                },
                {
                    xtype: 'actioncolumn',
                    text: '',
                    width: 50,
                    align: 'center',
                    sortable: false,
                    items: [
                        {
                            iconCls: 'prx-icon-detail',
                            tooltip: 'View content',
                            handler: me.onOpenFile,
                            scope: me,
                            isDisabled: function (view, rowIndex, colIndex, item, record) {
                                return !record.get('leaf');
                            }
                        }
                    ]
                }
            ]
        });
    },

    showTree: function () {
        const me = this;
        const contentArea = Ext.getCmp(prototype.idDD + '-contentArea');

        contentArea.removeAll(false);
        contentArea.add(me.treePanel);

        me.currentLevel = 'tree';
        me.updateBackButton();
    },

    onOpenFile: function (view, rowIndex, colIndex, item, e, record) {
        const me = this;
        if (!record.get('leaf')) {
            return;
        }
        me.showContent(record.get('FOLDER'), record.get('FILENAME'));
    },

    showContent: function (folder, filename) {
        const me = this;
        const contentArea = Ext.getCmp(prototype.idDD + '-contentArea');

        const data = (me.allRows || [])
            .filter(function (r) {
                return (r.FOLDER || '') === folder && (r.FILENAME || '') === filename;
            })
            .sort(function (a, b) {
                return (a.LINE || 0) - (b.LINE || 0);
            });

        const contentGrid = Ext.create('Ext.grid.Panel', {
            border: false,
            viewConfig: {
                stripeRows: true,
                enableTextSelection: true,
                markDirty: false
            },
            columnLines: true,
            columns: [
                {text: 'Line #', dataIndex: 'LINE', width: 70},
                {text: 'Content', dataIndex: 'CONTENT', flex: 1, align: 'left'}
            ],
            store: Ext.create('Ext.data.Store', {data: data})
        });

        contentArea.removeAll(false);
        contentArea.add(contentGrid);

        me.currentLevel = 'content';
        me.currentFolder = folder;
        me.currentFilename = filename;
        me.updateBackButton();
    },

    onBackClick: function () {
        const me = this;
        if (me.currentLevel === 'content') {
            me.showTree();
        }
    },

    updateBackButton: function () {
        const me = this;
        const btn = Ext.getCmp(prototype.idDD + '-btnBack');
        if (btn) {
            btn.setDisabled(me.currentLevel === 'tree');
        }
    },

    onDownloadExcel: async function () {
        const me = this;
        const contentArea = Ext.getCmp(prototype.idDD + '-contentArea');
        let data = [];

        if (me.currentLevel === 'content') {
            const grid = contentArea.items.getAt(0);
            grid.getStore().each(function (rec) {
                data.push({
                    'RN': rec.get('RN'),
                    'Envio': rec.get('ENVIO'),
                    'Name ZIP': rec.get('NAMEZIP'),
                    'Secuence': rec.get('SECUENCE'),
                    'folder': rec.get('FOLDER'),
                    'Filename': rec.get('FILENAME'),
                    'Line': rec.get('LINE'),
                    'Content': rec.get('CONTENT')
                });
            });
        } else {
            const summary = {};
            (me.allRows || []).forEach(function (r) {
                const key = (r.FOLDER || '') + '|' + (r.FILENAME || '');
                summary[key] = (summary[key] || 0) + 1;
            });
            data = Object.keys(summary).map(function (key) {
                const parts = key.split('|');
                return {Folder: parts[0], File: parts[1], Lines: summary[key]};
            });
        }

        if (data.length === 0) {
            global.Msg({msg: 'No data to export'});
            return;
        }

        await global.writeExcelFromJson(data, 'OracleManualPolicyTransfer_Detail');
        Ext.toast({
            html: '<b>Excel file downloaded successfully</b>',
            title: 'Success',
            align: 't',
            closable: true,
            width: 280,
            timeout: 3000
        });
    },

    onCloseClick: function () {
        this.view.close();
    }
});
