using System.Collections.Generic;

namespace FinanceManagementDemoApp.Models
{
    public class Account
    {

        public Account(string title, string description, double balance)
        {
            Title = title;
            Description = description;
            Balance = balance;
        }
        
        public long Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public double Balance { get; set; }
        public ICollection<Transaction> Transactions { get; set; }
    }
}