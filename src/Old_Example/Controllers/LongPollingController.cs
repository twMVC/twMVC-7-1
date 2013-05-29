using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Threading;

namespace Old_Example.Controllers
{
    public class LongPollingController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Load()
        {
            Random r = new Random();
            int t = r.Next(3, 8);
            int start = 0;
            while (start < t)
            {
                Thread.Sleep(1000);
                start++;
            }

            return Content(DateTime.Now.ToString());
        }
    }
}
