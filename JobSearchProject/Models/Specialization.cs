using System.ComponentModel.DataAnnotations.Schema;

namespace JobSearchProject.Models
{
    public partial class Specialization
    {
        public int Id { get; set; }

        public SpecializationType SpecializationType { get; set; }
        public EmploymentType EmploymentType { get; set; }
        public PaymentType PaymentType { get; set; }
        public decimal? PaymentPrice { get; set; }
        public EducationType EducationType { get; set; }
        public decimal? Experience { get; set; }
        public bool? Recommendation { get; set; }

        public int? DriverVacancyId { get; set; }

        [ForeignKey("DriverVacancyId")]
        public virtual DriverVacancy DriverVacancy { get; set; }

        public int? BabysitterVacancyId { get; set; }

        [ForeignKey("BabysitterVacancyId")]
        public virtual BabysitterVacancy BabysitterVacancy { get; set; }
    }
}
