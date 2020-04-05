using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace JobSearchProject.Models
{
    public partial class DriverVacancy : Vacancy
    {
        public decimal? DrivingExperience { get; set; }               

        public int SpecializationId { get; set; }       

        public virtual Specialization Specialization { get; set; }
    }
}
