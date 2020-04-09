﻿using System;
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
    public class BabysitterVacanciesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public BabysitterVacanciesController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/BabysitterVacancies
        [HttpGet]
        public async Task<ActionResult<IEnumerable<BabysitterVacancy>>> GetBabysitterVacancy()
        {
            return await _context.BabysitterVacancy
                .Include(e => e.Education)
                .Include(l => l.Location)
                .Include(r => r.Specialization)
                .ToListAsync();
        }

        // GET: api/BabysitterVacancies/5
        [HttpGet("{id}")]
        public async Task<ActionResult<BabysitterVacancy>> GetBabysitterVacancy(int id)
        {
            var babysitterVacancy = await _context.BabysitterVacancy
                .Include(e => e.Education)
                .Include(l => l.Location)
                .Include(r => r.Specialization)
                .FirstAsync(r => r.Id == id);

            if (babysitterVacancy == null)
            {
                return NotFound();
            }

            return babysitterVacancy;
        }

        // PUT: api/BabysitterVacancies/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutBabysitterVacancy(int id, BabysitterVacancy babysitterVacancy)
        {
            if (id != babysitterVacancy.Id)
            {
                return BadRequest();
            }

            _context.Entry(babysitterVacancy).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BabysitterVacancyExists(id))
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

        // POST: api/BabysitterVacancies
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<ActionResult<BabysitterVacancy>> PostBabysitterVacancy(BabysitterVacancy babysitterVacancy)
        {
            _context.BabysitterVacancy.Add(babysitterVacancy);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetBabysitterVacancy", new { id = babysitterVacancy.Id }, babysitterVacancy);
        }

        // DELETE: api/BabysitterVacancies/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<BabysitterVacancy>> DeleteBabysitterVacancy(int id)
        {

            var specialization = await _context.Specialization.FirstAsync(r => r.BabysitterVacancy.Id == id);
            if (specialization == null)
            {
                return NotFound();
            }

            _context.Specialization.Remove(specialization);

            var babysitterVacancy = await _context.BabysitterVacancy.FindAsync(id);
            if (babysitterVacancy == null)
            {
                return NotFound();
            }
            
            _context.BabysitterVacancy.Remove(babysitterVacancy);

            var location = await _context.Location.FindAsync(babysitterVacancy.LocationId);
            if (location == null)
            {
                return NotFound();
            }

            _context.Location.Remove(location);

            var education = await _context.Education.FindAsync(babysitterVacancy.EducationId);
            if (education == null)
            {
                return NotFound();
            }

            _context.Education.Remove(education);                       

            await _context.SaveChangesAsync();

            return babysitterVacancy;
        }

        private bool BabysitterVacancyExists(int id)
        {
            return _context.BabysitterVacancy.Any(e => e.Id == id);
        }
    }
}
