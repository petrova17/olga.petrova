using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace JobSearchProject.Models
{
    public class Vacancy
    {
        public int Id { get; set; }

        [Required]
        [Column(TypeName = "varchar(MAX)")]
        public string Description { get; set; }

        [Required]
        public int AgeFrom { get; set; }

        [Required]
        public int AgeTo { get; set; }

        public Status Status { get; set; }

        [Required]
        [Column(TypeName = "varchar(50)")]
        public string ContactName { get; set; }

        public int LocationId { get; set; }

        public virtual Location Location { get; set; }
    }
}
