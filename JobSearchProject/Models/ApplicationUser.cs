using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace JobSearchProject.Models
{
    public class ApplicationUser : IdentityUser
    {
        public string Type { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
    }
}
