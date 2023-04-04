using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;
using FinanceManagementDemoApp.Data;
using FinanceManagementDemoApp.Models;
using FinanceManagementDemoApp.Models.Enums;
using IdentityServer4.Extensions;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FinanceManagementDemoApp.Controllers
{
    public class TransactionsController : BaseApiController
    {
        private readonly ApplicationDbContext _context;

        public TransactionsController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<Transaction>>> GetTransactions(long id, string term)
        {
            List<Transaction> transactions = await _context.Transactions
                .AsNoTracking()
                .ToListAsync();
            
            if (id > 0)
            {
                transactions = transactions.Where(t => t.AccountId == id).ToList();
            }

            if (!term.IsNullOrEmpty())
            {
                transactions = transactions.Where(t => t.Description.Contains(term)).ToList();
            }

            return transactions;
        }
        
        /*
        [HttpGet]
        [Route("AccountTransactions")]
        public async Task<ActionResult<List<Transaction>>> GetAccountTransactions(long id)
        {
            List<Transaction> transactions = await _context.Transactions
                .Where(t => t.AccountId == id)
                .ToListAsync();

            return transactions;
        }
        */
        

        [HttpGet]
        [Route("Transaction")]
        public async Task<ActionResult<Transaction>> GetTransaction(long id)
        {
            return await _context.Transactions
                .AsNoTracking()
                .FirstOrDefaultAsync(a => a.Id == id);
        }

        [HttpPost]
        [Route("CreateTransaction")]
        public async Task<IActionResult> CreateTransaction(IFormCollection data)
        {
            DateTime date = DateTime.ParseExact(data["date"], "yyyy-MM-dd HH:mm:ss", CultureInfo.CurrentCulture);
            string description = data["description"];
            double amount = Double.Parse(data["amount"]);
            long accountId = long.Parse(data["id"]);
            long categoryId = long.Parse(data["categoryId"]);
            Transaction transaction = new Transaction(date, description, amount, accountId, categoryId);
            Account account = await _context.Accounts.FindAsync(accountId);
            account.Balance += amount;
            _context.Transactions.Add(transaction);
            return Ok(await _context.SaveChangesAsync());
        }
        
        [HttpPost]
        [Route("EditTransaction")]
        public async Task<IActionResult> EditTransaction(IFormCollection data)
        {
            long id = long.Parse(data["id"]);
            string name = data["name"];
            string description = data["description"];
            Transaction transaction = await _context.Transactions.FindAsync(id);
            transaction.Description = description;
            _context.Transactions.Update(transaction);
            
            return Ok(await _context.SaveChangesAsync());
        }
        
        [HttpPost]
        [Route("DeleteTransaction")]
        public async Task<IActionResult> DeleteTransaction(long id)
        {

            Transaction transaction = await _context.Transactions.FindAsync(id);
            _context.Transactions.Remove(transaction);
            
            return Ok(await _context.SaveChangesAsync());
        }

        [HttpGet]
        [Route("TotalByCategory")]
        public async Task<ActionResult<double>> GetTotalByCategory(long catId)
        {
            return await _context.Transactions.Where(t => t.CategoryId == catId).Select(t => t.Amount).SumAsync();
        }
        
        [HttpGet]
        [Route("TotalExpensesByMonths")]
        public async Task<ActionResult<List<Object>>> GetTotalExpensesByMonths()
        {
            List<Object> totals = new List<Object>();

            for (int i = 1; i <= 12; i++)
            {
                totals.Add(
                new {
                    month = ((Month) (i - 1)).ToString(),
                    total = Math.Abs(await _context.Transactions.Where(t => t.Date.Month == i && t.Amount < 0)
                        .Select(t => t.Amount).SumAsync())
                });
            }

            return totals;
        }
        
        [HttpGet]
        [Route("TotalsByMonths")]
        public async Task<ActionResult<List<Object>>> GetTotalsByMonths()
        {
            List<Object> totals = new List<Object>();

            for (int i = 1; i <= 12; i++)
            {
                totals.Add(
                    new {
                        month = ((Month) (i - 1)).ToString(),
                        expenses = Math.Abs(await _context.Transactions.Where(t => t.Date.Month == i && t.Amount < 0)
                            .Select(t => t.Amount).SumAsync()),
                        income = Math.Abs(await _context.Transactions.Where(t => t.Date.Month == i && t.Amount > 0)
                            .Select(t => t.Amount).SumAsync())
                    });
            }

            return totals;
        }
    }
}