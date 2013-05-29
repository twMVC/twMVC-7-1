using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNet.SignalR;

namespace PersistentConnectionExample.Models
{
    public class NewsConnection : PersistentConnection
    {
        public static List<NewsViewModel> NewsModel = new List<NewsViewModel>();

        protected override System.Threading.Tasks.Task OnReceivedAsync(IRequest request, string connectionId, string data)
        {
            //if (String.IsNullOrWhiteSpace(data))
            //{
                //只傳給某個connectionId
            //    return Connection.Send(connectionId, NewsModel);
            //}

            //廣播給所有人
            //return Connection.Broadcast(NewsModel);

            return base.OnReceivedAsync(request, connectionId, "");
        }
    }
}