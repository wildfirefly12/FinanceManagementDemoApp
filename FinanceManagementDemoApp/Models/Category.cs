using System.Collections.Generic;

namespace FinanceManagementDemoApp.Models
{
    public class Category
    {
        public Category(string name, string description)
        {
            Name = name;
            Description = description;
        }
        
        public long Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public ICollection<Transaction> Transactions { get; set; }
    }
}