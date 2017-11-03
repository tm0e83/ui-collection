import SingleSelectDrop from './single-select-drop';

$(() => {
    const categoriesFilter = new SingleSelectDrop($('#categories-filter'));
    categoriesFilter.element
        .on('itemAdd', (event, itemObj) => {})
        .on('itemRemove', (event, itemObj) => {});
});