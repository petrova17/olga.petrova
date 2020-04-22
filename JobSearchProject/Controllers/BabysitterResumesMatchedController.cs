using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using JobSearchProject.Data;
using JobSearchProject.Models.ResumeModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace JobSearchProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BabysitterResumesMatchedController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public BabysitterResumesMatchedController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/BabysitterResumesMatched
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/BabysitterResumesMatched/5
        [HttpGet("{id}")]
        public async Task<ActionResult<IEnumerable<BabysitterResume>>> GetBabysitterResumeMatched(int id)
        {
            var babysitterVacancy = await _context.BabysitterVacancy
                .FirstAsync(r => r.Id == id);

            var resumes = await _context.BabysitterResume
                .Where(r=> r.Age >= babysitterVacancy.AgeFrom && r.Age <= babysitterVacancy.AgeTo)              
                .Where(r => (babysitterVacancy.DriverLicense) ? r.DriverLicense == true : true)
                .Where(r => (babysitterVacancy.OwnChildren) ? r.OwnChildren == true : true)
                .Where(r => (babysitterVacancy.OfficialEmployment) ? r.OfficialEmployment == true : true)
                .Where(r => (babysitterVacancy.MedicineBook) ? r.MedicineBook == true : true)
                .Where(r => (babysitterVacancy.SpecialChild) ? r.SpecialChild == true : true)
                .Where(r => (babysitterVacancy.VideoSurveillance) ? r.VideoSurveillance == true : true)
                .Where(r => (babysitterVacancy.ForeignPassport) ? r.ForeignPassport == true : true)
                .Where(r => (babysitterVacancy.TravelWithFamily) ? r.TravelWithFamily == true : true)

                .Where(r => r.NativeLanguage == babysitterVacancy.NativeLanguage 
                        || r.OtherLanguages.Contains(((int)babysitterVacancy.NativeLanguage).ToString()))

                .Include(e => e.Education)
                .Include(l => l.Location)
                .Include(r => r.Specialization)
                .Include(t => t.Experiences)
                .ToListAsync();

            return resumes;
        }

        // POST: api/BabysitterResumesMatched
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT: api/BabysitterResumesMatched/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
