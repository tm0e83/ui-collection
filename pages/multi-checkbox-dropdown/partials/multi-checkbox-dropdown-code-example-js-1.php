import MultiCheckboxDropdown from './multi-checkbox-dropdown';

$(() => {
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
});

