using System;
using System.ComponentModel.DataAnnotations.Schema;
using JobSearchProject.Models.ResumeModels;

namespace JobSearchProject.Models
{
    public class Experience
    {
        public int Id { get; set; }

        public DateTime From { get; set; }

        public DateTime To { get; set; }

        [Column(TypeName = "varchar(50)")]
        public string Title { get; set; }

        public string Description { get; set; }

        public int ResumeId { get; set; }
        public Resume Resume { get; set; }
    }
}
