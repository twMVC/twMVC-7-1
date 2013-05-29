
//1. �n�J������ҩI�s��Method(�N�H���[�J�øj�wUI)
function RegisterDone(users) {
    //�q�^�Ǫ� User List ���A���o�ۤv����T
    var currentUser = FirstOrNull(users, chat.connection.id, "Id");
    if (!currentUser) { alert('�o�Ϳ��~!'); return; }

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
            //�N User ��J�Ҧ��H�����ݩʤ�
            viewModel.allList.push(new userModel({ Id: current.Id, name: current.Name, personalStatus: current.PersonalStatus, image: current.Image }));
        }
    }

    //�j�w�ܭ����W
    ko.applyBindings(viewModel);
}

//���ϥΪ̥[�J
function AddUser(user) {
    //���H���[�J�ɡA�NUser��J�Ҧ��H�����ݩʤ��Aknockout�|�۰ʸj�wUI
    viewModel.allList.push(new userModel({ Id: user.Id, name: user.Name, personalStatus: user.PersonalStatus, image: user.Image }));
}

//���ϥΪ����}
function RemoveUser(removeUserId) {
    //�Q�����}�̪�ID�A�b�Ҧ��H�������X���}�̪���T
    var removeUser = FirstOrNull(viewModel.allList(), removeUserId, "Id");
    if (!removeUser) { alert('�o�Ϳ��~!'); return; }

    //�N���}�̲����Ҧ��H���W�椤
    viewModel.allList.remove(removeUser);
    //�N���}�̲�����ܤH���W�椤
    viewModel.chatList.remove(removeUser);
}

//������T��
function AddMessage(fromUserId, message) {
    //�Q�ζǰe�T���̪�ID�A�b�Ҧ��H�������X��誺��T
    var fromUser = FirstOrNull(viewModel.allList(), fromUserId, "Id");
    var isRead = false;

    if (!fromUser) { alert('�o�Ϳ��~!'); return; }

    //�d�ݥثe�O�_�����b��Ѫ���H
    var currentUser = viewModel.currentChatUser();
    
    //�Y�S���h�N�Ĥ@�ӶǰT�L�Ӫ��H��J���b��Ѫ���H(�o�ˤ~�|�i�}��ܵ���)
    if (!currentUser) {
        viewModel.currentChatUser(fromUser);
        isRead = true;
    } else if (currentUser.Id == fromUserId) { //�Y����ѹ�ܥB��n�O�{�b�ǰT�L�Ӫ��H�A�h�T�������аO�wŪ
        isRead = true;
    }

    //�N�T����J��H����ܮe����
    fromUser.messageBags.push(new messageBag({ isRead: isRead, message: message, time: GetFullTime(), isSelf: false }));

    //�d�ݹ�H�O�_�w�b��ѦW�椤�A�Y�S���h�[�J��ѦW�檺�ݩʤ�
    var chatUser = FirstOrNull(viewModel.chatList(), fromUserId, "Id");
    if (!chatUser) {
        viewModel.chatList.push(fromUser);
    }
    //�N��ܵ��������b���̤ܳU��
    MoveChatBoxScrollToBottom();
}

//���U���UEnter��(�o�e�T��)�ɪ�function
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