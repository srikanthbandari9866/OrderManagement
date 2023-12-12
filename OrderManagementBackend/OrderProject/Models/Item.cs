using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace OrderManagement1.Models
{
    public class Item
    {
        [Key]
        public int ItemId { get; set; }
        [ForeignKey("CategoryId")]
        public int? CategoryId { get; set; }
        public virtual Category Category { get; set; }
        [StringLength(50)]
        public string ItemName { get; set; }
        public int Quantity { get; set; }
        public double Price { get; set; }
        [StringLength(500)]
        public string ImagePath { get; set; }
        public ICollection<Cart> Cart { get; set; }
        public ICollection<OrderItem> OrderItem { get; set; }
        public ICollection<TempItems> TempItems { get; set; }
    }
}
