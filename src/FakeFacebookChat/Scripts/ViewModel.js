//整個頁面的 Model
function PageModel(user) {
	var self = this;
	//放置所有的使用者的集合
	self.allList = ko.observableArray([]);
	//放置目前正在聊天的使用者的集合
	self.chatList = ko.observableArray([]);
	//放置登入者，也就是自己的Model
	self.currentUser = user;
	//目前正在聊天的User
	self.currentChatUser = ko.observable(null);
    //所有未讀訊息數量
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

//使用者的 Model
function userModel(data) {
	var self = this;
	data = data || {};
	//ID
	self.Id = data.Id || 0;
	//姓名
	self.name = ko.observable(data.name || '');
	//圖片
	self.image = ko.observable(data.image || 'none.png');
	//個人狀態
	self.personalStatus = ko.observable(data.personalStatus || 'none');
	//點擊人員列表
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
    //使用者訊息
	self.messageBags = ko.observableArray(data.messageBags || []);
    //未讀訊息數量
	self.unReadCount = ko.computed(function () {
	    var count = 0;
	    for (var i in self.messageBags()) {
	        if (!self.messageBags()[i].isRead()) count += 1;
	    }
	    return count;
	});
}

//使用者訊息 Model
function messageBag(data) {
	var self = this;
	data = data || {};
	//訊息是否已讀
	self.isRead = ko.observable(data.isRead || false);
	//訊息內容
	self.message = ko.observable(data.message || '');
	//發送時間
	self.time = ko.observable(data.time || '');
	//是否為自己傳的訊息
	self.isSelf = data.isSelf || false;
	//取得發送訊息的User
	self.getUser = function (user) {
		if (self.isSelf)
			return viewModel.currentUser;
		return user;
	};
}