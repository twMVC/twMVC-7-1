using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Threading;

namespace Old_Example.Controllers
{
    public class CometController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        //结束标志，这是随机生成的
        static string Boundary = "ABCDEFGHIJKLMNOPQRST";

        public ActionResult Multipart()
        {
            Response.ContentType = "multipart/x-mixed-replace;boundary=\"" + Boundary + "\"";
            //Response.Headers.Add("Connection", "keep-alive");
            Response.Output.Write("--" + Boundary);
            Response.Flush();
            //每隔5秒种向客户端发送一次数据
            while (true)
            {
                //发送给客户端的数据的MIME类型，如果是JSON，就用application/json
                //注意这里一定要用WriteLine()
                Response.Output.WriteLine("Content-Type: plain/text");
                //这句生成空行的代码不能少
                Response.Output.WriteLine();
                Response.Output.WriteLine(DateTime.Now.ToString("HH:mm:ss.FFF"));
                //发送结束标志，客户端就知道完成了一次发送
                Response.Output.WriteLine("--" + Boundary);
                Response.Flush();
                System.Threading.Thread.Sleep(5000);
            }
        }
    }
}
