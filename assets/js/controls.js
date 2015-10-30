function updateChart(value) {
    //var data = cdfGreaterThanOrEqual(value, 1/3);
    distribution.datasets[0].points[5].value = .75;
}

$(document).ready(function() {
    $("#slider-range-min").slider({
        range: "min",
        value: 10,
        min: 1,
        max: 75,
        slide: function (event, ui) {
            $("#tags").val(ui.value);
            updateChart(ui.value);
        }
    });
    $("#tags").val($("#slider-range-min").slider("value"));
    $("#tags").change(function() {
        var newVal = $(this).val();
        if(newVal > 0 && newVal <= 75) {
            $( "#slider-range-min" ).slider( "option", "value", newVal );
        }
    });
});
