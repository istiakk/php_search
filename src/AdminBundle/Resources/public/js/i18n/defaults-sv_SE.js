/*
 * Translated default messages for bootstrap-select.
 * Locale: SV (Swedish)
 * Region: SE (Sweden)
 */
(function ($) {
  $.fn.selectpicker.defaults = {
    noneSelectedText: 'Inget valt',
    noneResultsText: 'Inga träffar',
    countSelectedText: function (numSelected, numTotal) {
      return (numSelected == 1) ? "{0} alternativ valt" : "{0} valda alternativ";
    },
    maxOptionsText: function (numAll, numGroup) {
      var arr = [];

      arr[0] = (numAll == 1) ? 'Gränsen nådd (max {n} alternativ)' : 'Gränsen nådd (max {n} alternativ)';
      arr[1] = (numGroup == 1) ? 'Group limit reached ({n} item max)' : 'Group limit reached ({n} items max)';

      return arr;
    },
    selectAllText: 'Välj alla',
    deselectAllText: 'Avmarkera alla',
    multipleSeparator: ', '
  };
}(jQuery));
