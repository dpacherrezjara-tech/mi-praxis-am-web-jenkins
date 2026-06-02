/**
 * Created by Dann Pandal
 *
 * CheckCombo — ComboBox with checklist multi-selection support.
 *
 * Features:
 *   - Checkbox visual indicator per item in the dropdown list.
 *   - Mutual exclusion between an "All" option and the rest: selecting All
 *     clears every other selection, and selecting any other item removes All.
 *   - Configurable output format: delimited string or raw array.
 *
 * Config options:
 *   delimiter   {String}  Character(s) used to join selected values in
 *                         getSubmitValue(). Defaults to ','.
 *   returnArray {Boolean} When true, getSubmitValue() returns the selection
 *                         as a plain Array instead of a delimited string.
 *                         Defaults to false.
 *   allValue    {*}       The valueField value that represents "All / no filter".
 *                         Mutual-exclusion logic is applied around this value.
 *                         Set to null to disable the All logic. Defaults to ''.
 *
 * Usage:
 *   requires: ['Ext.Praxis.view.widgets.CheckCombo']
 *
 *   {
 *       xtype      : 'checkcombo',
 *       fieldLabel : 'Status',
 *       name       : 'IN_STVAL',
 *       displayField: 'NAME',
 *       valueField  : 'CODE',
 *       delimiter   : ',',
 *       returnArray : false,
 *       allValue    : ''
 *   }
 */
Ext.define('Ext.Praxis.view.widgets.CheckCombo', {
    extend: 'Ext.form.field.ComboBox',
    alias : 'widget.checkcombo',

    // ── Default configs ──────────────────────────────────────────────────────
    multiSelect : true,
    editable    : false,
    delimiter   : ',',
    returnArray : false,
    allValue    : '',

    // ── Initialization ───────────────────────────────────────────────────────
    initComponent: function () {
        var me = this;
        var df = me.displayField || 'NAME';

        me.listConfig = Ext.apply(
            {
                tpl: new Ext.XTemplate(
                    '<ul class="x-list-plain">',
                        '<tpl for=".">',
                            '<li role="option" class="x-boundlist-item" style="padding:3px 6px; cursor:pointer;">',
                                '<span class="x-checkcombo-chk"',
                                    ' style="display:inline-block;width:13px;height:13px;',
                                            'border:1px solid #aaa;background:#fff;',
                                            'margin-right:5px;vertical-align:middle;',
                                            'text-align:center;line-height:11px;',
                                            'font-size:12px;font-weight:bold;color:#fff;">',
                                '</span>',
                                '{' + df + '}',
                            '</li>',
                        '</tpl>',
                    '</ul>'
                )
            },
            me.listConfig || {}
        );

        me.callParent(arguments);

        me.on('expand',   me._onExpand,   me);
        me.on('change',   me._onChange,   me);
        me.on('collapse', me._onCollapse, me);
    },

    // ── Private: attach selectionchange listener once per picker ─────────────
    _onExpand: function (combo) {
        var picker = combo.getPicker();
        if (!picker._checkComboInited) {
            picker._checkComboInited = true;
            picker.on('selectionchange', function () {
                combo._updateChkIcons();
            });
        }
        Ext.defer(function () {
            combo._updateChkIcons();
        }, 30);
    },

    // ── Private: handle All ↔ others mutual exclusion ────────────────────────
    _onChange: function (combo, newValue, oldValue) {
        if (combo._internalChange) return;

        var newSelection = combo._applyAllLogic(newValue, oldValue);

        var currentVal = combo.getValue();
        if (!Ext.isArray(currentVal)) {
            currentVal = (currentVal !== null && currentVal !== undefined) ? [currentVal] : [];
        }

        // Compare length first: avoids false equality when [''] and [] both join to ''
        var sortedNew = newSelection.slice().sort();
        var sortedCur = currentVal.slice().sort();
        var isDiff = (sortedNew.length !== sortedCur.length) ||
                     sortedNew.some(function (v, i) { return v !== sortedCur[i]; });

        if (isDiff) {
            combo._internalChange = true;
            combo.setValue(newSelection);
            combo._internalChange = false;
            combo._updateChkIcons();
        }
    },

    // ── Private: returns true when an "All" record exists in the store ───────
    // Uses findExact (strict ===) instead of findRecord to handle empty string reliably
    _allRecordExists: function () {
        var me    = this;
        var store = me.getStore();
        if (me.allValue === null || me.allValue === undefined) return false;
        if (!store || store.getCount() === 0) return false;
        return store.findExact(me.valueField, me.allValue) !== -1;
    },

    // ── Private: mutual-exclusion rules ─────────────────────────────────────
    _applyAllLogic: function (newValue, oldValue) {
        var me       = this;
        var allCode  = me.allValue;

        if (!Ext.isArray(newValue)) newValue = (newValue !== null && newValue !== undefined) ? [newValue] : [];
        if (!Ext.isArray(oldValue)) oldValue = (oldValue !== null && oldValue !== undefined) ? [oldValue] : [];

        // All logic disabled
        if (allCode === null || allCode === undefined) return newValue;

        var hadAll = Ext.Array.contains(oldValue, allCode);
        var hasAll = Ext.Array.contains(newValue, allCode);

        if (newValue.length === 0) {
            // Nothing selected → restore All only if the All record exists
            return me._allRecordExists() ? [allCode] : [];
        }
        if (hasAll && !hadAll) {
            // All was just selected → clear every other selection
            return [allCode];
        }
        if (hasAll && hadAll && newValue.length > 1) {
            // All was already selected and a non-All item was added → remove All
            return Ext.Array.filter(newValue, function (v) { return v !== allCode; });
        }
        return newValue;
    },

    // ── Private: on dropdown close, restore All when selection is empty ───────
    _onCollapse: function (combo) {
        if (!combo._allRecordExists()) return;

        var currentVal = combo.getValue();
        if (!Ext.isArray(currentVal)) {
            currentVal = (currentVal !== null && currentVal !== undefined) ? [currentVal] : [];
        }

        if (currentVal.length === 0) {
            combo._internalChange = true;
            combo.setValue([combo.allValue]);
            combo._internalChange = false;
            // Force display refresh after restoring All
            Ext.defer(function () { combo._updateChkIcons(); }, 10);
        }
    },

    // ── Private: repaint checkbox spans to reflect current selection ─────────
    _updateChkIcons: function () {
        var me     = this;
        var picker = me.getPicker();
        if (!picker || !picker.getEl()) return;

        var selectedValues = me.getValue();
        if (!Ext.isArray(selectedValues)) {
            selectedValues = (selectedValues !== null && selectedValues !== undefined) ? [selectedValues] : [];
        }

        var nodes = picker.getEl().query('.x-boundlist-item');
        var store = me.getStore();

        Ext.Array.each(nodes, function (node, idx) {
            var record = store.getAt(idx);
            var span   = node.querySelector('.x-checkcombo-chk');
            if (!span || !record) return;

            var checked = Ext.Array.contains(selectedValues, record.get(me.valueField));
            span.style.background  = checked ? '#1976D2' : '#fff';
            span.style.borderColor = checked ? '#1976D2' : '#aaa';
            span.innerHTML         = checked ? '&#10003;' : '';
        });
    },

    // ── Public: return selected values as string or array ────────────────────
    getSubmitValue: function () {
        var me = this;
        var v  = me.getValue();
        if (!Ext.isArray(v)) {
            v = (v !== null && v !== undefined) ? [v] : [];
        }
        if (me.returnArray) return v;
        return v.join(me.delimiter);
    }
});
