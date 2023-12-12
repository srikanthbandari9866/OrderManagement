using OrderManagement1.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace OrderManagement1.Models
{
    public class User
    {
        [Key]
        public int UserId { get; set; }
        [Required]
        [StringLength(30)]
        public string UserName { get; set; }
        [Required]
        [StringLength(15)]
        public string PhoneNumber { get; set; }
        [Required]
        [StringLength(30)]
        public string Email { get; set; }
        [Required]
        public string Password { get; set; }
        public double Balance { get; set; }
        public ICollection<Cart> Cart { get; set; }
        public ICollection<Order> Order { get; set; }
        public ICollection<OrderItem> OrderItem { get; set; }
        public ICollection<TempItems> TempItems { get; set; }
      
    }
}
