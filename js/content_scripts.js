//再送要求を処理するポートを開く
chrome.extension.onConnect.addListener(function(port){
    port.onMessage.addListener(async function(msg,port) {
        if (msg.reget == "true") {
            //コンテンツを送信
            await port.postMessage({
                //ブラウザキャプション
                Caption: getTextBoxText('shigoto_no'),
                //タイトル
                Title: getSelectedText('syokusyu_id') + "/" + getTextBoxText('main_catch'),
                //職種
                Job_type: getTextBoxText('free_space_1'),
                //職種右側の仕事No
                Job_No: getTextBoxText('shigoto_no'),
                //時給
                Salary_time: (function(){
                    buff1 = getTextBoxText('hourly_pay_from');
                    buff2 = getTextBoxText('hourly_pay_to');
                    if (buff2){
                        buff1 += '円～' + buff2 + '円';
                    }else{
                        buff1 += '円';
                    }
                    return buff1;
                }()),
                //勤務地
                Work_Place: getSelectedText('ken_jis') + getSelectedText('city_cd'),
                //最寄り駅
                Closest_Station: getTextBoxText('moyorieki'),
                //ここがポイント！
                Point: getTextBoxText('main_setumei').replace(/\r?\n/g, '<br>'),
                //おしごと内容
                Work_Detail: getTextBoxText('shigoto_detail').replace(/\r?\n/g, '<br>'),
                //給与
                Salary_Detail: getTextBoxText('free_space_2').replace(/\r?\n/g, '<br>'),
                //勤務地
                Work_place_detail: getSelectedText('ken_jis') + getSelectedText('city_cd'),
                //勤務地 -最寄り駅
                Station: getTextBoxText('moyorieki'),
                //勤務地 -アクセス
                Access: getTextBoxText('free_space_3'),
                //勤務日
                Weekday: getTextBoxText('free_space_4').replace(/\r?\n/g, '<br>'),
                //勤務時間 -1
                WorkTime1: getTextBoxText('kinmujikan1'),
                //勤務時間 -2
                WorkTime2: getTextBoxText('free_space_5'),
                //勤務時間 -3
                WorkTime3: getTextBoxText('free_space_6'),
                //勤務時間 -下段の備考
                WorkTime_Detail: getTextBoxText('free_space_7').replace(/\r?\n/g, '<br>'),
                //休日
                Holiday: getTextBoxText('free_space_14').replace(/\r?\n/g, '<br>'),
                //必要免許
                Required_Qualification: getTextBoxText('free_space_9').replace(/\r?\n/g, '<br>'),
                //歓迎するスキル
                Recommended_Qualification: getTextBoxText('free_space_10').replace(/\r?\n/g, '<br>'),
                //待遇 / 福利厚生
                Welfare_Benefits: getTextBoxText('free_space_11').replace(/\r?\n/g, '<br>'),
                //お仕事アピール
                Presentation: getTextBoxText('free_space_12').replace(/\r?\n/g, '<br>'),
                //
                regetComp: "true"
            });
            return true;
        }
    });
});

function getTime(str1,str2) {
    buff1 = getSelectedText(str1 + '_h') + '時' + getSelectedText(str1 + '_m') + '分';
    buff2 = getSelectedText(str2 + '_h') + '時' + getSelectedText(str2 + '_m') + '分';
    if (buff1 != '---時---分'){
        if (buff2 != '---時---分'){
            return buff1 + " ～ " + buff2;
        }else{
            return buff1;
        }
    }
}

//テキストボックスからの値の取得
function getTextBoxText(txtName) {
    var obj = document.getElementsByName(txtName)[0];
  return obj.value.trim();
};

//セレクトからの値の取得
function getSelectedText(selName) {
    var obj =document.getElementsByName(selName)[0];
  return obj.options[obj.selectedIndex].text.trim();
};
