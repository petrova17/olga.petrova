using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace JobSearchProject.Models
{
    public partial class Specialization
    {
        public int Id { get; set; }

        [Required]
        [Column(TypeName = "varchar(50)")]
        public string Name { get; set; }
        public EmploymentType EmploymentType { get; set; }
        public PaymentType PaymentType { get; set; }
        public decimal? PaymentPrice { get; set; }
        public decimal? Experience { get; set; }
        public bool? Recommendation { get; set; }
        public int EducationId { get; set; }
        public virtual Education Education { get; set; }
        public virtual DriverVacancy DriverVacancy { get; set; }
    }
}
