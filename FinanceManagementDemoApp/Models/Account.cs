namespace FinanceManagementDemoApp.Models
{
    public class Account
    {

        public Account(string name, string description, double balance)
        {
            Name = name;
            Description = description;
            Balance = balance;
        }
        
        public long Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public double Balance { get; set; }
    }
}