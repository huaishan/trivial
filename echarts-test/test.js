
function showBaseFrame(chart) {
    var baseOpt = {
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'value',
            boundaryGap: [0, 0.01]
        },
        yAxis: {
            type: 'category',
            data: [0]
        }
    }
    chart.setOption(baseOpt);
}

function buildOption(data) {
    return {
        title: {
            text: data.title.text,
            subtext: data.title.subtext
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        legend: {
            data: data.legend
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'value',
            boundaryGap: [0, 0.01]
        },
        yAxis: {
            type: 'category',
            data: data.y_axis_data
        },
        series: data.series_data
    }
}

function loadData(chart) {

    $.ajax({
        url: '/exp2.json',
        data: {},
        dataType: 'json',
        type: 'GET',
        beforeSend: function (XHR) {
            chart.showLoading();
        },
        success: function (data) {
            if (data.success) {
                var temp = buildOption(data);
                insertData(chart, temp);
                
                setData2Input(data, "main_data");
                chart.hideLoading();
            } else {
                layer.msg('获取数据失败，请刷新重试。', {time: 2000, icon: 5});
            }
        },
        error: function () {
            layer.msg('服务器异常，请刷新重试。', {time: 1000, icon: 5});
        }
    })
}

function insertData(chart, data) {
    chart.clear();
    chart.setOption(data);
}

function setData2Input(data, input_id) {
    $('#'+input_id).val(JSON.stringify(data));
}

function removeY(chart, index, input_id) {
    var data = JSON.parse($('#'+input_id).val());
    data.y_axis_data.splice(index, 1);
    data.series_data.forEach(function(element) {
        element.data.splice(index, 1)
    }, this);
    insertData(chart, buildOption(data));
    setData2Input(data, "main_data");
}

// 初始化图表大小
$('#main').css({'width': '1000px', 'height': '700px'});

var chart = echarts.init(document.getElementById('main'));
showBaseFrame(chart);
loadData(chart);
