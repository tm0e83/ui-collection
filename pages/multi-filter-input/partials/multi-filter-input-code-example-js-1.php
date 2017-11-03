import MultiFilterInput from './multi-filter-input';

$(() => {
    const inputFilter = new MultiFilterInput($('#input-filter'));
    inputFilter.element
        .on('inputEmpty', event => {})
        .on('inputFill', event => {})
        .on('itemAdd', (event, itemObj) => {})
        .on('itemRemove', (event, itemObj) => {});
});

