using Microsoft.AspNetCore.Mvc;
using Organizer_coursework.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Organizer_coursework.Services.Interfaces
{
    public interface IListsService
    {
        Task<IEnumerable<DbList>> GetLists();
        Task<DbList> GetList(Guid listId);
        Task EditList(Guid listId, OasEditList newList);
        Task AddList(OasAddList newList);
        Task DeleteList(Guid listId);
    }
}
