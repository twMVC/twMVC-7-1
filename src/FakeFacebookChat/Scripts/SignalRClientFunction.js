
//1. 登入完成後所呼叫的Method(將人員加入並綁定UI)
function RegisterDone(users) {
    //從回傳的 User List 中，取得自己的資訊
    var currentUser = FirstOrNull(users, chat.connection.id, "Id");
    if (!currentUser) { alert('發生錯誤!'); return; }

    viewModel = new PageModel(new userModel({ 
                                            Id: currentUser.Id,
                                            name: currentUser.Name,
                                            personalStatus: currentUser.PersonalStatus,
                                            image: currentUser.Image
                                            }
                                            ));

    for (var u in users) {
        var current = users[u];
        if (current.Id != chat.connection.id) {
            //將 User 放入所有人員的屬性中
            viewModel.allList.push(new userModel({ Id: current.Id, name: current.Name, personalStatus: current.PersonalStatus, image: current.Image }));
        }
    }

    //綁定至頁面上
    ko.applyBindings(viewModel);
}

//有使用者加入
function AddUser(user) {
    //有人員加入時，將User放入所有人員的屬性中，knockout會自動綁定UI
    viewModel.allList.push(new userModel({ Id: user.Id, name: user.Name, personalStatus: user.PersonalStatus, image: user.Image }));
}

//有使用者離開
function RemoveUser(removeUserId) {
    //利用離開者的ID，在所有人員中取出離開者的資訊
    var removeUser = FirstOrNull(viewModel.allList(), removeUserId, "Id");
    if (!removeUser) { alert('發生錯誤!'); return; }

    //將離開者移除所有人員名單中
    viewModel.allList.remove(removeUser);
    //將離開者移除對話人員名單中
    viewModel.chatList.remove(removeUser);
}

//接收到訊息
function AddMessage(fromUserId, message) {
    //利用傳送訊息者的ID，在所有人員中取出對方的資訊
    var fromUser = FirstOrNull(viewModel.allList(), fromUserId, "Id");
    var isRead = false;

    if (!fromUser) { alert('發生錯誤!'); return; }

    //查看目前是否有正在聊天的對象
    var currentUser = viewModel.currentChatUser();
    
    //若沒有則將第一個傳訊過來的人放入正在聊天的對象(這樣才會展開對話視窗)
    if (!currentUser) {
        viewModel.currentChatUser(fromUser);
        isRead = true;
    } else if (currentUser.Id == fromUserId) { //若有聊天對話且剛好是現在傳訊過來的人，則訊息直接標記已讀
        isRead = true;
    }

    //將訊息放入對象的對話容器中
    fromUser.messageBags.push(new messageBag({ isRead: isRead, message: message, time: GetFullTime(), isSelf: false }));

    //查看對象是否已在聊天名單中，若沒有則加入聊天名單的屬性中
    var chatUser = FirstOrNull(viewModel.chatList(), fromUserId, "Id");
    if (!chatUser) {
        viewModel.chatList.push(fromUser);
    }
    //將對話視窗的卷軸移至最下面
    MoveChatBoxScrollToBottom();
}

//註冊按下Enter鍵(發送訊息)時的function
function KeyPressEnter(e) {
    if (e.keyCode == 13) {
        var $current = $(this);
        chat.server.sendMessage(viewModel.currentChatUser().Id, $current.val()).done(function (result) {
            viewModel.currentChatUser().messageBags.push(new messageBag({ isRead: true, message: $current.val(), time: GetFullTime(), isSelf: true }));
            $current.val('');
            MoveChatBoxScrollToBottom();
        });

        return false;
    }
}