import MultiCheckboxDropdown from './multi-checkbox-dropdown';

$(() => {
    const checkboxFilter2 = new MultiCheckboxDropdown($('#checkbox-filter2'), {
        maxRows: 8,
        breakpoints: [{
            width: 680,
            columns: 2
        }, {
            width: 1020,
            columns: 3
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
});

