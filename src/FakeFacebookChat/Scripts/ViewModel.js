//��ӭ����� Model
function PageModel(user) {
	var self = this;
	//��m�Ҧ����ϥΪ̪����X
	self.allList = ko.observableArray([]);
	//��m�ثe���b��Ѫ��ϥΪ̪����X
	self.chatList = ko.observableArray([]);
	//��m�n�J�̡A�]�N�O�ۤv��Model
	self.currentUser = user;
	//�ثe���b��Ѫ�User
	self.currentChatUser = ko.observable(null);
    //�Ҧ���Ū�T���ƶq
	self.totalUnRead = ko.computed(function () {
	    var count = 0;
	    for (var i in self.chatList()) {
	        var chat = self.chatList()[i];
	        for (var j in chat.messageBags()) {
	            if (!chat.messageBags()[j].isRead()) count += 1;
	        }
	    }
	    return count;
	});
}

//�ϥΪ̪� Model
function userModel(data) {
	var self = this;
	data = data || {};
	//ID
	self.Id = data.Id || 0;
	//�m�W
	self.name = ko.observable(data.name || '');
	//�Ϥ�
	self.image = ko.observable(data.image || 'none.png');
	//�ӤH���A
	self.personalStatus = ko.observable(data.personalStatus || 'none');
	//�I���H���C��
	self.userItemClick = function () {
	    viewModel.currentChatUser(self);
	    var searchUser = FirstOrNull(viewModel.chatList(), self.Id, "Id");
	    if (!searchUser) {
	        viewModel.chatList.push(this);
	    }
	    for (var i in self.messageBags()) {
	        self.messageBags()[i].isRead(true);
	    }
	};
    //�ϥΪ̰T��
	self.messageBags = ko.observableArray(data.messageBags || []);
    //��Ū�T���ƶq
	self.unReadCount = ko.computed(function () {
	    var count = 0;
	    for (var i in self.messageBags()) {
	        if (!self.messageBags()[i].isRead()) count += 1;
	    }
	    return count;
	});
}

//�ϥΪ̰T�� Model
function messageBag(data) {
	var self = this;
	data = data || {};
	//�T���O�_�wŪ
	self.isRead = ko.observable(data.isRead || false);
	//�T�����e
	self.message = ko.observable(data.message || '');
	//�o�e�ɶ�
	self.time = ko.observable(data.time || '');
	//�O�_���ۤv�Ǫ��T��
	self.isSelf = data.isSelf || false;
	//���o�o�e�T����User
	self.getUser = function (user) {
		if (self.isSelf)
			return viewModel.currentUser;
		return user;
	};
}