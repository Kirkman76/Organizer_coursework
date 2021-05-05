using Microsoft.EntityFrameworkCore;
using Organizer_coursework.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Organizer_coursework.DataContext
{
    public class DatabaseContext: DbContext
    {
        public DbSet<DbList> Lists { get; set; }
        public DbSet<DbItem> Items { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer("Server=(local)\\sqlexpress;Database=OrganizerDB;Trusted_Connection=True;MultipleActiveResultSets=True;");
        }
    }
}
