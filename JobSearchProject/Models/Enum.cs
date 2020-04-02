using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace JobSearchProject.Models
{
    public enum PaymentType
    {
        PerHour,
        PerDay,
        PerMonth
    }

    public enum EmploymentType
    {
        Full,
        Partial
    }

    public enum Status
    {
        Saved,
        Published,
        Closed,
        Favourite
    }
}
