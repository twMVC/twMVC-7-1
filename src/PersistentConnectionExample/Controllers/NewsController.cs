using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Microsoft.AspNet.SignalR;
using PersistentConnectionExample.Models;

namespace PersistentConnectionExample.Controllers
{
    public class NewsController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult PostNews()
        {
            return View();
        }

        [HttpPost]
        public ActionResult PostNews(string title, string content)
        {
            var context = GlobalHost.ConnectionManager.GetConnectionContext<NewsConnection>();
            context.Connection.Broadcast(new List<NewsViewModel>() { new NewsViewModel() { Title = title, Content = content } });

            return View();
        }
    }
}
