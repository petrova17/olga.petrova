using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace JobSearchProject.Models
{
    public partial class Location
    {
        public int Id { get; set; }

        [Required]
        [Column(TypeName = "varchar(200)")]
        public string Country { get; set; }

        [Required]
        [Column(TypeName = "varchar(50)")]
        public string City { get; set; }

        [Column(TypeName = "nvarchar(50)")]
        public string Region { get; set; }

        [Column(TypeName = "nvarchar(50)")]
        public string Street { get; set; }

        public List<Vacancy> Vacancies { get; set; }
    }
}
