using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Old_Example.Controllers
{
    public class PollingController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Load()
        {
            return Content(DateTime.Now.ToString());
        }
    }
}
