using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FakeFacebookChat.Models
{
    public class UserViewModel
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string PersonalStatus { get; set; }
        public string Image { get; set; }
    }
}