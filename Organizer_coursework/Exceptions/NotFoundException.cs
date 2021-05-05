using System;

namespace Organizer_coursework.Exceptions
{
    public class NotFoundException: Exception
    {
        public NotFoundException()
        {}

        public NotFoundException(string message)
            : base(message)
        {}
    }
}
