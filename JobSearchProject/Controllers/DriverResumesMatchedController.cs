using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using JobSearchProject.Data;
using JobSearchProject.Models.ResumeModels;

namespace JobSearchProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DriverResumesMatchedController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public DriverResumesMatchedController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/DriverResumesMatched
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/DriverResumesMatched/5
        [HttpGet("{id}")]
        public async Task<ActionResult<IEnumerable<DriverResume>>> GetDriverResumeMatched(int id)
        {
            var driverVacancy = await _context.DriverVacancy
                .FirstAsync(r => r.Id == id);

            var resumes = await _context.DriverResume
                .Where(r => r.Age >= driverVacancy.AgeFrom && r.Age <= driverVacancy.AgeTo)
                .Where(r => r.DrivingExperience >= driverVacancy.DrivingExperience)
                .Include(l => l.Location)
                .Include(r => r.Specialization)
                .Include(t => t.Experiences)
                .ToListAsync();

            return resumes;
        }

        // POST: api/DriverResumesMatched
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT: api/DriverResumesMatched/5
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
