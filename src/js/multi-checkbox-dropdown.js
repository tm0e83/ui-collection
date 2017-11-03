/**
 * Class for dropdowns with multiple checkbox-options; with search bar
 * @param {object} container - jQuery Object of the outer container
 * @param {object} options - class settings
 * @event clearAll - fires after the selection is cleared
 * @event selectionChange - fires after one or more options are selected or deselected
 * @event optionSelect - fires after one option is selected
 * @event optionDeselect - fires after one option is deselected
 */
export default class MultiCheckboxDropdown {
    constructor(container, options) {
        this.element = container;

        const defaults = {
            maxRows: 0,
            columns: 1,
            adjustHeight: true,
            breakpoints: [
            // {
            //     width: 680,              // breakpoint max-width
            //     columns: 2,              // columns for this breakpoint
            //     maxRows: 5               // max rows for this breakpoint
            //     adjustHeight: false      // adjust height of list to number of visible entries
            // }
            ]
        }

        this.setOptions(defaults, options);

        this.label = this.element.find('.uic-label');
        this.input = this.element.find('.uic-input');
        this.menu = this.element.find('.uic-menu');
        this.submenu = this.element.find('.uic-submenu');
        this.selectAll = this.element.find('.uic-select-all');
        this.selectAllLabel = this.element.find('.uic-select-all-label');
        this.selectAllVisibleLabel = this.element.find('.uic-select-all-visible-label');
        this.scrollable = this.element.find('.uic-scrollable');
        this.optionRows = this.element.find('.uic-option-row');
        this.message = this.element.find('.uic-message');
        this.selectedClass = 'uic-selected';
        this.expandedClass = 'uic-expanded';
        this.selectedValues = [];
        this.optionColumns = 1;
        this.currentBreakpoint;
        this.isAnimating = false;
        this.isExpanded = false;

        if(this.isTouchDevice()) this.scrollable.addClass('uic-mobile-scrollbar');

        this.addEvents();
        this.element.trigger('resize');
        this.input.trigger('keyup');
    }

    addEvents() {
        if(this.element.attr('data-uic-dropdown-style').match('accordion|none') === null) {
            $(window).on('click', (event) => {
                if($.contains(this.element.get(0), event.target) === false && this.isExpanded === true) {
                    this.closeMenu();
                }
            });
        }

        $(window).on('resize orientationchange', (event) => {
            this.currentBreakpoint = this.o.breakpoints.reduce((previous, current) => {
                let bp = $(window).width() > current.width && current.width > previous.width ? current : previous;
                return $(window).width() > bp.width ? bp : { width: this.o.width, columns: this.o.columns, maxRows: this.o.maxRows, adjustHeight: this.o.adjustHeight };
            });

            if(this.element.attr('data-uic-option-columns') != this.currentBreakpoint.columns) {
                this.element.attr('data-uic-option-columns', this.currentBreakpoint.columns);
            }

            this.setMaxRows(this.currentBreakpoint);
        });

        if(this.element.attr('data-uic-dropdown-style').match('none') === null) {
            this.label.on('click', (event) => this.isExpanded === false ? this.showMenu() : this.closeMenu());
        }

        this.input.on('keyup', (event) => {
            this.filterItems();
            this.toggleSubmenu();
            this.toggleSelectAllCheckbox();
        });

        this.selectAll.on('change', () => {
            let changesdValues = this.selectAllVisible(this.selectAll.is(':checked'));
            this.element.trigger('selectionChange', {
                selectedValues: this.getAllSelectedValues(),
                currentValue: changesdValues
            });
        });

        this.optionRows.find('input').each((i, checkbox) => {
            $(checkbox).on('change', () => {
                this.toggleSelectAllCheckbox();
                let o = { selectedValues: this.getAllSelectedValues(), currentValue: $(checkbox).val() };
                this.element.trigger('selectionChange', o);
                this.element.trigger($(checkbox).is('checked') === true ? 'optionSelect' : 'optionDeselect', o);
            });
        });
    }

    setOptions(defaults, options) {
        this.o = $.extend({}, defaults, options || {});

        let defaultBreakpoint = {
            width: 0,
            columns: this.o.columns,
            maxRows: this.o.maxRows,
            adjustHeight: this.o.adjustHeight
        };

        this.o.breakpoints.forEach((breakpoint, i) => {
            this.o.breakpoints[i] = $.extend({}, defaultBreakpoint, breakpoint || {});
        });

        this.o.breakpoints.unshift(defaultBreakpoint);
    }

