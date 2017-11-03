/**
 * Class for multi-select-dropdowns with search bar
 * @param {object} container - jQuery Object of the outer container
 * @param {object} options - class settings
 * @event clearAll - fires when all items are removed at the same time
 */
export default class MultiSelectDropdown {
    constructor(container, options) {
        this.element = container;

        const defaults = {
            searchTargetSelector: ''
        }
        this.o = $.extend({}, defaults, options || {});

        this.label = this.element.find('.uic-label');
        this.input = this.element.find('.uic-input');
        this.menu = this.element.find('.uic-menu');
        this.selectAllButton = this.element.find('.uic-select-all');
        this.selectAllVisibleButton = this.element.find('.uic-select-all-visible');
        this.deselectAllButton = this.element.find('.uic-deselect-all');
        this.deselectAllVisibleButton = this.element.find('.uic-deselect-all-visible');
        this.showAllButton = this.element.find('.uic-show-all');
        this.showAllSelectedButton = this.element.find('.uic-show-all-selected');
        this.confirmButton = this.element.find('.uic-confirm-button');
        this.selectWrap = this.element.find('.uic-select-wrap');
        this.options = this.element.find('.uic-menu-item');
        this.message = this.element.find('.uic-message');

        this.selectedClass = 'uic-selected';
        this.preselectedClass = 'uic-preselected';
        this.expandedClass = 'uic-expanded';
        this.dataAttrNameSingular = 'uic-selected-text-singular';
        this.dataAttrNamePlural = 'uic-selected-text-plural';
        this.selectedValues = [];
        this.selectedOptions = [];

        this.isAnimating = false;
        this.isExpanded = false;

        this.addEvents();
        this.updateSum();
    }

    addEvents() {
        $(window).on('click', (event) => {
            if($.contains(this.element.get(0), event.target) === false && this.isExpanded === true) {
                this.closeMenu();
            }
        });

        this.label.on('click', (event) => {
            if(this.isExpanded === true) {
                this.closeMenu();
            } else {
                this.showMenu();
                this.toggleSelectAllMenu();
            }
        });

        this.input.on({
            'keyup': (event) => {
                if(this.input.val().length > 0) {
                    this.showAllOptions();
                }
                this.filterItems();
                this.toggleSelectAllMenu();
            }
        });

        this.selectAllButton.on('click', (event) => {
            event.preventDefault();
            this.options.addClass(this.selectedClass);
            this.toggleSelectAllMenu();
        });

        this.selectAllVisibleButton.on('click', (event) => {
            event.preventDefault();
            this.getAllVisibleOptions().addClass(this.selectedClass);
            this.toggleSelectAllMenu();
        });

        this.deselectAllButton.on('click', (event) => {
            event.preventDefault();
            this.options.removeClass(this.selectedClass);
            this.toggleSelectAllMenu();
        });

        this.deselectAllVisibleButton.on('click', (event) => {
            event.preventDefault();
            this.getAllVisibleOptions().removeClass(this.selectedClass);
            this.toggleSelectAllMenu();
        });

        this.showAllButton.on('click', (event) => {
            event.preventDefault();
            this.showAllOptions();
            this.toggleSelectAllMenu();
        });

        this.showAllSelectedButton.on('click', (event) => {
            event.preventDefault();
            this.showOnlySelectedOptions();
            this.toggleSelectAllMenu();
        });

        $(window).on('keyup', (event) => {
            if(event.shiftKey === false) {
                this.multiselect = false;
                this.lastSelectedOption = null;
                this.options.filter('.' + this.preselectedClass)
                    .removeClass(this.preselectedClass)
                    .addClass(this.selectedClass)
            }
        });

        this.options.on('mousedown', (event) => {
            event.preventDefault();

            if(event.shiftKey === true && this.lastSelectedOption !== null) {
                this.toggleSelectRange(event);
            } else {
                this.toggleSelectOption(event);
            }
        });
    }

    toggleSelectOption() {
        $(event.currentTarget).toggleClass(this.selectedClass);
        this.lastSelectedOption = $(event.currentTarget);
    }

