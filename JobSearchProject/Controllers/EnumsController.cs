using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using JobSearchProject.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace JobSearchProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EnumsController : ControllerBase
    {
        // GET: api/enums
        [HttpGet]
        public List<Dictionary<int, string>> Get()
        {
            var specialization = Enum.GetValues(typeof(SpecializationType))
               .Cast<SpecializationType>()
               .ToDictionary(t => (int)t, t => t.ToString());

            var languageType = Enum.GetValues(typeof(LanguageType))
              .Cast<LanguageType>()
              .ToDictionary(t => (int)t, t => t.ToString());

            var paymentType = Enum.GetValues(typeof(PaymentType))
              .Cast<PaymentType>()
              .ToDictionary(t => (int)t, t => t.ToString());

            var employmentType = Enum.GetValues(typeof(EmploymentType))
              .Cast<EmploymentType>()
              .ToDictionary(t => (int)t, t => t.ToString());

            var educationType = Enum.GetValues(typeof(EducationType))
              .Cast<EducationType>()
              .ToDictionary(t => (int)t, t => t.ToString());

            var educationSpecialityType = Enum.GetValues(typeof(EducationSpecialityType))
              .Cast<EducationSpecialityType>()
              .ToDictionary(t => (int)t, t => t.ToString());
            
            return new List<Dictionary<int, string>>() { specialization, languageType, paymentType, 
                employmentType, educationType, educationSpecialityType };
        }
    }
}