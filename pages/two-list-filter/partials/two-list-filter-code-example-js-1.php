import TwoListFilter from './two-list-filter';

$(() => {
    const filterList = new TwoListFilter($('#two-list-filter'));
    filterList.element
        .on('selectionChange', (event, values) => console.log('current selection: ', values))
        .on('itemAdd', (event, values) => console.log('items added: ', values))
        .on('itemRemove', (event, values) => console.log('items removed: ', values));
});