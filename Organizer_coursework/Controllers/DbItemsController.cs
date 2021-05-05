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
    [Route("api/items")]
    [ApiController]
    public sealed class DbItemsController : ControllerBase
    {
        private readonly DatabaseContext _context;

        public DbItemsController(DatabaseContext context)
        {
            _context = context;
        }

        [HttpGet("{listId}")]
        [Produces("application/json")]
        public async Task<ActionResult<ICollection<DbItem>>> GetDbItems([FromRoute] Guid listId)
        {
            var dbItems = await _context.Items.Where(item => item.DbListId == listId)
                .ToListAsync();

            if (dbItems == null)
            {
                return NotFound();
            }

            return dbItems;
        }

        [HttpPut("{itemId}")]
        [Consumes("application/json")]
        public async Task<IActionResult> PutDbItem([FromRoute] Guid itemId, OasEditItem oasEditItem)
        {
            if (!DbItemExists(itemId))
            {
                return NotFound();
            }

            DbItem dbItem = await _context.Items.FirstOrDefaultAsync(item => item.Id == itemId);
            dbItem.Title = oasEditItem.Title;
            dbItem.Description = oasEditItem.Description;
            dbItem.Deadline = oasEditItem.Deadline;
            dbItem.Checked = oasEditItem.Checked;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            { }

            return Ok();
        }

        [HttpPost("{listId}")]
        [Consumes("application/json")]
        public async Task<ActionResult<DbItem>> PostDbItem([FromRoute] Guid listId, OasAddItem oasAddItem)
        {
            _context.Items.Add(oasAddItem.ToDbItem(listId));
            await _context.SaveChangesAsync();

            return Ok();
        }

        [HttpDelete("{itemId}")]
        public async Task<IActionResult> DeleteDbItem(Guid itemId)
        {
            var dbItem = await _context.Items.FindAsync(itemId);
            if (dbItem == null)
            {
                return NotFound();
            }

            _context.Items.Remove(dbItem);
            await _context.SaveChangesAsync();

            return Ok();
        }

        private bool DbItemExists(Guid id)
        {
            return _context.Items.Any(e => e.Id == id);
        }
    }
}
