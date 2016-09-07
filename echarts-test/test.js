
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
            data: []
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
        url: '/exp.json',
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
            } else {
                layer.msg('获取数据失败，请刷新重试。', {time: 2000, icon: 5});
            }
        },
        error: function () {
            chart.hideLoading();
            layer.msg('服务器异常，请刷新重试。', {time: 1000, icon: 5});
        }
    })
}

function insertData(chart, data) {
    chart.clear();
    chart.hideLoading();
    chart.setOption(data);
}

function setData2Input(data, input_id) {
    $('#'+input_id).val(JSON.stringify(data));
}

function removeY(chart, index, input_id) {
    var data = JSON.parse($('#'+input_id).val());
    data.y_axis_data.remove(index);
    data.series_data.forEach(function(element) {
        this.data = this.data.remove(index)
    }, this);
    insertData(chart, buildOption(data));
}

// 初始化图表大小
$('#main').css({'width': '1000px', 'height': '700px'});

var chart = echarts.init(document.getElementById('main'));
showBaseFrame(chart);
loadData(chart);