    setMaxRows(breakpoint) {
        let maxRows = breakpoint.maxRows || 0,
            containerHeight = 0,
            css = {};

        this.element.attr('data-uic-maxrows', maxRows);
        if(this.menu.css('display') == 'none') this.menu.addClass('uic-measuring');

        if(this.currentBreakpoint.adjustHeight === true) {
            for(let i = 0; i < maxRows; i++) {
                containerHeight += this.optionRows.eq(i).outerHeight();
            }
            containerHeight = containerHeight === 0 ? 'initial' : containerHeight + 'px';
            css['max-height'] = containerHeight;
            css['height'] = 'auto';
        } else {
            for(let i = 0; i < maxRows; i++) {
                let cellHeights = [],
                    rowHeight = 0;
                for(let j = 0; j < breakpoint.columns; j++) {
                    let currentCellHeight = this.optionRows.eq(j).outerHeight();
                    rowHeight = rowHeight > currentCellHeight ? rowHeight : currentCellHeight;
                }
                containerHeight += rowHeight;
            }
            css['max-height'] = 'initial';
            css['height'] = containerHeight;
        }

        this.menu.removeClass('uic-measuring');
        this.scrollable.css(css);
    }

    toggleSubmenu() {
        let displayStyle = this.getAllVisibleOptionRows().length === 0 ? 'none' : 'flex';
        this.submenu.css('display', displayStyle);

        if(this.getAllVisibleOptionRows().length == this.optionRows.length) {
            this.selectAllVisibleLabel.css('display', 'none');
            this.selectAllLabel.css('display', 'block');
        } else {
            this.selectAllLabel.css('display', 'none');
            this.selectAllVisibleLabel.css('display', 'block');
        }
    }

    toggleSelectAllCheckbox() {
        this.selectAll.prop('checked', this.getAllVisibleOptionRows().length == this.getAllVisibleSelectedOptionRows().length);
    }

    selectAllVisible(check) {
        let checkboxes = [];
        this.getAllVisibleOptionRows().each((i, row) => {
            let checkbox = $(row).find('input');
            checkbox.prop('checked', check);
            checkboxes.push(checkbox.val());
        });
        return checkboxes;
    }

    getAllVisibleOptionRows() {
        return this.optionRows.filter((i, row) => $(row).css('display') == 'flex');
    }

    getAllVisibleSelectedOptionRows() {
        return this.getAllVisibleOptionRows().filter((i, row) => $(row).find('input').is(':checked') === true);
    }

    filterItems() {
        let searchString = this.input.val(),
            regex = new RegExp(searchString, 'i');

        this.optionRows.each((i, row) => {
            let label = $(row).find('label');
            $(row).css('display', label.text().match(regex) === null ? 'none' : 'flex');
        });

        this.message.css('display', this.getAllVisibleOptionRows().length === 0 ? 'block' : 'none');
    }

    showMenu() {
        if(this.isAnimating === true) return;
        this.isAnimating = true;
        this.element.addClass(this.expandedClass);
        this.menu.slideToggle(200, () => {
            this.isAnimating = false;
            this.isExpanded = true;

            if(!this.isTouchDevice()) {
                this.input.focus();
            }
        });
    }

    closeMenu() {
        if(this.isAnimating === true) return;
        this.isAnimating = true;
        setTimeout(() => {
            this.element.removeClass(this.expandedClass);
            this.menu.slideToggle(150, () => {
                this.input.val('');
                this.isAnimating = false;
                this.isExpanded = false;
                this.input.trigger('keyup');
            })
        }, 50);
    }

    getAllSelectedValues() {
        let allSelectedValues = [];
        this.optionRows.find('input:checked').each((i, checkbox) => allSelectedValues.push($(checkbox).val()));
        return allSelectedValues;
    }

    isTouchDevice() {
        return 'ontouchstart' in window || navigator.maxTouchPoints;
    };

    clear() {
        let allSelectedValues = this.allSelectedValues();
        this.element.trigger('clearAll', allSelectedValues);
        return allSelectedValues;
    }
}