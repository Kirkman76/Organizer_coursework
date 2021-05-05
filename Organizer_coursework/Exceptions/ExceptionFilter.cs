using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Organizer_coursework.Exceptions
{
    public class ExceptionFilter : IExceptionFilter
    {
        public void OnException(ExceptionContext context)
        {
            switch (context.Exception)
            {
                case NotFoundException _:
                    context.Result = new StatusCodeResult(StatusCodes.Status404NotFound);
                    break;
                case DbUpdateConcurrencyException _:
                    context.Result = new StatusCodeResult(StatusCodes.Status409Conflict);
                    break;
            }   
        }
    }
}
