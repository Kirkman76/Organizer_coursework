using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Organizer_coursework.DataContext;
using Organizer_coursework.Extentions;
using Organizer_coursework.Models;
using Organizer_coursework.Services.Interfaces;

namespace Organizer_coursework.Controllers
{
    [Route("api/items")]
    [ApiController]
    [Authorize]
    public sealed class DbItemsController : ControllerBase
    {
        private readonly IItemsService _itemsService; 

        public DbItemsController(IItemsService itemsService)
        {
            _itemsService = itemsService;
        }

        [Authorize]
        [HttpGet("{itemId}")]
        [Produces("application/json")]
        public async Task<ActionResult> GetItem(
            [FromRoute] Guid itemId)
        {
            return Ok(await _itemsService.GetItem(itemId));
        }

        [Authorize]
        [HttpGet("{listId}/alllist")]
        [Produces("application/json")]
        public async Task<ActionResult> GetItems(
            [FromRoute] Guid listId)
        {
            return Ok(await _itemsService.GetItems(listId));
        }

        [Authorize]
        [HttpPut("{itemId}")]
        [Consumes("application/json")]
        public async Task<IActionResult> EditItem(
            [FromRoute] Guid itemId,
            [FromBody] OasEditItem oasEditItem)
        {
            await _itemsService.EditItem(itemId, oasEditItem);
            return Ok();
        }

        [Authorize]
        [HttpPost("{listId}")]
        [Consumes("application/json")]
        public async Task<ActionResult<DbItem>> AddItem(
            [FromRoute] Guid listId,
            [FromBody] OasAddItem oasAddItem)
        {
            await _itemsService.AddItem(listId, oasAddItem);
            return Ok();
        }

        [Authorize]
        [HttpDelete("{itemId}")]
        public async Task<IActionResult> DeleteItem(Guid itemId)
        {
            await _itemsService.DeleteItem(itemId);
            return Ok();
        }
    }
}
