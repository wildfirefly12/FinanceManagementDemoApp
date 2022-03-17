namespace FinanceManagementDemoApp.Models
{
    public class Account
    {

        public Account(string name, string description)
        {
            Name = name;
            Description = description;
        }
        
        public long Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
    }
}