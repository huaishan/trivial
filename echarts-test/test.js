
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

function removeY(chart, vals) {

    var data = JSON.parse($('#main_data').val());
    for (var i = 0; i < vals.length; i++) {
        var val = vals[i];
        var index = jQuery.inArray(val, data.y_axis_data);

        data.y_axis_data.splice(index, 1);
        data.series_data.forEach(function(element) {
            element.data.splice(index, 1)
        }, this);
    }
    insertData(chart, buildOption(data));
}

// 初始化图表大小
$('#main').css({'width': '1000px', 'height': '700px'});

var chart = echarts.init(document.getElementById('main'));
showBaseFrame(chart);
loadData(chart);


// $(function () {
//     var reg = {
//         // 以运算符结束
//         endsWithOperator: /^.*[\+\-\*\/]$/,
//         // 以. 结束
//         endsWithDot: /^.*?\.$/,
//         bracket: /[\(\)]$/,
//         // 输入为空
//         empty: /^\s*$/,
//         // 以数值结束
//         endsWithNumeric: /[^\d]{0,1}(\d+[\.]{0,1}\d*)$/
//     };
 
//     var INPUT_ID = 'input';
//     var OUTPUT_ID = 'output';
 
//     var $in = $('#' + INPUT_ID);
//     var $out = $('#' + OUTPUT_ID);
//     var $memo = $('#memory');
 
//     // 当前输入是否计算过的标识，当为true时为计息过
//     var calculated = false;
//     // 处理键盘输入
//     function keyboardInput(e) {
//         // 当按下键盘上的键时，所有的按钮触发blur事件
//         $('buttonPanel span').trigger('blur');
//         /*
//          8       退格
//          48-57,96-105   数字
//          Shift+189,107   +
//          187,109         -
//          Shift+56,106    *
//          111,191         /
//          110,190        .
//          187            =
//          13             回车
//          Shift+48       )
//          Shift+57       (
//          46             Del
//         */
//         var code = e.keyCode || e.which;
 
//         if (!e.shiftKey && code >= 48 && code <= 57) {          // 输入数字
//             input(code - 48);
//         } else if (code >= 96 && code <= 105) {                 // 输入数字 - 小键盘
//             input(code - 96);
//         } else if ((e.shiftKey && code == 187) || code == 107) {// 输入 +
//             input('+');
//         } else if (code == 189 || code == 109) {                // 输入 -
//             input('-');
//         } else if ((e.shiftKey && code == 56) || code == 106) { //输入 *
//             input('*');
//         } else if (code == 111 || code == 191) {                // 输入 /
//             input('/');
//         } else if (code == 110 || code == 190) {                //输入 .
//             input('.');
//         } else if (e.shiftKey && code == 48) {                  // 输入 )
//             input(')');
//         } else if (e.shiftKey && code == 57) {                  // 输入 (
//             input('(');
//         } else if (code == 8) {                                 // 退格，删除最后一个字符
//             deleteTheLastKeyOfInput();
//             return false;
//         } else if (code == 46) {                                // 按Del，清空输入输出
//             clearData();
//             return false;
//         } else if (code == -2) {                                // 自定义键值，存储计算结果值
//             $memo.val($out.attr('data-value') || 0);
//         } else if (code == -3) {
//             // 输入以操作符结尾时或为空白时才读取
//             if (reg.empty.test($in.text()) || reg.endsWithOperator.test($in.text())) {
//                 var _temp_ = $memo.val();
//                 if (_temp_) {
//                     appendInput(parseFloat(_temp_));
//                 }
//             }
//         } else if (code == 13 || (!e.shiftKey && code == 187)) {// 输入 =， 执行计算
//             calculate();
//         }
//     }
 
//     // 清除数据
//     function clearInput() {
//         $in.html('');
//         calculated = false;
//     }
//     function clearOutput() {
//         $out.html('').attr('data-value', 0);
//     }
//     function clearData() {
//         clearInput();
//         clearOutput();
//     }
 
//     // 格式化数值（添加千位分隔符）
//     function formatNumeric(val) {
//         if (!$.isNumeric(val)) return 0;
//         val = val.toString();
//         if (val.indexOf('.') != -1) {
//             // 处理小数
//             var _temp_arr_ = val.toString().split('.');
//             return formatNumeric(_temp_arr_[0]) + '.' + _temp_arr_[1];
//         } else {
//             var _len_ = val.length;
 
