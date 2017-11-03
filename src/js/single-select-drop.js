/**
 * Class for multi-select-dropdowns with search bar
 * @param {object} container - jQuery Object of the outer container
 * @param {object} options - class settings
 * @event itemAdd - fires when an item is selected
 * @event itemRemove - fires when an item is removed
 * @event clearAll - fires when all items are removed at the same time
 */
export default class SingleSelectDrop {
    constructor(container, options) {
        this.element = container;

        const defaults = {
            searchTargetSelector: ''
        }
        this.o = $.extend({}, defaults, options || {});

        this.dropdownClass = 'uic-single-select-drop';
        this.selectedClass = 'uic-selected';
        this.expandedClass = 'uic-expanded';
        this.dataAttrName = 'uic-item-value';

        this.input = this.element.find('.uic-input');
        this.hiddenInput = this.element.find('[type="hidden"]');
        this.selection = this.element.find('.uic-selection');
        this.defaultText = this.element.find('.uic-default-text');
        this.menu = this.element.find('.uic-menu');
        this.menuItems = this.menu.find('.uic-menu-item');
        this.message = this.element.find('.uic-message');

        this.selectedItem = this.selection.find('.' + this.selectedClass);

        this.isExpanded = false;

        this.addEvents();
        this.handlePreselection();
    }

    handlePreselection() {
        let value = this.selectedItem.data(this.dataAttrName);
        let menuItem = this.menu.find('[data-' + this.dataAttrName + '="' + value + '"]');
        menuItem.addClass(this.selectedClass);
    }

    addEvents() {
        $(window).on('click', (event) => {
            if($.contains(this.element.get(0), event.target) === false &&
                this.isExpanded === true) {
                this.closeMenu();
            }
        });

        this.selection.on('click', (event) => {
            if(this.isExpanded === true) {
                this.closeMenu();
            } else {
                this.showMenu();
                this.input.focus();
            }
        });

        this.input.on({
            'keypress': (event) => {
                this.toggleMessage();
                return event.which != 13;
            },
            'keyup': (event) => {
                this.filterItems();
                this.toggleMessage();
            }
        });

        this.menuItems.on('click', (event) => {
            this.selectItem($(event.currentTarget));
            this.closeMenu();
            this.toggleMessage();
        });
    }

    toggleMessage() {
        let displayStyle = this.menuItems.filter((i, item) => {
            return $(item).css('display') != 'none' && $(item).data(this.dataAttrName) !== '';
        }).length > 0 ? 'none' : 'block';
        this.message.css('display', displayStyle);
    }

    filterItems() {
        let searchString = this.input.val(),
            regex = new RegExp(searchString, 'i');

        this.menuItems.each((i, item) => {
            let haystack = this.o.searchTargetSelector === '' ? $(item).text() : $(item).find(this.o.searchTargetSelector).text();
            if(haystack.toString().match(regex) === null && $(item).data(this.dataAttrName) !== '') {
                $(item).css('display', 'none');
            } else if($(item).hasClass(this.selectedClass) === false) {
                $(item).css('display', 'block');
            }
        });
    }

    selectItem(item) {
        item.css('display', 'none');

        this.menuItems.removeClass(this.selectedClass);
        item.addClass(this.selectedClass);
        this.selectedItem.text(item.get(0).textContent);
        this.selectedItem
            .data(this.dataAttrName, item.data(this.dataAttrName))
            .attr('data-' + this.dataAttrName, item.data(this.dataAttrName));
        this.updateValue();
        this.element.trigger('itemSelected', this.selectedItem);
    }

    closeMenu() {
        if(this.isExpanded === false) return;
        this.isExpanded = true;
        setTimeout(() => {
            this.input.val('');
            this.element.removeClass(this.expandedClass);
            this.menu.slideToggle(150, () => {
                this.isExpanded = false;
                this.input.focus();
                this.input.trigger('keyup');
            })
        }, 50);
    }

    showMenu() {
        if(this.isExpanded === true) return;
        this.isExpanded = true;
        this.element.addClass(this.expandedClass);
        this.menu.slideToggle(200, () => {
            this.isExpanded = true;
        });
    }

    updateValue() {
        this.hiddenInput.val(this.input.val());
    }

    clear() {
        let selectedItemObjects = this.selectedItems;
        this.selectedItems = [];
        this.menuItems.removeClass(this.selectedClass)
        this.selection.find('.' + this.selectedClass).remove();
        this.hiddenInput.attr('value', '');
        this.toggleDefaultText();
        this.element.trigger('clearAll');
        return selectedItemObjects;
    }
}