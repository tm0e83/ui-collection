import MultiCheckboxDropdown from './multi-checkbox-dropdown';

$(() => {
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
});

