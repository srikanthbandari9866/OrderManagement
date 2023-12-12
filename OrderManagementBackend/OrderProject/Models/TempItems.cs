using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace OrderManagement1.Models
{
    public class TempItems
    {
        [Key]
        public int TempItemsId { get; set; }
        [ForeignKey("ItemId")]
        public int ItemId { get; set; }
        public virtual Item Item { get; set; }
        [ForeignKey("UserId")]
        public int? UserId { get; set; }
        public virtual User User { get; set; }
        [StringLength(50)]
        public string ItemName { get; set; }
        public int Quantity { get; set; }
        public double Price { get; set; }
        [StringLength(100)]
        public string ImagePath { get; set; }
    }
}
