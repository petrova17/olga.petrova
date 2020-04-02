using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace JobSearchProject.Models
{
    public partial class Education
    {
        public Education()
        {
            Specialization = new HashSet<Specialization>();
        }

        public int Id { get; set; }

        [Required]
        [Column(TypeName = "varchar(200)")]
        public string Speciality { get; set; }

        [Column(TypeName = "varchar(200)")]
        public string AdditionalEducation { get; set; }

        public virtual ICollection<Specialization> Specialization { get; set; }
    }
}