//             if (_len_ <= 3) {
//                 return val;
//             }
//             var _ex_ = _len_ % 3;
//             var _temp_ = val.substring(0, _ex_);
//             for (var i = 0; i < _len_ - _ex_; i++) {
//                 if (i % 3 == 0) {
//                     if (!reg.empty.test(_temp_)) {
//                         _temp_ += ',';
//                     }
//                 }
//                 _temp_ += val.charAt(_ex_ + i);
//             }
//             return _temp_;
//         }
//     }
 
//     // 执行计算
//     function calculate() {
//         var currentVal = $in.text();
//         // 没有输入时不计算
//         if (reg.empty.test(currentVal)) return;
//         // 当以运算符结束时，移除最后的运算符
//         if (reg.endsWithOperator.test(currentVal)) {
//             $('.last', $in).remove();
//         }
//         try {
//             var val = eval($in.text());
//             val = val || 0;
//             val = parseFloat(val);
//             $out.html('<span style="float:left;">=</span>' + formatNumeric(val)).attr('data-value', val);
//             calculated = true;
//         } catch (e) {
//             console.log(e.message);
//             $out.html('Invalid Input');
//         }
//     }
 
//     // 删除输入的最后一个字符
//     function deleteTheLastKeyOfInput() {
//         $('.last', $in).remove();
//         $('span', $in).last().addClass('last');
//     }
 
//     // 获取最后一个操作数
//     function getLastNumber() {
//         var currentVal = $in.text();
//         // 没有输入时
//         if (reg.empty.test(currentVal)) return;
 
//         var _temp_arr_ = reg.endsWithNumeric.exec(currentVal.toString());
 
//         return !!_temp_arr_ && _temp_arr_.length ? _temp_arr_[1] : 0;
//     }
 
//     // 追加字符
//     function appendInput(val) {
//         $('.last', $in).removeClass('last');
//         $in.append('<span class="last">' + val + '</span>');
//     }
 
//     // 输入
//     function input(val) {
//         // 重置计算状态
//         if (calculated) {
//             var oldValue = $out.attr('data-value');
//             clearData();
//             // 当输入运算符时，使用上次的计算结果
//             if (reg.endsWithOperator.test(val)) {
//                 appendInput(oldValue);
//             }
//             delete oldValue;
//         }
 
//         var currentVal = $in.text();
//         if (reg.empty.test(currentVal)) {
//             // 还没有输入时，不允许输入 ., ), *, /, %
//             if ('.)*/'.indexOf(val) != -1) {
//                 return;
//             }
//             appendInput(val);
//         } else if (currentVal == 0) {
//             // 当前只有1个0时，不允许再输入0
//             if (val == 0)
//                 return;
//             else {
//                 // 移除现有的0
//                 deleteTheLastKeyOfInput();
//             }
//             appendInput(val);
//         }
//         else if (reg.endsWithOperator.test(currentVal) && !$.isNumeric(val) && val != '(') {
//             // 最后一个字符是运算符时，直接替换原有的运算符
//             $('.last', $in).text(val);
//         } else if (reg.endsWithDot.test(currentVal)) {
//             // 最后一个字符是 .
//             if (reg.endsWithOperator.test(val) || reg.bracket.test(val)) {
//                 // 当前输入是运算符或者括号，则将.替换成运算符
//                 $('.last', $in).text(val);
//             } else if (reg.endsWithDot.test(val)) {
//                 return;
//             } else {
//                 appendInput(val);
//             }
//         }
//         else {
//             appendInput(val);
//         }
//     }
 
//     // 全文档输入
//     $(document).on('keydown', keyboardInput).on('selectstart contextmenu', function (e) {
//         var _id = e.target.id;
 
//         if (_id != INPUT_ID && _id != OUTPUT_ID) {
//             e.preventDefault();
//             return false;
//         }
//     });
 
 
//     // 按钮获得焦点的效果
//     $('#buttonPanel span').on('mouseover', function () {
//         $('#buttonPanel span').not(this).trigger('blur');
//     }).on('mouseout', function () {
//         $('#buttonPanel span').trigger('blur');
//     }).each(function (index, item) {
//         // 给按钮添加tabindex属性，以使tab可用
//         $(this).attr('tabindex', index + 10);
//         $(this).on('click keypress', function (e) {
//             if ($(this).attr('data-type') == INPUT_ID) { // 输入
//                 input($(this).text());
//             } else { // 控制
//                 keyboardInput.call(this, {
//                     keyCode: $(this).attr('data-keycode')
//                 });
//             }
//             e.preventDefault();
//             return false;
//         });
//     });
 
