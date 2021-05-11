using Microsoft.EntityFrameworkCore;
using Organizer_coursework.Models.Users;

namespace Organizer_coursework.DataContext
{
    public class UsersContext : DbContext
    {
        public DbSet<DbUser> Users { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer("Server=(local)\\sqlexpress;Database=OrganizerUsersDB;Trusted_Connection=True;MultipleActiveResultSets=True;");
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<DbUser>()
                .HasIndex(p => p.Email)
                .IsUnique(true);
        }
    }
}
