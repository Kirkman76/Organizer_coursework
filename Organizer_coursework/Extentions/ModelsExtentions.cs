using Organizer_coursework.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Organizer_coursework.Extentions
{
    public static class ModelsExtentions
    {
        public static DbList ToDbList(this OasAddList addListModel)
        {
            return new DbList()
            {
                Id = Guid.NewGuid(),
                Owner = addListModel.Owner,
                Title = addListModel.Title,
                Description = addListModel.Description
            };
        }

        public static DbItem ToDbItem(this OasAddItem addItemModel, Guid listId)
        {
            return new DbItem
            {
                Id = Guid.NewGuid(),
                DbListId = listId,
                Title = addItemModel.Title,
                Description = addItemModel.Description,
                Deadline = addItemModel.Deadline,
                Checked = addItemModel.Checked
            };
        }
    }
}
