using Microsoft.EntityFrameworkCore;
using Organizer_coursework.DataContext;
using Organizer_coursework.Exceptions;
using Organizer_coursework.Extentions;
using Organizer_coursework.Models;
using Organizer_coursework.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Organizer_coursework.Services
{
    public sealed class ItemsService: IItemsService
    {
        private readonly DatabaseContext _context;

        public ItemsService(DatabaseContext context)
        {
            _context = context;
        }

        public async Task<ICollection<DbItem>> GetItems(Guid listId)
        {
            var dbItems = await _context.Items.Where(item => item.DbListId == listId)
                .ToListAsync();

            if (dbItems == null)
            {
                throw new NotFoundException();
            }

            return dbItems;
        }

        public async Task EditItem(Guid itemId, OasEditItem oasEditItem)
        {
            if (!ItemExists(itemId))
            {
                throw new NotFoundException();
            }

            DbItem dbItem = await _context.Items.FirstOrDefaultAsync(item => item.Id == itemId);
            dbItem.Title = oasEditItem.Title;
            dbItem.Description = oasEditItem.Description;
            dbItem.Deadline = oasEditItem.Deadline;
            dbItem.Checked = oasEditItem.Checked;

            await _context.SaveChangesAsync();
        }

        public async Task AddItem(Guid listId, OasAddItem oasAddItem)
        {
            _context.Items.Add(oasAddItem.ToDbItem(listId));
            await _context.SaveChangesAsync();
        }

        public async Task DeleteItem(Guid itemId)
        {
            var dbItem = await _context.Items.FindAsync(itemId);
            if (dbItem == null)
            {
                throw new NotFoundException();
            }

            _context.Items.Remove(dbItem);
            await _context.SaveChangesAsync();
        }

        private bool ItemExists(Guid id)
        {
            return _context.Items.Any(e => e.Id == id);
        }
    }
}
