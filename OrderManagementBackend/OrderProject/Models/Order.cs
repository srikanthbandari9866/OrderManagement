using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace OrderManagement1.Models
{
    public class Order
    {
        [Key]
        public int OrderId { get; set; }
        [ForeignKey("UserId")]
        public int? UserId { get; set; }
        public virtual User User { get; set; }
        public string UserName{ get; set; }
        public double OrderTotal { get; set; }
        public double TotalPrice { get; set; }
        public double Discount { get; set; }
        public DateTime Date { get; set; }
        [StringLength(15)]
        public string OrderStatus { get; set; }
        [StringLength(100)]
        public string ShippingAddress { get; set; }

        public ICollection<OrderItem> OrderItem { get; set; }
    }
}
