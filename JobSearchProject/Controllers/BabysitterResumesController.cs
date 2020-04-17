using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using JobSearchProject.Data;
using JobSearchProject.Models.ResumeModels;

namespace JobSearchProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BabysitterResumesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public BabysitterResumesController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/BabysitterResumes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<BabysitterResume>>> GetBabysitterResume()
        {
            return await _context.BabysitterResume
                .Include(e => e.Education)
                .Include(l => l.Location)
                .Include(r => r.Specialization)
                .Include(t => t.Experiences)
                .ToListAsync();
        }

        // GET: api/BabysitterResumes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<BabysitterResume>> GetBabysitterResume(int id)
        {
            var babysitterResume = await _context.BabysitterResume
                .Include(e => e.Education)
                .Include(l => l.Location)
                .Include(r => r.Specialization)
                .Include(t => t.Experiences)
                .FirstAsync(r => r.Id == id);

            if (babysitterResume == null)
            {
                return NotFound();
            }

            return babysitterResume;
        }

        // PUT: api/BabysitterResumes/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutBabysitterResume(int id, BabysitterResume babysitterResume)
        {
            if (id != babysitterResume.Id)
            {
                return BadRequest();
            }

            _context.Entry(babysitterResume).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BabysitterResumeExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/BabysitterResumes
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<ActionResult<BabysitterResume>> PostBabysitterResume(BabysitterResume babysitterResume)
        {
            _context.BabysitterResume.Add(babysitterResume);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetBabysitterResume", new { id = babysitterResume.Id }, babysitterResume);
        }

        // DELETE: api/BabysitterResumes/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<BabysitterResume>> DeleteBabysitterResume(int id)
        {
            var specialization = await _context.Specialization.FirstAsync(r => r.BabysitterResume.Id == id);
            if (specialization == null)
            {
                return NotFound(); 
            }

            _context.Specialization.Remove(specialization);

            var babysitterResume = await _context.BabysitterResume.FindAsync(id);
            if (babysitterResume == null)
            {
                return NotFound();
            }

            _context.BabysitterResume.Remove(babysitterResume);

            var location = await _context.Location.FindAsync(babysitterResume.LocationId);
            if (location == null)
            {
                return NotFound();
            }

            _context.Location.Remove(location);

            var education = await _context.Education.FindAsync(babysitterResume.EducationId);
            if (education == null)
            {
                return NotFound();
            }

            _context.Education.Remove(education);

            var experiences = await _context.Experience.Where( r=> r.ResumeId == babysitterResume.Id)
                .ToListAsync();

            if (experiences.Count > 0)
            {
                experiences.ForEach(r => _context.Experience.Remove(r));
            }            
            
            await _context.SaveChangesAsync();

            return babysitterResume;
        }

        private bool BabysitterResumeExists(int id)
        {
            return _context.BabysitterResume.Any(e => e.Id == id);
        }
    }
}
