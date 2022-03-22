using System.Collections;
using System.Collections.Generic;

namespace FinanceManagementDemoApp.Models
{
    public class Budget
    {
        public long Id { get; set; }
        public double Balance { get; set; }
        public ICollection<Category> Categories { get; set; }
    }
}