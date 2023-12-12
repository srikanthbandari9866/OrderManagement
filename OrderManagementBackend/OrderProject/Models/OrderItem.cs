using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace OrderManagement1.Models
{
    public class OrderItem
    {
        [Key]
        public int OrderItemId { get; set; }
        [ForeignKey("OrderId")]
        public int? OrderId { get; set; }
        public virtual Order Order { get; set; }
        [ForeignKey("ItemId")]
        public int? ItemId { get; set; }
        public virtual Item Item { get; set; }
        [ForeignKey("UserId")]
        public int? UserId { get; set; }
        public virtual User User { get; set; }
        [StringLength(30)]
        public string ItemName { get; set; }
        public int OrderQuantity { get; set; }
        public double Discount { get; set; }
        public double TotalPrice { get; set; }
        [StringLength(100)]
        public string ShippingAddress { get; set; }
        public DateTime Date { get; set; }
        [StringLength(15)]
        public string OrderStatus { get; set; }
    }
}
