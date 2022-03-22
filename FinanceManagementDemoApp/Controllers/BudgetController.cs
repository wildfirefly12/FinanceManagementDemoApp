using System.Collections.Generic;
using System.Threading.Tasks;
using FinanceManagementDemoApp.Data;
using FinanceManagementDemoApp.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FinanceManagementDemoApp.Controllers
{
    public class BudgetController : BaseApiController
    {
        private readonly ApplicationDbContext _context;
        
        public BudgetController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        [Route("Budgets")]
        public async Task<ActionResult<List<Budget>>> GetBudgets()
        {
            List<Budget> budgets = await _context.Budgets
                .AsNoTracking()
                .ToListAsync();

            return budgets;
        }

        [HttpGet]
        [Route("Budget")]
        public async Task<ActionResult<Budget>> GetBudget(long id)
        {
            return await _context.Budgets
                .AsNoTracking()
                .FirstOrDefaultAsync(a => a.Id == id);
        }

        [HttpPost]
        [Route("CreateBudget")]
        public async Task<IActionResult> CreateBudget()
        {
            Budget budget = new Budget();
            _context.Budgets.Add(budget);
            return Ok(await _context.SaveChangesAsync());
        }

        [HttpPost]
        [Route("DeleteBudget")]
        public async Task<IActionResult> DeleteBudget(long id)
        {

            Budget budget = await _context.Budgets.FindAsync(id);
            _context.Budgets.Remove(budget);
            
            return Ok(await _context.SaveChangesAsync());
        }
    }
}