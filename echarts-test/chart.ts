/// <reference path="typings/jquery/jquery.d.ts" />


class Chart {
    chart: any;
    data_url: string;
    chart_selector: string;

    constructor(chart: any, data_url: string, chart_selector: string) {
        this.chart = chart;
        this.data_url = data_url;
        this.chart_selector = chart_selector;
    }

    showYBaseFrame() {
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
        };
        this.chart.setOption(baseOpt);
    }

    showXBaseFrame() {
        var baseOpt = {
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: [0]
            },
            yAxis: {
                type: 'value',
                data: [0]
            }
        };
        this.chart.setOption(baseOpt);
    };

    buildYOption(data: any, x_suffix?: any): any {
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
            toolbox: {
                feature: {
                    saveAsImage: {}
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: {
                type: 'value',
                boundaryGap: [0, 0.01],
                axisLabel: {
                    formatter: '{value}'+(x_suffix ? x_suffix : '')
                }
            },
            yAxis: {
                type: 'category',
                data: data.y_axis_data
            },
            series: data.series_data
        }
    };

    buildXOption(data: any): any {
        return {
            title: {
                text: data.title.text,
                subtext: data.title.subtext
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data: data.legend
            },
            toolbox: {
                feature: {
                    saveAsImage: {}
                }
            },
            grid: {
                left: '6%',
                right: '10%',
                bottom: '12%',
                containLabel: true
            },
            dataZoom: [
                {
                    type: 'slider',
                    show: true,
                    start: 0,
                    end: 100,
                    handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
                    handleSize: '80%',
                    handleStyle: {
                        color: '#fff',
                        shadowBlur: 3,
                        shadowColor: 'rgba(0, 0, 0, 0.6)',
                        shadowOffsetX: 2,
                        shadowOffsetY: 2
                    }
                }
            ],
            xAxis: {
                type: 'category',
                boundaryGap: false,
                axisLabel:{
                    interval: 0,
                    rotate: 40
                },
                data: data.x_axis_data
            },
            yAxis: {
                type: 'value'
            },
            series: data.series_data
        }
    };

    insertData(data: any) {
        this.chart.clear();
        this.chart.setOption(data);
    };

    setData2Input(data: any, input_selector: string) {
        $(input_selector).val(JSON.stringify(data));
    };

    removeY(self: any, vals: any) {
        let data: any = JSON.parse($(self.chart_selector + ' #main_data').val());
        for (let i: number = 0; i < vals.length; i++) {
            let val: any = vals[i];
            let index: any = jQuery.inArray(val, data.y_axis_data);

            data.y_axis_data.splice(index, 1);
            data.series_data.forEach(function(element: any) {
                element.data.splice(index, 1)
            }, this);
        }
        self.insertData(self.buildYOption(data));
    };

    checkboxMarkEvent(chart_selector: string) {
        let self = this;

        $(chart_selector + ' #filter #inlineCheckbox1').click(function () {
            let notChecked = $(chart_selector + ' #filter #inlineCheckbox1').not("input:checked");
            let vals: any[] = [];

            for (var i = 0; i < notChecked.length; i++) {
                vals.push($(notChecked[i]).val());
            }
            self.removeY(self, vals);
        })
    };

    initCheckbox(data_list: any) {
        let cb = '';
        let new_data_list = data_list.concat();
        new_data_list.reverse();
        new_data_list.forEach(function(e: any) {
            cb += '<label class="checkbox-inline">'+
                    '<input type="checkbox" id="inlineCheckbox1" value="' + e +'" checked>' + e +
                '</label>'
        }, this);
        return cb
    };

    loadYData(self: any, params: any, x_suffix?: string) {
        // let self = this;

        $.ajax({
            url: self.data_url,
            data: params ? params : {},
            dataType: 'json',
            type: 'GET',
            beforeSend: function () {
                self.chart.showLoading();
            },
            success: function (data: any) {
                if (data.success) {
                    let temp = self.buildYOption(data, x_suffix);
                    let cb = self.initCheckbox(data.y_axis_data);    // 初始化多选框数据

                    self.insertData(temp);    // 插入图表数据

                    self.setData2Input(data, self.chart_selector+" #main_data");  // 保存当前数据

                    $(self.chart_selector+' #filter').html(cb);  // 渲染多选框
                    self.checkboxMarkEvent(self.chart_selector);   // 给多选框绑定事件

                    self.chart.hideLoading();
                } else {
                    console.log('错误信息：'+data.msg)
                    // layer.msg('错误信息：'+data.msg, {time: 2000, icon: 5});
                }
            },
            error: function () {
                self.chart.hideLoading();
                console.error('服务器异常，请刷新重试。')
                // layer.msg('服务器异常，请刷新重试。', {time: 1000, icon: 5});
            }
        })
    };

    loadXData(self: any, params: any) {
        // let self = this;

        $.ajax({
            url: self.data_url,
            data: params ? params : {},
            dataType: 'json',
            type: 'GET',
            beforeSend: function () {
                self.chart.showLoading();
            },
            success: function (data: any) {
                if (data.success) {
                    var temp = self.buildXOption(data);
                    //var cb = initCheckbox(data.y_axis_data);

                    self.insertData(temp);

                    //setData2Input(data, chart_selecter+" #main_data");

                    //$(chart_selecter+' #filter').html(cb);
                    //checkboxMarkEvent(chart, chart_selecter);

                    self.chart.hideLoading();
                } else {
                    // layer.msg('错误信息：'+data.msg, {time: 2000, icon: 5});
                    console.log('错误信息：'+data.msg)
                }
            },
            error: function () {
                self.chart.hideLoading();
                // layer.msg('服务器异常，请刷新重试。', {time: 1000, icon: 5});
                console.error('服务器异常，请刷新重试。')
            }
        })
    }

    initSearch(loadData: any) {
        let self = this;

        $(self.chart_selector+' #search_btn').click(function () {
            let real_data = $(self.chart_selector+' #from').serializeArray();
            let params: any = {};
            $.each(real_data, function(i, field){
                params[field.name] = field.value;
            });
            loadData(self, params);
        });
    };

}