using System.ComponentModel.DataAnnotations.Schema;

namespace JobSearchProject.Models
{
    public partial class Education
    {
        public int Id { get; set; }

        public EducationSpecialityType SpecialityType { get; set; }

        [Column(TypeName = "varchar(200)")]
        public string AdditionalEducation { get; set; }
    }
}
