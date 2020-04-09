using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace JobSearchProject.Models
{
    public class BabysitterVacancy : Vacancy
    {
        [Required]
        public int ChildNumber { get; set; }

        [Required]
        public LanguageType NativeLanguage { get; set; }

        public string OtherLanguages { get; set; }

        public bool DriverLicense { get; set; }

        public bool OwnChildren { get; set; }

        public bool OfficialEmployment { get; set; }

        [Required]
        public bool MedicineBook { get; set; }

        public bool SpecialChild { get; set; }

        public bool VideoSurveillance { get; set; }

        public bool ForeignPassport { get; set; }

        public bool TravelWithFamily { get; set; }

        public string WorkingHours { get; set; }

        public string Responsibilities { get; set; }

        public bool CriminalRecord { get; set; }

        public string BeginningOfWork { get; set; }

        public string Details { get; set; }

        public bool Pet { get; set; }

        public int EducationId { get; set; }

        [ForeignKey("EducationId")]
        public virtual Education Education { get; set; }
    }
}
