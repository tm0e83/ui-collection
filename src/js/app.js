import TwoListFilter from './two-list-filter';
import MultiCheckboxDropdown from './multi-checkbox-dropdown';
import MultiSelectDropdown from './multi-select-dropdown';
import MultiFilterInput from './multi-filter-input';
import SingleSelectDrop from './single-select-drop';
import Notifications from './notifications';

$(() => {
    $(document).foundation();

    $('pre code').each(function(i, block) {
        hljs.highlightBlock(block);
    });

    let notify = new Notifications({
        duration: 3000,
        types: {
            'alert': {
                color: '#fff',
                bgColor: '#e74c3c',
                borderColor: '#e74c3c',
                closerColor: '#fff'
            },
            'warning': {
                color: '#fff',
                bgColor: '#f39c12',
                borderColor: '#f39c12',
                closerColor: '#fff'
            },
            'success': {
                color: '#fff',
                bgColor: '#27ae60',
                borderColor: '#27ae60',
                closerColor: '#fff'
            }
        }
    });

    $('#send-default-notification').on('click', () => {
        notify.send('<b>Default message</b><br>Lorem ipsum dolor sit amet, consectetur adipisicing elit.');
    });

    $('#send-alert-notification').on('click', () => {
        notify.send('<i class=\'fa fa-exclamation-circle\' aria-hidden=\'true\'></i>&nbsp;&nbsp;Alert message with icon', 'alert');
    });

    $('#send-warning-notification').on('click', () => {
        notify.send('Warning message', 'warning');
    });

    $('#send-success-notification').on('click', () => {
        notify.send('Success message', 'success');
    });

    if($('#two-list-filter').length != 0) {
        const listFilter = new TwoListFilter($('#two-list-filter'));
        listFilter.element
            .on('selectionChange', (event, values) => console.log('current selection: ', values))
            .on('itemAdd', (event, values) => console.log('items added: ', values))
            .on('itemRemove', (event, values) => console.log('items removed: ', values));
    }

    if($('#dropdown-filter').length != 0) {
        const dropdownFilter = new MultiSelectDropdown($('#dropdown-filter'));
    }

    if($('#checkbox-filter').length != 0) {
        const checkboxFilter = new MultiCheckboxDropdown($('#checkbox-filter'), {
            maxRows: 8,
            breakpoints: [{
                width: 680,
                columns: 2,
                //maxRows: 3
            }, {
                width: 1020,
                columns: 3,
                maxRows: 3
            }]
        });
        checkboxFilter.element
            .on('selectionChange', (event, values) => {
                console.log(values);
            })
            .on('optionSelect', (event, values) => {
                console.log(values);
            })
            .on('optionDeselect', (event, values) => {
                console.log(values);
            });
    }

    if($('#checkbox-filter2').length != 0) {
        const checkboxFilter2 = new MultiCheckboxDropdown($('#checkbox-filter2'), {
            maxRows: 8,
            breakpoints: [{
                width: 680,
                columns: 2
            }, {
                width: 1020,
                columns: 3,
                maxRows: 4,
                adjustHeight: false
            }]
        });
        checkboxFilter2.element
            .on('selectionChange', (event, values) => {
                console.log(values);
            })
            .on('optionSelect', (event, values) => {
                console.log(values);
            })
            .on('optionDeselect', (event, values) => {
                console.log(values);
            });
    }

    if($('#checkbox-filter3').length != 0) {
        const checkboxFilter3 = new MultiCheckboxDropdown($('#checkbox-filter3'), {
            maxRows: 0,
            breakpoints: [{
                width: 680,
                columns: 2
            }, {
                width: 1020,
                columns: 4
            }]
        });
        checkboxFilter3.element
            .on('selectionChange', (event, values) => {
                console.log(values);
            })
            .on('optionSelect', (event, values) => {
                console.log(values);
            })
            .on('optionDeselect', (event, values) => {
                console.log(values);
            });
    }

    if($('#input-filter').length != 0) {
        const inputFilter = new MultiFilterInput($('#input-filter'));
        inputFilter.element
            .on('inputEmpty', event => {})
            .on('inputFill', event => {})
            .on('itemAdd', (event, itemObj) => {})
            .on('itemRemove', (event, itemObj) => {});
    }

    if($('#categories-filter').length != 0) {
        const categoriesFilter = new SingleSelectDrop($('#categories-filter'));
        categoriesFilter.element
            .on('itemAdd', (event, itemObj) => {})
            .on('itemRemove', (event, itemObj) => {});
    }
});