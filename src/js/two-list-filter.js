/**
 * Class for filters with two lists (available items, chosen items)
 * @param {object} container - jQuery Object of the outer container
 * @param {object} options - class settings
 * @event selectionChange - fires whenever items are added or removed and passes all selected items
 * @event itemAdd - fires whenever items are added and passes all added items
 * @event itemRemove - fires whenever items are removed and passes all removed items
 */
export default class TwoListFilter {
    constructor(container, options) {
        this.element = container;

        const defaults = {
            initialSort: true      // set to true if options should be sorted on init
        };
        this.settings = $.extend({}, defaults, options || {});

        this.searchAvailable = this.element.find('.uic-search-available');
        this.searchChosen = this.element.find('.uic-search-chosen');

        this.addButton = this.element.find('.uic-add');
        this.removeButton = this.element.find('.uic-remove');
        this.addAllButton = this.element.find('.uic-add-all');
        this.removeAllButton = this.element.find('.uic-remove-all');

        this.availableItemsList = this.element.find('.uic-column-available .uic-list');
        this.chosenItemsList = this.element.find('.uic-column-chosen .uic-list');

        this.availableCount = this.element.find('.uic-num-available-entries');
        this.chosenCount = this.element.find('.uic-num-chosen-entries');

        this.availableSelectedCount = this.element.find('.uic-available-selected-count');
        this.chosenSelectedCount = this.element.find('.uic-chosen-selected-count');

        this.listClass = 'uic-list';
        this.selectedClass = 'uic-selected';
        this.preselectedClass = 'uic-preselected';
        this.activeClass = 'uic-active';
        this.activeSearchFilterClass = 'uic-filtered';
        this.invisibleClass = 'uic-invisible';
        this.valueDataAttr = 'data-uic-value';
        this.selectedValues = [];

        // sort items
        if(this.settings.initialSort === true) {
            this.availableItemsList.html(this.availableItemsList.find('li').sort((a, b) => {
                return $(a).text().localeCompare($(b).text());
            }));
        }

        this.updateCount();
        this.addEvents();
    }

    addEvents() {
        this.searchAvailable.on('input', (e) => this.filterItems(this.searchAvailable, this.availableItemsList));
        this.searchChosen.on('input', (e) => this.filterItems(this.searchChosen, this.chosenItemsList));

        this.addListItemEvents(this.element.find('.' + this.listClass + ' li'));

        this.addButton.on('click', (e) => {
            e.preventDefault();
            let items = this.availableItemsList.find('li').filter('.' + this.selectedClass).removeClass(this.selectedClass);

            if(items.length === 0) return;

            let sortedItems = this.chosenItemsList.find('li').add(items).sort((a, b) => {
                return $(a).text().localeCompare($(b).text());
            });

            sortedItems
                .removeClass(this.selectedClass)
                .removeClass(this.preselectedClass);

            items.remove();

            this.chosenItemsList.empty().append(sortedItems);
            this.addListItemEvents(sortedItems);
            this.updateCount();
            this.toggleHighlightButtons();
            this.clearSearch();
            this.publishValues(items, 'Add');
        });

        this.removeButton.on('click', (e) => {
            e.preventDefault();
            let items = this.chosenItemsList.find('li').filter('.' + this.selectedClass).removeClass(this.selectedClass);

            if(items.length === 0) return;

            let sortedItems = this.availableItemsList.find('li').add(items).sort((a, b) => {
                return $(a).text().localeCompare($(b).text());
            });

            sortedItems
                .removeClass(this.selectedClass)
                .removeClass(this.preselectedClass);

            items.remove();

            this.availableItemsList.empty().append(sortedItems);
            this.addListItemEvents(sortedItems);
            this.updateCount();
            this.toggleHighlightButtons();
            this.clearSearch();
            this.publishValues(items, 'Remove');
        });

        this.addAllButton.on('click', (e) => {
            e.preventDefault();
            let items = this.availableItemsList.find('li').not('.' + this.invisibleClass);

            if(items.length === 0) return;

            let sortedItems = this.chosenItemsList.find('li').add(items).sort((a, b) => {
                return $(a).text().localeCompare($(b).text());
            });

            sortedItems
                .detach()
                .removeClass(this.selectedClass)
                .removeClass(this.preselectedClass)
                .appendTo(this.chosenItemsList);

            this.updateCount();
            this.toggleHighlightButtons();
            this.clearSearch();
            this.publishValues(items, 'Add');
        });

        this.removeAllButton.on('click', (e) => {
            e.preventDefault();
            let items = this.chosenItemsList.find('li').not('.' + this.invisibleClass);

            if(items.length === 0) return;

            let sortedItems = this.availableItemsList.find('li').add(items).sort((a, b) => {
                return $(a).text().localeCompare($(b).text());
            });

            sortedItems
                .detach()
                .removeClass(this.selectedClass)
                .removeClass(this.preselectedClass)
                .appendTo(this.availableItemsList);

            this.updateCount();
            this.toggleHighlightButtons();
            this.clearSearch();
            this.publishValues(items, 'Remove');
        });

        $(window).on('keyup', (e) => {
            if(e.shiftKey === false) {
                this.lastSelectedOption = null;
                this.element.find('ul li').filter('.' + this.preselectedClass)
                    .removeClass(this.preselectedClass)
                    .addClass(this.selectedClass);
            }
        });
    }

