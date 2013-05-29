using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNet.SignalR.Hubs;
using System.Threading.Tasks;

namespace FakeFacebookChat.Models
{
    [HubName("chat")]
    public class ChatHub : Hub
    {
        public static Dictionary<string, UserViewModel> Users = new Dictionary<string, UserViewModel>();

        /// <summary>
        /// 中斷連線
        /// </summary>
        public override Task OnDisconnected()
        {
            if (Users.ContainsKey(Context.ConnectionId))
            {
                //跟其他人說我離線了，請把我移除
                Clients.Others.removeUser(Context.ConnectionId);
                //把自己於靜態物件中刪除
                Users.Remove(Context.ConnectionId);
            }

            return base.OnDisconnected();
        }

        /// <summary>
        /// 初始化User
        /// </summary>
        public void InitUser(string name, string personalStatus, string image)
        {
            if (!Users.ContainsKey(Context.ConnectionId))
            {
                //把自己加入靜態物件中
                Users.Add(Context.ConnectionId, new UserViewModel() { Id = Context.ConnectionId, Name = name, PersonalStatus = personalStatus, Image = image });
            }

            //跟自己說註冊完成 (呼叫頁面上的js function : registerDone )
            Clients.Caller.registerDone(Users.Select(p => p.Value));
            //跟其他人說請把我加入頁面的清單中 (呼叫頁面上的js function : addUser )
            Clients.Others.addUser(Users[Context.ConnectionId]);
        }

        public void SendMessage(string clientId, string message)
        {
            if (Users.ContainsKey(clientId))
            {
                //跟特定的人(這邊是要傳訊的對象)說把Message加到頁面上 (呼叫頁面上的js function : addMessage )
                Clients.Client(clientId).addMessage(Context.ConnectionId, message);
            }
        }
    }
}