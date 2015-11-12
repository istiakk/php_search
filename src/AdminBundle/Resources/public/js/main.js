/*
# =============================================================================
#   Sparkline Linechart JS
# =============================================================================
*/
(function() {
  var linechartResize;

  linechartResize = function() {
    // Retrieve channel hourly stats
    var hourly_channel_loads = $("#channel-hourly-stats-data").val();
    hourly_channel_loads = hourly_channel_loads.split(',');
    $("#channel-hourly-stats").sparkline(hourly_channel_loads, {
      type: "line",
      width: "100%",
      height: "226",
      lineColor: "#a5e1ff",
      fillColor: "rgba(241, 251, 255, 0.9)",
      lineWidth: 3,
      spotColor: "#a5e1ff",
      minSpotColor: "#bee3f6",
      maxSpotColor: "#a5e1ff",
      highlightSpotColor: "#80cff4",
      highlightLineColor: "#cccccc",
      spotRadius: 4,
      chartRangeMin: 0,
      valueSpots: {'0:': '#a5e1ff'}
    });
    
    // Retrieve channel hourly clicks
    var hourly_channel_clicks = $("#channel-hourly-clicks-data").val();
    hourly_channel_clicks = hourly_channel_clicks.split(',');
    $("#channel-hourly-clicks").sparkline(hourly_channel_clicks, {
      type: "line",
      width: "100%",
      height: "226",
      lineColor: "#a5e1ff",
      fillColor: "rgba(241, 251, 255, 0.9)",
      lineWidth: 3,
      spotColor: "#a5e1ff",
      minSpotColor: "#bee3f6",
      maxSpotColor: "#a5e1ff",
      highlightSpotColor: "#80cff4",
      highlightLineColor: "#cccccc",
      spotRadius: 4,
      chartRangeMin: 0,
      valueSpots: {'0:': '#a5e1ff'}
    });
  };

    $(document).ready(function() {
    /*
    # =============================================================================
    #   Navbar scroll animation
    # =============================================================================
    */

    $(".page-header-fixed .navbar.scroll-hide").mouseover(function() {
      $(".page-header-fixed .navbar.scroll-hide").removeClass("closed");
      return setTimeout((function() {
        return $(".page-header-fixed .navbar.scroll-hide").css({
          overflow: "visible"
        });
      }), 150);
    });
    $(function() {
      var delta, lastScrollTop;
      lastScrollTop = 0;
      delta = 50;
      return $(window).scroll(function(event) {
        var st;
        st = $(this).scrollTop();
        if (Math.abs(lastScrollTop - st) <= delta) {
          return;
        }
        if (st > lastScrollTop) {
          $('.page-header-fixed .navbar.scroll-hide').addClass("closed");
        } else {
          $('.page-header-fixed .navbar.scroll-hide').removeClass("closed");
        }
        return lastScrollTop = st;
      });
    });
    /*
    # =============================================================================
    #   Mobile Nav
    # =============================================================================
    */

    $('.navbar-toggle').click(function() {
      return $('body, html').toggleClass("nav-open");
    });

    /*
    # =============================================================================
    #   Clickable table rows and data tables
    # =============================================================================
    */
    $('table tr.href').click(function(){
        window.location = $(this).data('href');
        return false;
    });
    initializeDataTables();

    /*
    # =============================================================================
    #   Form wizard
    # =============================================================================
    */

    $("#wizard").bootstrapWizard({
      nextSelector: ".btn-next",
      previousSelector: ".btn-previous",
      onNext: function(tab, navigation, index) {
        var $current, $percent, $total;
        if (index === 1) {
          if (!$("#widget_widget").val()) {
            $("#widget_widget").focus();
            $("#widget_widget").addClass("has-error");
            return false;
          }
        }
        $total = navigation.find("li").length;
        $current = index + 1;
        $percent = ($current / $total) * 100;
        return $("#wizard").find(".progress-bar").css("width", $percent + "%");
      },
      onPrevious: function(tab, navigation, index) {
        var $current, $percent, $total;
        $total = navigation.find("li").length;
        $current = index + 1;
        $percent = ($current / $total) * 100;
        return $("#wizard").find(".progress-bar").css("width", $percent + "%");
      },
      onTabShow: function(tab, navigation, index) {
        var $current, $percent, $total;
        $total = navigation.find("li").length;
        $current = index + 1;
        $percent = ($current / $total) * 100;
        return $("#wizard").find(".progress-bar").css("width", $percent + "%");
      }
    });


    /*
    # =============================================================================
    #   Select2 and other form related functionality
    # =============================================================================
    */
    $('div.dataTables_length select').addClass('select2able'); // Data tables
    $('div.dataTables_filter input').addClass('form-control');
    $('.select2able').select2({closeOnSelect:false});
    $('.selectpicker').selectpicker({
        style: 'btn-default-original'
    });
    $('.radio').addClass('opacity');
    $('.checkbox').addClass('opacity');
    $('select.quicknav').on('change', function() {
        var url = $(this).val();
        if(url.length > 5) {
            location.href = url;
        }
    })

    /*
    # =============================================================================
    #   Sparkline Linechart JS
    # =============================================================================
    */

    var $alpha, $container, $container2, addEvent, buildMorris, checkin, checkout, d, date, handleDropdown, initDrag, m, now, nowTemp, timelineAnimate, y;
    $("#barcharts").sparkline([190, 220, 210, 220, 220, 260, 300, 220, 240, 240, 220, 200, 240, 260, 210], {
      type: "bar",
      height: "100",
      barSpacing: 4,
      barWidth: 13,
      barColor: "#cbcbcb",
      highlightColor: "#89D1E6"
    });
    $("#pie-chart").sparkline([2, 8, 6, 10], {
      type: "pie",
      height: "220",
      width: "220",
      offset: "+90",
      sliceColors: ["#a0eeed", "#81e970", "#f5af50", "#f46f50"]
    });
    $(".sparkslim").sparkline('html', {
      type: "line",
      width: "100",
      height: "30",
      lineColor: "#adadad",
      fillColor: "rgba(244, 252, 225, 0.0)",
      lineWidth: 2,
      spotColor: "#909090",
      minSpotColor: "#909090",
      maxSpotColor: "#909090",
      highlightSpotColor: "#666",
      highlightLineColor: "#666",
      spotRadius: 0,
      chartRangeMin: 0
    });
    
    /*
    # =============================================================================
    #   Sparkline Resize Script
    # =============================================================================
    */

    if ($('#channel-hourly-stats').length > 0) {
        linechartResize();
        $(window).resize(function() {
          return linechartResize();
        });
    }
    
    /*
    # =============================================================================
    #   Form filtering
    # =============================================================================
    */

    $('.form-filter-control').each(function() {
       var filter_value = $(this).val();
       $('.form-filter').hide();
       var active_filter_class = 'form-filter-' + filter_value;
       $('.' + active_filter_class).show();
       $('.form-filter-all').show();
    });
    $('.form-filter-control').on('change', function() {
       var filter_value = $(this).val();
       $('.form-filter').hide();
       var active_filter_class = 'form-filter-' + filter_value;
       $('.' + active_filter_class).show();
       $('.form-filter-all').show();
    });

    /*
    # =============================================================================
    #   Table filtering
    # =============================================================================
    */

    $('.tablefilter-selector').on('click', function(event) {
        var tables = $.fn.dataTable.fnTables(true);
        $(tables).each(function () {
            $(this).dataTable().fnDestroy();
        });
        event.stopPropagation(); // prevent default bootstrap behavior
        event.preventDefault();
        $(this).toggleClass('active');
        regenerateTableFilters();
        initializeDataTables();
    });

    $('.tablefilter-selector-dropdown').on('change', function(event) {
        var tables = $.fn.dataTable.fnTables(true);
        $(tables).each(function () {
            $(this).dataTable().fnDestroy();
        });
        regenerateTableFilters();
        initializeDataTables();
    });

    /*
    # =============================================================================
    #   jQuery UI Sliders
    # =============================================================================
    */

    function getSliderValue(obj) {
        var slider_id = obj.attr('id');
        var slider_value_id = slider_id.replace("_slider", "");
        if(obj.attr('data-slider-type') == 'int') {
            return parseInt(($("#" + slider_value_id).val()));
        }
        return ($("#" + slider_value_id).val());
    }
    
    $(".slider-basic").each(function() {
        var suffix = $(this).attr('data-slider-suffix');
        var minValue = parseFloat($(this).attr('data-slider-min'));
        var maxValue = parseFloat($(this).attr('data-slider-max'));
        var step = parseFloat($(this).attr('data-slider-step'));
        $(this).slider({
        range: "min",
        value: getSliderValue($(this)),
        step: step,
        min: minValue,
        max: maxValue,
        slide: function(event, ui) {
          var slider_id = $(this).attr('id');
          var slider_value_id = slider_id.replace("_slider", "");
          var slider_amount_id = slider_id + "_amount";
          $("#" + slider_value_id).val(ui.value);
          $("#" + slider_value_id).trigger('change');
          return $("#" + slider_amount_id).html(ui.value + suffix);
        }        
        });
        
        // Add labels to slider whose values 
        // are specified by min, max

        // Get the options for this slider (specified above)
        var opt = $(this).data().uiSlider.options;

        // Get the number of possible values
        var vals = (opt.max - opt.min) / step;

        // Position the labels
        for (var i = 0; i <= vals; i++) {

            // Create a new element and position it with percentages
            var el = $('<label>' + (opt.min + (i * step)) + '</label>').css('left', (i/vals*100) + '%');;
            //el.css('width', (i/vals*100) + '%');
            //el.css('width', '19%');

            // Add the element inside #slider
            $(this).append(el);

        }
        
        var slider_id = $(this).attr('id');
        var slider_amount_id = slider_id + "_amount";
        $("#" + slider_amount_id).html(getSliderValue($(this)) + suffix);
    });
    
    /*
    # =============================================================================
    #   DataTables
    # =============================================================================
    */

    $("#dataTable1").dataTable({
      "sPaginationType": "full_numbers",
      aoColumnDefs: [
        {
          bSortable: false,
          aTargets: [0, -1]
        }
      ],
      "scrollX": true
    });
    $('.table').each(function() {
      return $(".table #checkAll").click(function() {
        if ($(".table #checkAll").is(":checked")) {
          return $(".table input[type=checkbox]").each(function() {
            return $(this).prop("checked", true);
          });
        } else {
          return $(".table input[type=checkbox]").each(function() {
            return $(this).prop("checked", false);
          });
        }
      });
    });

    /*
    # =============================================================================
    #   Bootstrap Tabs
    # =============================================================================
    */

    $("#myTab a:last").tab("show");
    /*
    # =============================================================================
    #   Bootstrap Popover
    # =============================================================================
    */

    $(".popover-trigger").popover();
    /*
    # =============================================================================
    #   Bootstrap Tooltip
    # =============================================================================
    */

    $(".tooltip-trigger").tooltip();
    /*
    # =============================================================================
    #   jQuery VMap
    # =============================================================================
    */

    if ($("#vmap").length) {
      $("#vmap").vectorMap({
        map: "world_en",
        backgroundColor: null,
        color: "#fff",
        hoverOpacity: 0.2,
        selectedColor: "#fff",
        enableZoom: true,
        showTooltip: true,
        values: sample_data,
        scaleColors: ["#59cdfe", "#0079fe"],
        normalizeFunction: "polynomial"
      });
    }

    /*
    # =============================================================================
    #   Popover JS
    # =============================================================================
    */

    $('#popover').popover();

  });

}).call(this);

