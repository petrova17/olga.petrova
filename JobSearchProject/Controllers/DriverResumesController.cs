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
    public class DriverResumesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public DriverResumesController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/DriverResumes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<DriverResume>>> GetDriverResume()
        {
            return await _context.DriverResume
                .Include(l => l.Location)
                .Include(r => r.Specialization)
                .Include(t => t.Experiences)
                .ToListAsync();
        }

        // GET: api/DriverResumes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<DriverResume>> GetDriverResume(int id)
        {
            var driverResume = await _context.DriverResume
                .Include(l => l.Location)
                .Include(r => r.Specialization)
                .Include(t => t.Experiences)
                .FirstAsync(r => r.Id == id);

            if (driverResume == null)
            {
                return NotFound();
            }

            return driverResume;
        }

        // PUT: api/DriverResumes/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutDriverResume(int id, DriverResume driverResume)
        {
            if (id != driverResume.Id)
            {
                return BadRequest();
            }

            _context.Entry(driverResume).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DriverResumeExists(id))
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

        // POST: api/DriverResumes
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<ActionResult<DriverResume>> PostDriverResume(DriverResume driverResume)
        {
            _context.DriverResume.Add(driverResume);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetDriverResume", new { id = driverResume.Id }, driverResume);
        }

        // DELETE: api/DriverResumes/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<DriverResume>> DeleteDriverResume(int id)
        {
            var driverResume = await _context.DriverResume.FindAsync(id);
            if (driverResume == null)
            {
                return NotFound();
            }

            _context.DriverResume.Remove(driverResume);
            await _context.SaveChangesAsync();

            return driverResume;
        }

        private bool DriverResumeExists(int id)
        {
            return _context.DriverResume.Any(e => e.Id == id);
        }
    }
}
