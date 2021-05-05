using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Organizer_coursework.DataContext;
using Organizer_coursework.Extentions;
using Organizer_coursework.Models;

namespace Organizer_coursework.Controllers
{
    [Route("api/lists")]
    [ApiController]
    public sealed class DbListsController : ControllerBase
    {
        private readonly DatabaseContext _context;

        public DbListsController(DatabaseContext context)
        {
            _context = context;
        }

        [HttpGet]
        [Produces("application/json")]
        public async Task<ActionResult<IEnumerable<DbList>>> GetLists()
        {
            return await _context.Lists.Include(list => list.Records)
                .ToListAsync();
        }

        [HttpGet("{listId}")]
        [Produces("application/json")]
        public async Task<ActionResult<DbList>> GetList([FromRoute] Guid listId)
        {
            var list = await _context.Lists.Include(list => list.Records)
                .FirstOrDefaultAsync(list => list.Id == listId);

            if (list == null)
            {
                return NotFound();
            }

            return list;
        }

        [HttpPut("{listId}")]
        [Consumes("application/json")]
        public async Task<IActionResult> PutList(
            [FromRoute] Guid listId,
            [FromBody] OasEditList newList)
        {
            if (!ListExists(listId))
            {
                return NotFound();
            }

            DbList dbList = await _context.Lists
                .FirstOrDefaultAsync(list => list.Id == listId);
            dbList.Owner = newList.Owner;
            dbList.Title = newList.Title;
            dbList.Description = newList.Description;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {}

            return Ok();
        }

        [HttpPost]
        [Consumes("application/json")]
        public async Task<ActionResult<DbList>> PostList([FromBody] OasAddList newList)
        {

            _context.Lists.Add(newList.ToDbList());
            await _context.SaveChangesAsync();

            return Ok();
        }

        [HttpDelete("{listId}")]
        public async Task<IActionResult> DeleteList([FromRoute] Guid listId)
        {
            var list = await _context.Lists.FindAsync(listId);
            if (list == null)
            {
                return NotFound();
            }

            _context.Lists.Remove(list);
            await _context.SaveChangesAsync();

            return Ok();
        }

        private bool ListExists(Guid listId)
        {
            return _context.Lists.Any(e => e.Id == listId);
        }
    }
}
