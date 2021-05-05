using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Organizer_coursework.Models
{
    public sealed class DbItem
    {
        [Key]
        [Required]
        public Guid Id { get; set; }
        [Required]
        [ForeignKey("DbList")]
        public Guid DbListId { get; set; }
        [Required]
        public string Title { get; set; }
        [Required]
        public string Description { get; set; }
        public DateTime? Deadline { get; set; }
        public bool? Checked { get; set; }
    }
}
