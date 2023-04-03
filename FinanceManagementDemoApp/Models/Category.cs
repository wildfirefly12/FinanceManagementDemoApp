using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace FinanceManagementDemoApp.Models
{
    public class Category
    {
        public Category(string name, string description)
        {
            Name = name;
            Description = description;
            EstimatedTotal = 0;
        }
        
        public long Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public double EstimatedTotal { get; set; }
        public ICollection<Transaction> Transactions { get; set; }
    }
}