    toggleSelectRange(event) {
        let lastSelectedOptionIndex = this.options.index(this.lastSelectedOption);
        let currentOptionIndex = this.options.index($(event.currentTarget));
        let isSelected = this.lastSelectedOption.hasClass(this.selectedClass);

        let startIndex = Math.min(lastSelectedOptionIndex, currentOptionIndex) ;
        let endIndex = Math.max(lastSelectedOptionIndex, currentOptionIndex);

        this.options.filter('.' + this.preselectedClass).removeClass(this.preselectedClass);

        for(let i = startIndex; i <= endIndex; i++) {
            let currentOption = this.options.eq(i);
            if(currentOption.is(this.lastSelectedOption) === false) {
                if(isSelected === true) {
                    this.options.eq(i).addClass(this.preselectedClass);
                } else {
                    this.options.eq(i)
                        .removeClass(this.preselectedClass)
                        .removeClass(this.selectedClass);
                }
            }
        }
    }

    showOnlySelectedOptions(bool) {
        this.getUnselectedOptions().css('display', 'none');
        this.getSelectedOptions().css('display', 'block');
        this.showAllSelectedButton.css('display', 'none');
        this.showAllButton.css('display', 'block');
    }

    showAllOptions() {
        this.options.css('display', 'block');
        this.showAllButton.css('display', 'none');
        this.showAllSelectedButton.css('display', 'block');
    }

    toggleSelectAllMenu() {
        let allVisible = this.getAllVisibleOptions().length == this.options.length;
        let allVisibleSelected = this.getAllVisibleSelectedOptions().length === this.getAllVisibleOptions().length;
        let hasVisibleSelected = this.getAllVisibleSelectedOptions().length > 0;

        // toggle 'select all visible' button
        let displayStyle = allVisible === false && allVisibleSelected === false  ? 'block' : 'none';
        this.selectAllVisibleButton.css('display', displayStyle);

        // toggle 'deselect all visible' button
        displayStyle = allVisible === false && hasVisibleSelected === true  ? 'block' : 'none';
        this.deselectAllVisibleButton.css('display', displayStyle);

        // toggle 'select all' button
        displayStyle = allVisible === true && allVisibleSelected === false ? 'block' : 'none';
        this.selectAllButton.css('display', displayStyle);

        // toggle 'deselect all' button
        displayStyle = allVisible === true && hasVisibleSelected === true ? 'block' : 'none';
        this.deselectAllButton.css('display', displayStyle);
    }

    filterItems() {
        let searchString = this.input.val(),
            regex = new RegExp(searchString, 'i');

        this.options.each((i, item) => {
            let displayStyle = $(item).text().match(regex) === null ? 'none' : 'block';
            $(item).css('display', displayStyle);
        });

        if(this.getAllVisibleOptions().length === 0) {
            this.selectWrap.css('display', 'none');
            this.message.css('display', 'block');
        } else {
            this.message.css('display', 'none');
            this.selectWrap.css('display', 'block');
        }
    }

    updateSum() {
        // if(this.element.hasClass(this.expandedClass) === false && this.select.val()) {
        //     let selectedText;
        //     if(this.select.val().length == 1) {
        //         selectedText = this.input.data(this.dataAttrNameSingular).replace('{n}', this.select.val().length);
        //     } else {
        //         selectedText = this.input.data(this.dataAttrNamePlural).replace('{n}', this.select.val().length);
        //     }
        //     this.input.val(selectedText);
        // }
    }

    showMenu() {
        if(this.isAnimating === true) return;
        // this.input.val('');
        // this.filterItems();
        this.isAnimating = true;
        // this.showAllSelectedButton.css('display', 'block');
        // this.showAllButton.css('display', 'none');
        this.element.addClass(this.expandedClass);
        this.menu.slideToggle(200, () => {
            this.isAnimating = false;
            this.isExpanded = true;
        });
    }

    closeMenu() {
        if(this.isAnimating === true) return;
        this.isAnimating = true;
        setTimeout(() => {
            this.element.removeClass(this.expandedClass);
            this.updateSum();
            this.menu.slideToggle(150, () => {
                this.isAnimating = false;
                this.isExpanded = false;
                this.input.trigger('keyup');
            })
        }, 50);
    }

    getAllVisibleOptions() {
        return this.options.filter((i, item) => $(item).css('display') != 'none');
    }

    getAllVisibleSelectedOptions() {
        return this.getAllVisibleOptions().filter('.' + this.selectedClass);
    }

    getSelectedOptions() {
        return this.options.filter((index, option) => {
            return $(option).hasClass(this.selectedClass) === true;
        });
    }

    getUnselectedOptions() {
        return this.options.filter((index, option) => {
            return $(option).hasClass(this.selectedClass) === false;
        });
    }

    clear() {
        this.select.val('');
        this.element.trigger('clearAll');
        return this.select.val();;
    }
}