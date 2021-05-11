using Microsoft.EntityFrameworkCore;
using Organizer_coursework.Models;

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
