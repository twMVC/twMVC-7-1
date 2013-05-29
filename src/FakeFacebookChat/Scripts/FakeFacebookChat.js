//找出 Array 內與條件相符的第一個物件
//此 function 類似於 C# Lambda 的 array.FirstOrDefault(p=>p.property==obj);
function FirstOrNull(array, obj, property) {
	var i = array.length;
	while (i--) {
		if (array[i][property] === obj) {
			return array[i];
		}
	}
	return null;
}

//將對話視窗的捲軸捲至最下面
function MoveChatBoxScrollToBottom() {
    var d = document.getElementById('chatblock');
    d.scrollTop = d.scrollHeight;
}

//取得時間 23:12
function GetTime(date) {
    var d = date || new Date();
    return CheckTime(d.getHours()) + ":" + CheckTime(d.getMinutes());
}

//取得完整時間 23:12:25
function GetFullTime(date) {
    var d = date || new Date();
    return CheckTime(d.getHours()) + ":" + CheckTime(d.getMinutes()) + ":" + CheckTime(d.getSeconds());
}

//小時補0
function CheckTime(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}

$(function () {
	//在有 data-tab 這個屬性的 li 上綁上 click 事件
	$('li[data-tab]').click(function () {
		var $current = $(this);

		//取得目標元素的id
		var targetId = $current.attr('data-tab');

		//抓到目標元素
		var targetDiv = $('#' + targetId);

		//如果目標元素原本就可見，就直接返回(避免有奇怪的效果)
		if (targetDiv.is(':visible')) return;

		//將目標元素的父元素(ul)下的所有 li 移除 current 這個 class
		$('li', $current.parent()).removeClass('current');

		//將目前觸發事件的這個 li 加上 current
		$current.addClass('current');

		//將有 namelist 這個 class 的元素隱藏
		$('.namelist').hide("slow");

		//將目標元素顯示
		targetDiv.show("slow");
	});
});