    clearSearch() {
        this.searchAvailable.val('').trigger('input');
        this.searchChosen.val('').trigger('input');
    }

    addListItemEvents(items) {
        items.on('mousedown', (e) => {
            let list = $(e.target).parent('ul');
            let targetList =  this.element.find('.' + this.listClass).not(list);

            if(this.lastSelectedOption && this.lastSelectedOption.parent(targetList) === true) {
                this.lastSelectedOption = null;
                targetList.find('li').removeClass(this.selectedClass);
            }

            if(e.shiftKey === true && this.lastSelectedOption !== null && list.find('.' + this.selectedClass).length > 0) {
                this.toggleSelectRange(e);
            } else {
                this.toggleSelectOption(e);
            }

            targetList.find('li').removeClass(this.selectedClass + ' ' + this.preselectedClass);
            this.updateCount();
            this.toggleHighlightButtons();
        });
    }

    toggleSelectOption(event) {
        $(event.currentTarget).toggleClass(this.selectedClass);
        this.lastSelectedOption = $(event.currentTarget);
    }

    toggleSelectRange(event) {
        let listItems = $(event.currentTarget).parent('ul').find('li');
        let lastSelectedOptionIndex = listItems.index(this.lastSelectedOption);
        let currentOptionIndex = listItems.index($(event.currentTarget));
        let isSelected = this.lastSelectedOption.hasClass(this.selectedClass);

        let startIndex = Math.min(lastSelectedOptionIndex, currentOptionIndex) ;
        let endIndex = Math.max(lastSelectedOptionIndex, currentOptionIndex);

        listItems.filter('.' + this.preselectedClass).removeClass(this.preselectedClass);

        for(let i = startIndex; i <= endIndex; i++) {
            let currentOption = listItems.eq(i);
            if(currentOption.is(this.lastSelectedOption) === false) {
                if(isSelected === true) {
                    listItems.eq(i).addClass(this.preselectedClass);
                } else {
                    listItems.eq(i)
                        .removeClass(this.preselectedClass)
                        .removeClass(this.selectedClass);
                }
            }
        }
    }

    filterItems(inputField, searchTargetList) {
        let regex = new RegExp(inputField.val(), 'i');

        searchTargetList.find('li').each((i, item) => {
            if($(item).text().match(regex) === null) {
                $(item).addClass(this.invisibleClass).removeClass(this.selectedClass);
            } else {
                $(item).removeClass(this.invisibleClass);
            }
        });

        if(searchTargetList.find('.' + this.invisibleClass).length > 0) {
            inputField.parent('div').addClass(this.activeSearchFilterClass);
        } else {
            inputField.parent('div').removeClass(this.activeSearchFilterClass);
        }

        this.updateCount();
    }

    updateCount() {
        let selectedCount = this.availableItemsList.find('.' + this.selectedClass).length;
        let preselectedCount = this.availableItemsList.find('.' + this.preselectedClass + ':not(.' + this.selectedClass + ')').length;
        this.availableSelectedCount.text(selectedCount + preselectedCount);

        let numEntries = this.availableItemsList.find('li').not('.' + this.invisibleClass).length;
        this.availableCount.text(numEntries);

        selectedCount = this.chosenItemsList.find('.' + this.selectedClass).length;
        preselectedCount = this.chosenItemsList.find('.' + this.preselectedClass + ':not(.' + this.selectedClass + ')').length;
        this.chosenSelectedCount.text(selectedCount + preselectedCount);

        numEntries = this.chosenItemsList.find('li').not('.' + this.invisibleClass).length;
        this.chosenCount.text(numEntries);
    }

    toggleHighlightButtons() {
        if(this.availableItemsList.find('.' + this.selectedClass).length > 0) {
            this.addButton.addClass(this.activeClass);
        } else {
            this.addButton.removeClass(this.activeClass);
        }

        if(this.chosenItemsList.find('.' + this.selectedClass).length > 0) {
            this.removeButton.addClass(this.activeClass);
        } else {
            this.removeButton.removeClass(this.activeClass);
        }
    }

    clear() {
        this.removeAllButton.trigger('click');
        this.element.trigger('clear');
    }

    publishValues(items, action) {
        let chosenValues = [];
        this.chosenItemsList.find('li').each((i, item) => {
            chosenValues.push($(item).attr(this.valueDataAttr));
        });

        let actionValues = [];
        items.each((i, item) => {
            actionValues.push($(item).attr(this.valueDataAttr));
        });

        this.selectedValues = chosenValues;

        this.element
            .trigger('selectionChange', [chosenValues])
            .trigger('item' + action, [actionValues]);
    }
}