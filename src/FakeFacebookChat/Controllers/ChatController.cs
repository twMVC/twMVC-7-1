using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace FakeFacebookChat.Controllers
{
    public class ChatController : Controller
    {
        public ActionResult Index()
        {
            ViewBag.UserName = Session["UserName"];
            ViewBag.PersonalStatus = Session["PersonalStatus"];
            ViewBag.Picture = Session["Picture"];
            return View();
        }

        public ActionResult Register()
        {
            return View();
        }

        [HttpPost]
        public ActionResult Register(string username, string personalStatus, string picture)
        {
            Session["UserName"] = username;
            Session["PersonalStatus"] = personalStatus;
            Session["Picture"] = picture;
            return RedirectToAction("Index");
        }
    }
}
