using System.Collections.Generic;
using System.Threading.Tasks;
using FinanceManagementDemoApp.Data;
using FinanceManagementDemoApp.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FinanceManagementDemoApp.Controllers
{
    public class AccountController : BaseApiController
    {
        private readonly ApplicationDbContext _context;

        public AccountController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        [Route("Accounts")]
        public async Task<ActionResult<List<Account>>> GetAccounts()
        {
            List<Account> accounts = await _context.Accounts
                .AsNoTracking()
                .ToListAsync();

            return accounts;
        }

        [HttpGet]
        [Route("Account")]
        public async Task<ActionResult<Account>> GetAccount(long id)
        {
            return await _context.Accounts
                .AsNoTracking()
                .FirstOrDefaultAsync(a => a.Id == id);
        }

        [HttpPost]
        [Route("CreateAccount")]
        public async Task<IActionResult> CreateAccount(IFormCollection data)
        {
            string name = data["name"];
            string description = data["description"];
            Account account = new Account(name, description, 0);
            _context.Accounts.Add(account);
            return Ok(await _context.SaveChangesAsync());
        }
        
        [HttpPost]
        [Route("EditAccount")]
        public async Task<IActionResult> EditAccount(IFormCollection data)
        {
            long id = long.Parse(data["id"]);
            string title = data["title"];
            string description = data["description"];
            Account account = await _context.Accounts.FindAsync(id);
            account.Title = title;
            account.Description = description;
            _context.Accounts.Update(account);
            
            return Ok(await _context.SaveChangesAsync());
        }
        
        [HttpPost]
        [Route("UpdateBalance")]
        public async Task<IActionResult> UpdateBalance(IFormCollection data)
        {
            long id = long.Parse(data["id"]);
            double amount = double.Parse(data["amount"]);
            Account account = await _context.Accounts.FindAsync(id);
            account.Balance += amount;
            _context.Accounts.Update(account);
            
            return Ok(await _context.SaveChangesAsync());
        }
        
        [HttpPost]
        [Route("DeleteAccount")]
        public async Task<IActionResult> DeleteAccount(long id)
        {

            Account account = await _context.Accounts.FindAsync(id);
            _context.Accounts.Remove(account);
            
            return Ok(await _context.SaveChangesAsync());
        }

        /*[HttpGet]
        [Route("totalBalance")]
        public async double getTotalAccountsBalance()
        {
            
        }*/
    }
}