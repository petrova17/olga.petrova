using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace JobSearchProject.Models.ResumeModels
{
    public class Resume
    {
        public int Id { get; set; }

        [Required]
        [Column(TypeName = "varchar(MAX)")]
        public string Description { get; set; }

        [Required]
        public int Age { get; set; }
        
        public Status Status { get; set; }

        public bool Top { get; set; }

        [Required]
        [Column(TypeName = "varchar(50)")]
        public string ContactName { get; set; }

        public byte? Photo { get; set; }

        public int LocationId { get; set; }

        public virtual Location Location { get; set; }

        public int SpecializationId { get; set; }

        public virtual Specialization Specialization { get; set; }

        public List<Experience> Experiences { get; set; }
    }
}