function removeTableFilter(filter) {
    var tmp = filter.split('-');
    switch (tmp[0]) {
        case 'category': // Gather dropdown filters here
        case 'channel':
        case 'country':
        case 'publisher':
            var obj = $(".tablefilter-selector-dropdown[data-tablefiltertype='" + tmp[0] + "']");
            obj.find('option[value=' + tmp[1] + ']').attr('selected', false);
            obj.trigger('change');
            if(obj.hasClass('selectpicker')) {
                obj.selectpicker('refresh');
            }
            /*if (obj.hasClass('select2able')) {
                obj.select2("val", 0);
            } else if (obj.hasClass('selectpicker')) {
                obj.selectpicker("val", 0);
            } else {
                obj.val(0);
            }*/
            break;
        default:
            $('.tablefilter-selector[data-tablefiltertype="' + tmp[0] + '"][data-id="' + tmp[1] + '"]').toggleClass('active');
    }
    regenerateTableFilters();
}

function regenerateTableFilters(isButton) {
    $('.tablefilter').hide();
    $('#selected-filters').html(''); // Clear selected filters
    var active = 0;
    $('.tablefilter-selector').each(function() {
        if($(this).hasClass('active')) {
            active++;
            var filtertype = $(this).attr('data-tablefiltertype');
            var id = $(this).attr('data-id');
            var label = $(this).attr('data-label');
            var html = '<div class="label label-default"> ' + label + ' <i class="fa fa-times" onclick="removeTableFilter(\'' + filtertype + '-' + id + '\');"></i></div>';
            $('#selected-filters').append(html);
            $('.tablefilter-' + filtertype + '-' + id).show();
        }
    });
    var id ='';
    $('select.tablefilter-selector-dropdown').each(function() {
        vals = parseInt($(this).val());
        if(vals > 0) {
            active++;
            var filtertype = $(this).attr('data-tablefiltertype');
            
            var options = $(this).find(':selected');
            var html = '';
            options.each(function() {
                id = $(this).val();
                if(id != 0) {
                    html += '<div class="label label-default label-dropdown"> ' + $(this).text() + ' <i class="fa fa-times" onclick="removeTableFilter(\'' + filtertype + '-' + id + '\');"></i></div>';
                    $('.tablefilter-' + filtertype + '-' + id).show();
                }
            });
            $('#selected-filters').append(html);
        }
    });
    if (active == 0) {
        $('.tablefilter').show();
    }
}

