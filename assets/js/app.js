var data = {
    labels: range(0, 11).map(String),
    datasets: [
        {
            label: 'Probability',
            fill: true,
            backgroundColor: "rgba(155, 204, 96, 0.1)",
            borderColor: "rgba(155, 204, 96, 1)",
            borderCapStyle: 'round',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'round',
            pointBackgroundColor: "#2d2721",
            pointBorderColor: "#9bcc60",
            pointBorderWidth: 1,
            pointHoverRadius: 6,
            pointHoverBackgroundColor: "#2d2721",
            pointHoverBorderColor: "#e6e6e6",
            pointHoverBorderWidth: 3,
            data: cdfGreaterThanOrEqual(10, 1/3).yVals
        }
    ]
};
var options = {

    tooltips: {
        mode: 'label'
    },
    hover: {
        mode: 'label'
    },

};

function computeGlitches(value) {
    var Glitch = {
        standard: 0,
        critical: 0,
    };

    var half = (value % 2 == 0) ? ((value / 2) - 1) : Math.floor(value / 2);

    if (value % 2 == 0) {
        Glitch.standard = (1 - cdf(half, value, 1/6));
    } else {
        Glitch.standard = (1 - cdf(half, value, 1/6));
    }

    var zeroToTotalRatio = Math.pow(2/3, value);
    var chanceGivenNoHits = 1 - cdf(half, value, 1/4);
    Glitch.critical = zeroToTotalRatio * chanceGivenNoHits;
    return Glitch;
}

function updateDistribution(chart, ctx, value) {
    if (typeof(chart.data.datasets[1]) !== 'undefined') {
        chart.data.datasets.pop();
    }
    chart.data.datasets[0].label = 'Probability';
    chart.data.labels = range(0, value + 1).map(String);
    chart.data.datasets[0].data = cdfGreaterThanOrEqual(value, 1/3).yVals;

    var Glitch = computeGlitches(value);
    $("#glitch").val(Glitch.standard.toPrecision(4));
    $("#criticalGlitch").val(Glitch.critical.toPrecision(4));
    var disableAnimation = $("#disableAnim").prop("checked");
    if (disableAnimation) {
        chart.options.animation.duration = 0;
    } else {
        chart.options.animation.duration = 1000;
    }
    chart.update();
}

function graphGlitches(chart, ctx, value) {
    chart.data.labels = range(0, value + 1).map(String);
    chart.data.datasets[0].label = '';
    var glitches = [];
    var criticals = [];
    for(var i = 0; i < value + 1; i++) {
        var Glitch = computeGlitches(i);
        glitches.push(Glitch.standard.toPrecision(4));
        criticals.push(Glitch.critical.toPrecision(4));
    }
    chart.data.datasets[0].data = glitches;
    if (typeof(chart.data.datasets[1]) == 'undefined') {
        chart.data.datasets[1] =
            {
                label: '',
                fill: true,
                backgroundColor: "rgba(227, 221, 201, 0.2)",
                borderColor: "rgba(105, 84, 68, 1)",
                borderCapStyle: 'round',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'round',
                pointBackgroundColor: "#e3ddc9",
                pointBorderColor: "#2d2721",
                pointBorderWidth: 1,
                pointHoverRadius: 6,
                pointHoverBackgroundColor: "#9bcc60",
                pointHoverBorderColor: "#695444",
                pointHoverBorderWidth: 3,
                data: criticals,
            };
    } else {
        chart.data.datasets[1].label = '';
        chart.data.datasets[1].data = criticals;
    }
    chart.update();
}

$(document).ready(function() {
    // disable enter to submit
    $(window).keydown(function(event) {
        if ((event.keyCode == 13)) {
            $("#diceInput").trigger("change");
            return false;
        }
    });

    var ctx = $("#myChart");
    var lineChart = new Chart(ctx, {
        type: 'line',
        data: data,
        options: options,
    });

    var defaultDice = 10;

    var slider = document.getElementById('slider-range-min');
    noUiSlider.create(slider, {
        start: 10,
        step: 1,
        range: {
            'min': 1,
            'max': 50,
        },
        connect: 'lower',
        direction: 'ltr',
        orientation: 'horizontal',
        behaviour: 'tap',
    });

    slider.noUiSlider.on('update', function() {
        var newValue = slider.noUiSlider.get();
        $("#diceInput").val(newValue);
        updateDistribution(lineChart, ctx, newValue);
    });

    $("#diceInput").spinner({
        min: 1,
        max: 50,
        value: 10,
        step: 1,
        numberFormat: "n",
        incremental: false,
        change: function(event, ui) {
            var newVal = $("#diceInput").val();
            slider.noUiSlider.set(newVal);
        },
        spin: function(event, ui) {
            var newVal = ui.value;
            slider.noUiSlider.set(newVal);
        }
    });

    $("#diceInput").keyup(function(event) {
        if(event.keyCode == 13) {
            var newVal = $("#diceInput").val();
            slider.noUiSlider.set(newVal);
        }
    });

    $("#hitInput").spinner({
        min: 1,
        max: 50,
        value: 4,
        step: 1,
        numberFormat: "n",
        change: function(event, ui) {
            var newValue = $(this).val();
            if (newValue > 50) {
                $(this).val(50);
            } else if (newValue < 1) {
                $(this).val(1);
            }
        }
    });
    $("#probInput").spinner({
        min: 0.01,
        max: 1.00,
        value: 0.75,
        step: 0.01,
        numberFormat: "n",
        change: function(event, ui) {
            var newValue = $(this).val();
            if (newValue > 1.00) {
                $(this).val(1.00);
            } else if (newValue < 0.01) {
                $(this).val(0.01);
            }
        }
    });

    $("#glitchNum").spinner({
        min: 1,
        max: 20,
        value: 10,
        step: 1,
        numberFormat: "n",
    });

    $("#glitchNum").keyup(function(event) {
        if(event.keyCode == 13) {
            $("#showGlitches").click();
        }
    });

    $("#findN").button().click(function(event) {
        event.preventDefault();
        var hits = Number($("#hitInput").val());
        var probability = Number($("#probInput").val());
        var pool = find_n(hits, probability);
        $("#result").val(pool);
        slider.noUiSlider.set(pool);
    });

    $("#showGlitches").button().click(function(event, ui) {
        var val = parseInt($("#glitchNum").val());
        console.log(typeof(val));
        graphGlitches(lineChart, ctx, val);
    });

    $("#showGlitches").keyup(function(event) {
        if(event.keyCode == 13) {
            $("#showGlitches").click();
        }
    });

    $("#diceInput").val(slider.noUiSlider.get());

    $(".uk-accordion-title").click(function() {
        var elem = '.' + $(this).attr('data');
        $('.instr').addClass('uk-hidden');
        $(elem).removeClass('uk-hidden');
        $(".uk-icon-caret-down")
            .removeClass("uk-icon-caret-down")
            .addClass("uk-icon-caret-right");
        $(this).children().removeClass("uk-icon-caret-right");
        $(this).children().addClass("uk-icon-caret-down");
    });

});
