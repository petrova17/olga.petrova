using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using JobSearchProject.Data;
using JobSearchProject.Models;

namespace JobSearchProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DriverVacanciesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public DriverVacanciesController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/DriverVacancies
        [HttpGet]
        public async Task<ActionResult<IEnumerable<DriverVacancy>>> GetDriverVacancy()
        {
            return await _context.DriverVacancy
                .Include(l => l.Location)
                .Include(r => r.Specialization)
                .ToListAsync();
        }

        // GET: api/DriverVacancies/5
        [HttpGet("{id}")]
        public async Task<ActionResult<DriverVacancy>> GetDriverVacancy(int id)
        {
            var driverVacancy = await _context.DriverVacancy
                .Include(l => l.Location)
                .Include(r => r.Specialization)
                .FirstAsync(r => r.Id == id);

            if (driverVacancy == null)
            {
                return NotFound();
            }

            return driverVacancy;
        }

        // PUT: api/DriverVacancies/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutDriverVacancy(int id, DriverVacancy driverVacancy)
        {
            if (id != driverVacancy.Id)
            {
                return BadRequest();
            }

            _context.Entry(driverVacancy).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DriverVacancyExists(id))
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

        // POST: api/DriverVacancies
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<ActionResult<DriverVacancy>> PostDriverVacancy(DriverVacancy driverVacancy)
        {
            _context.DriverVacancy.Add(driverVacancy);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetDriverVacancy", new { id = driverVacancy.Id }, driverVacancy);
        }

        // DELETE: api/DriverVacancies/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<DriverVacancy>> DeleteDriverVacancy(int id)
        {
            var driverVacancy = await _context.DriverVacancy.FindAsync(id);
            if (driverVacancy == null)
            {
                return NotFound();
            }

            _context.DriverVacancy.Remove(driverVacancy);
            await _context.SaveChangesAsync();

            return driverVacancy;
        }

        private bool DriverVacancyExists(int id)
        {
            return _context.DriverVacancy.Any(e => e.Id == id);
        }
    }
}
