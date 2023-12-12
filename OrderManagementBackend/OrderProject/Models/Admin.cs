using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace OrderManagement1.Models
{
    public class Admin
    {
        [Key]
        public int AdminId { get; set; }
        public string AdminUname { get; set; }
        public string AdminPassword { get; set; }
        public string AdminEmail { get; set; }
    }
}
