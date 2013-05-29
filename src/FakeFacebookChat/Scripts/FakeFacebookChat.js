//��X Array ���P����۲Ū��Ĥ@�Ӫ���
//�� function ������ C# Lambda �� array.FirstOrDefault(p=>p.property==obj);
function FirstOrNull(array, obj, property) {
	var i = array.length;
	while (i--) {
		if (array[i][property] === obj) {
			return array[i];
		}
	}
	return null;
}

//�N��ܵ��������b���̤ܳU��
function MoveChatBoxScrollToBottom() {
    var d = document.getElementById('chatblock');
    d.scrollTop = d.scrollHeight;
}

//���o�ɶ� 23:12
function GetTime(date) {
    var d = date || new Date();
    return CheckTime(d.getHours()) + ":" + CheckTime(d.getMinutes());
}

//���o����ɶ� 23:12:25
function GetFullTime(date) {
    var d = date || new Date();
    return CheckTime(d.getHours()) + ":" + CheckTime(d.getMinutes()) + ":" + CheckTime(d.getSeconds());
}

//�p�ɸ�0
function CheckTime(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}

$(function () {
	//�b�� data-tab �o���ݩʪ� li �W�j�W click �ƥ�
	$('li[data-tab]').click(function () {
		var $current = $(this);

		//���o�ؼФ�����id
		var targetId = $current.attr('data-tab');

		//���ؼФ���
		var targetDiv = $('#' + targetId);

		//�p�G�ؼФ����쥻�N�i���A�N������^(�קK���_�Ǫ��ĪG)
		if (targetDiv.is(':visible')) return;

		//�N�ؼФ�����������(ul)�U���Ҧ� li ���� current �o�� class
		$('li', $current.parent()).removeClass('current');

		//�N�ثeĲ�o�ƥ󪺳o�� li �[�W current
		$current.addClass('current');

		//�N�� namelist �o�� class ����������
		$('.namelist').hide("slow");

		//�N�ؼФ������
		targetDiv.show("slow");
	});
});
