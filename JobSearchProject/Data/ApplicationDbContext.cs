using JobSearchProject.Models;
using IdentityServer4.EntityFramework.Options;
using Microsoft.AspNetCore.ApiAuthorization.IdentityServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

namespace JobSearchProject.Data
{
    public class ApplicationDbContext : ApiAuthorizationDbContext<ApplicationUser>
    {
        public virtual DbSet<Education> Education { get; set; }
        public virtual DbSet<Location> Location { get; set; }
        public virtual DbSet<Specialization> Specialization { get; set; }
        public virtual DbSet<DriverVacancy> DriverVacancy { get; set; }
        public virtual DbSet<Vacancy> Vacancy { get; set; }
        public virtual DbSet<BabysitterVacancy> BabysitterVacancy { get; set; }

        public ApplicationDbContext(
            DbContextOptions options,
            IOptions<OperationalStoreOptions> operationalStoreOptions) : base(options, operationalStoreOptions)
        {
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<BabysitterVacancy>()
                .HasOne(x => x.Specialization)
                .WithOne(x => x.BabysitterVacancy)
                .OnDelete(DeleteBehavior.NoAction);

            builder.Entity<DriverVacancy>()
                .HasOne(x => x.Specialization)
                .WithOne(x => x.DriverVacancy)
                .OnDelete(DeleteBehavior.NoAction);

            base.OnModelCreating(builder);
        }
    }
}