function initializeDataTables() {
    $('table.sprinkle-data-table').dataTable({
        "language": {
            "lengthMenu": "Antal rader per sida _MENU_",
            "zeroRecords": "Inget hittades - sorry",
            "info": "Visar sid _PAGE_ av _PAGES_",
            "infoEmpty": "Ingen data tillgänglig",
            "infoFiltered": "(filtrerade från totalt _MAX_ rader)",
            "search": "Sök",
            "paginate": {
                previous: "Föregående",
                next: "Nästa"
            }
        },
        /* Disable initial sort */
        "aaSorting": [],
        "pageLength": 25,
        "order": [],
        "columnDefs": [ {
          "targets"  : 'no-sort',
          "orderable": false,
        }]
    });
}

function iniDataTables() {
    $('table.pris-data-table').dataTable({
        "language": {
            "lengthMenu": "Antal rader per sida _MENU_",
            "zeroRecords": "Inget hittades - sorry",
            "info": "Visar sid _PAGE_ av _PAGES_",
            "infoEmpty": "Ingen data tillgänglig",
            "infoFiltered": "(filtrerade från totalt _MAX_ rader)",
            "search": "Sök",
            "paginate": {
                previous: "Föregående",
                next: "Nästa"
            }
        },
        /* Disable initial sort */
        "aaSorting": [],
        "pageLength": 25,
        "order": [],
        "columnDefs": [ {
          "targets"  : 'no-sort',
          "orderable": false,
        }]
    });
}


function IsJson(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

function isEmail(str) { 
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(str);
}

function getQueryVariable(variable)
{
       var query = window.location.search.substring(1);
       var vars = query.split("&");
       for (var i=0;i<vars.length;i++) {
               var pair = vars[i].split("=");
               if(pair[0] == variable){return pair[1];}
       }
       return(false);
}