/**
 * Class input fields for adding search/filter tags
 * @param {object} container - jQuery Object of the outer container
 * @param {object} options - class settings
 * @event inputEmpty - fires when the input field is emptied
 * @event inputFill - fires when the input field is filled
 * @event itemAdd - fires when an item is added
 * @event itemRemove - fires when an item is removed
 * @event clearAll - fires when all items are removed at the same time
 */
export default class MultiFilterInput {
    constructor(container, options) {
        this.element = container;

        const defaults = {};
        this.o = $.extend({}, defaults, options || {});

        this.input = this.element.find('.uic-input');
        this.hiddenInput = this.element.find('[type="hidden"]');
        this.selection = this.element.find('.uic-selection');
        this.defaultText = this.element.find('.uic-default-text');
        this.addButton = this.element.find('.uic-add');

        this.elementClass = 'uic-multi-filter-input';
        this.addButtonClass = 'uic-add';
        this.selectedClass = 'uic-selected';
        this.removeButtonClass = 'uic-remove';
        this.activeClass = 'uic-active';
        this.hasInputClass = 'uic-has-input';
        this.dataAttrName = 'uic-item-value';

        this.selectedItems = [];
        this.selectedValues = [];
        this.addEvents();
        this.inputIsEmpty = true;
        this.handlePreselection();
    }

    handlePreselection() {
        this.selection.find('.' + this.selectedClass).each((i, item) => {
            let value = $(item).data(this.dataAttrName);

            this.selectedItems.push({
                selectedItem: $(item),
                value: value
            });

            this.addSelectedItemEvents($(item));
        });
        this.toggleDefaultText();
        this.updateValues();
    }

    addSelectedItemEvents(selectedItem) {
        selectedItem.find('i').on('click', (event) => this.removeSearchTag(selectedItem));
    }

    addEvents() {
        $(window).on('click', (event) => {
            if($(event.target).closest('.' + this.elementClass).length === 0) {
                this.toggleDefaultText();

                if($(event.target).is('.' + this.removeButtonClass) === false) {
                    this.element.removeClass(this.activeClass);
                }
            }

            if($(event.target).is('.' + this.addButtonClass) === true) {
                this.toggleDefaultText();
            }
        });

        this.element.on('click', (event) => {
            this.input.focus();

            if($(event.target).is(this.input) === false) {
                this.setCursorToEnd();
            }
        });

        this.addButton.on('click', (event) => {
            if(this.input.text() !== '') {
                this.addSeachTag(event);
                this.toggleDefaultText();
            }
            this.toggleHasInputClass();
            event.preventDefault();
        });

        this.input.on({
            'input': () => this.toggleHasInputClass(),
            'keypress': (event) => {
                this.toggleDefaultText();
                if(event.which != 13) return;
                if(this.input.text().length === 0) return false;
                event.preventDefault();
                this.addSeachTag(event);
                this.input.trigger('keyup');
            },
            'keyup': (event) => {
                this.notifyInputState();
                this.toggleDefaultText();
                this.removeItemOnNextBackSpace = this.input.text().length === 0 && this.selectedItems.length !== 0;
            },
            'keydown': (event) => {
                if(this.removeItemOnNextBackSpace === false) return;
                let key = event.keyCode || event.charCode;
                if(key == 8 && this.input.text().length === 0 && this.selectedItems.length !== 0) {
                    this.removeSearchTag(this.selection.find('.' + this.selectedClass + ':last'));
                    this.removeItemOnNextBackSpace = false;
                }
            }
        });

        this.input.on('focus', (event) => {
            this.element.addClass(this.activeClass);
        });

        this.element.on('itemAdd itemRemove', () => this.notifyInputState());
    }

    toggleHasInputClass() {
        if(this.input.text() !== '') {
            this.addButton.addClass(this.hasInputClass);
        } else {
            this.addButton.removeClass(this.hasInputClass);
        }
    }

    removeLineBreaks() {
        let inner = this.input.text().replace('<br>', '');
        this.input.html(inner);
    }

    setCursorToEnd() {
        let range = document.createRange();
        range.selectNodeContents(this.input.get(0));
        range.collapse(false);
        let selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
    }

    notifyInputState() {
        if(this.inputIsEmpty === false && this.input.text().length === 0) {
            this.inputIsEmpty = true;
            this.element.trigger('inputEmpty');
        }

        if(this.inputIsEmpty === true && this.input.text().length > 0) {
            this.inputIsEmpty = false;
            this.element.trigger('inputFill');
        }
    }

    toggleDefaultText() {
        let displayStyle = this.input.text().length === 0 && this.selectedItems.length === 0 ? 'inline-block' : 'none';
        this.defaultText.css('display', displayStyle);
    }

    addSeachTag(event) {
        let selectedItemContainer = $('<div class="' + this.selectedClass + '">' +
                                    this.input.text() + '<i class="' + this.removeButtonClass + '"></i></div>')

        selectedItemContainer.insertBefore(this.defaultText);
        this.addSelectedItemEvents(selectedItemContainer);

        let newItemObject = {
            selectedItem: selectedItemContainer,
            value: this.input.text()
        };

        this.selectedItems.push(newItemObject);
        this.updateValues();
        this.input.html('').trigger('focus');
        this.element.trigger('itemAdd', newItemObject);
    }

    removeSearchTag(selectedItemContainer) {
        let selectedItemObject;
        let selectedItemIndex;

        this.selectedItems.forEach((item, i) => {
            if(item.selectedItem.is(selectedItemContainer)) {
                selectedItemObject = item;
                selectedItemIndex = i;
            }
        });

        selectedItemContainer.remove();

        this.selectedItems.splice(selectedItemIndex, 1);
        this.updateValues();
        this.toggleDefaultText();
        this.input.trigger('focus');
        this.setCursorToEnd();
        this.element.trigger('itemRemove', selectedItemObject);
    }

    updateValues() {
        let values = [];

        this.selectedItems.forEach((item, i) => {
            values.push(item.value);
        });

        this.selectedValues = values;
        this.hiddenInput.val(values.join(','));
    }

    clear() {
        let selectedItemObjects = this.selectedItems;
        this.selectedItems = [];
        this.selectedValues = [];
        this.selection.find('.' + this.selectedClass).remove();
        this.hiddenInput.val('');
        this.toggleDefaultText();
        this.input.html('');
        this.element.trigger('clear');
        return selectedItemObjects;
    }
}