//     $in.on('focus', function () {
//         $(this).attr('contenteditable', true);
//     }).on('blur', function () {
//         $(this).attr('contenteditable', false);
//     }).on('keydown', function (e) {
//         var code = e.keyCode || e.which;
//         if (code == 9) {
//             return true;
//         } else if (code == 27) {// 按ESC失去焦点
//             $(this).trigger('blur');
//         } else {
//             keyboardInput(e);
//         }
 
//         e.preventDefault();
//         return false;
//     });
 
//     // 使输出在获得焦点时可以被鼠标拖选
//     $out.on('focus', function () {
//         $(this).attr('contenteditable', true).text($(this).attr('data-value'));
//     }).on('blur', function () {
//         $(this).attr('contenteditable', false).text(formatNumeric($(this).attr('data-value')));
//     }).on('keydown', function (e) {
//         // 响应TAB，ESC键
//         var code = e.keyCode || e.which;
//         if (code == 9) {
//             return true;
//         } else if (code == 27) {// 按ESC失去焦点
//             $(this).trigger('blur');
//         } else if (code == 13) {
//             keyboardInput(e);
//         }
 
//         e.preventDefault();
//         return false;
//     });
 
//     // 不允许输出粘贴
//     $out.on('paste', function (e) {
//         e.preventDefault();
//         return false;
//     });
 
//     // 允许粘贴输入
//     $in.get(0).onpaste = function (e) {
//         var _data = 0;
//         if (e && e.clipboardData && e.clipboardData.getData) {// Webkit - get data from clipboard
//             _data = e.clipboardData.getData('text');
 
//             if (_data) {
//                 clearData();
//                 _data = _data.toString();
//                 for (var i = 0; i < _data.length; i++) {
//                     var _c = _data[i];
//                     if ($.isNumeric(_c)) {
//                         appendInput(_data[i]);
//                     }
//                 }
//             }
//         }
//         if (e.preventDefault) {
//             e.stopPropagation();
//             e.preventDefault();
//         }
//         return false;
//     };
// });
$(function () {
    var $input = $('.rcABP');
    // 因为span#rcTB的css设置了float: right;
    var firstInput = function() {return $('span#rcTB:last')};
    var lastInput = function() {return $('span#rcTB:first')};

    function markParam(param) {
        return '<span class="nowrap" id="rcTB">'+param+'</span>'
    }

    function markInput(param) {
        if (lastInput().text() == 0) {
            $input.html(markParam(param));
        } else {
            $input.prepend(markParam(param));
        }
    }
    // 删除输入框中最后一个字符
    function deleteTheLastKeyOfInput() {
        if ($input.children().length == 1) {
            $input.html(markParam(0));
        } else {
            lastInput().remove();
        }
    }
    // 清空输入框
    function clearInput() {
        $input.html(markParam(0));
    }

    function replaceAll(str, finds, replaces) {
        for (var i = 0; i < finds.length; i++) {
            str = str.replace(finds[i], replaces[i])
        }
        return str
    }

    function paramsToString() {
        var cs = $input.children();
        var ps = '';
        for (var i = cs.length-1; i >=0; i--) {
            ps += $(cs[i]).text();
        }
        ps = replaceAll(ps, [$('#rcMul').val(), $('#rcDiv').val(), $('#rcSub').val(), $('rcAdd').val()], ['*', '/', '-', '+']);
        return ps
    }

    function calculate() {
        try {
            // var currentInput = $input.text();
            // currentInput = replaceAll(currentInput, [$('#rcMul').val(), $('#rcDiv').val(), $('#rcSub').val(), $('rcAdd').val()], ['*', '/', '-', '+']);
            var answer = eval(paramsToString());
            // test
            $input.html(markParam(answer));
        } catch (error) {
            layer.alert('错误的表达式', {icon: 5});
        }
    }

    $(document).ready(function() {
        $('.rcOpdB, .rcOptB').click(function() {
            markInput($(this).val());
        });

        // 后退键事件
        $('#rcBB').unbind().click(function() {
            deleteTheLastKeyOfInput();
        });
        
        // C键事件
        $('#rcClD').unbind().click(function() {
            clearInput();
        });

        $('#rcEquals').unbind().click(function() {
            calculate();
        });
    });
});
