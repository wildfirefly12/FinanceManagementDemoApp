using System;

namespace FinanceManagementDemoApp.Models
{
    public class Transaction
    {

        public Transaction()
        {
            
        }
        public Transaction(DateTime date, string description, double amount)
        {
            Date = date;
            Description = description;
            Amount = amount;
        }
        
        public long Id { get; set; }
        
        public DateTime Date { get; set; }
        public string Description { get; set; }
        public double Amount { get; set; }
        public long AccountId { get; set; }
        public Account Account { get; set; }
    }
}