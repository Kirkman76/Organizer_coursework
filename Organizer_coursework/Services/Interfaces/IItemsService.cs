using Organizer_coursework.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Organizer_coursework.Services.Interfaces
{
    public interface IItemsService
    {
        Task<DbItem> GetItem(Guid itemId);
        Task<ICollection<DbItem>> GetItems(Guid listId);
        Task EditItem(Guid itemId, OasEditItem oasEditItem);
        Task AddItem(Guid listId, OasAddItem oasAddItem);
        Task DeleteItem(Guid itemId);
    }
}
