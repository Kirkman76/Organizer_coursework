using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Organizer_coursework.Models
{
    public sealed class DbList
    {
        [Key]
        [Required]
        public Guid Id { get; set; }
        [Required]
        public string Owner { get; set; }
        [Required]
        public string Title { get; set; }
        [Required]
        public string Description { get; set; }
        public ICollection<DbItem> Records { get; set; }

    }
}
