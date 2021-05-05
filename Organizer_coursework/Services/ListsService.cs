using Microsoft.AspNetCore.Mvc;
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
    public sealed class ListsService: IListsService
    {
        private readonly DatabaseContext _context;

        public ListsService(DatabaseContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<DbList>> GetLists()
        {
            return await _context.Lists.Include(list => list.Records)
                .ToListAsync();
        }

        public async Task<DbList> GetList(Guid listId)
        {
            var list = await _context.Lists.Include(list => list.Records)
                .FirstOrDefaultAsync(list => list.Id == listId);

            if (list == null)
            {
                throw new NotFoundException();
            }

            return list;
        }

        public async Task EditList(Guid listId, OasEditList newList)
        {
            if (!ListExists(listId))
            {
                throw new NotFoundException();
            }

            DbList dbList = await _context.Lists
                .FirstOrDefaultAsync(list => list.Id == listId);
            dbList.Owner = newList.Owner;
            dbList.Title = newList.Title;
            dbList.Description = newList.Description;

            await _context.SaveChangesAsync();
        }

        public async Task AddList(OasAddList newList)
        {

            _context.Lists.Add(newList.ToDbList());
            await _context.SaveChangesAsync();
        }

        public async Task DeleteList(Guid listId)
        {
            var list = await _context.Lists.FindAsync(listId);
            if (list == null)
            {
                throw new NotFoundException();
            }

            _context.Lists.Remove(list);
            await _context.SaveChangesAsync();
        }

        private bool ListExists(Guid listId)
        {
            return _context.Lists.Any(e => e.Id == listId);
        }
    }
}
