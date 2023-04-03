using System.Collections.Generic;
using System.Threading.Tasks;
using FinanceManagementDemoApp.Data;
using FinanceManagementDemoApp.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FinanceManagementDemoApp.Controllers
{
    public class CategoryController : BaseApiController
    {
                private readonly ApplicationDbContext _context;

        public CategoryController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<Category>>> GetCategories()
        {
            List<Category> categories = await _context.Categories
                .AsNoTracking()
                .ToListAsync();

            return categories;
        }

        [HttpGet]
        [Route("Category")]
        public async Task<ActionResult<Category>> GetCategory(long id)
        {
            return await _context.Categories
                .AsNoTracking()
                .FirstOrDefaultAsync(a => a.Id == id);
        }

        [HttpPost]
        [Route("CreateCategory")]
        public async Task<IActionResult> CreateCategory(IFormCollection data)
        {
            string name = data["name"];
            string description = data["description"];
            Category category = new Category(name, description);
            _context.Categories.Add(category);
            return Ok(await _context.SaveChangesAsync());
        }
        
        [HttpPost]
        [Route("EditCategory")]
        public async Task<IActionResult> EditCategory(IFormCollection data)
        {
            long id = long.Parse(data["id"]);
            string name = data["name"];
            string description = data["description"];
            Category category = await _context.Categories.FindAsync(id);
            category.Name = name;
            category.Description = description;
            _context.Categories.Update(category);
            
            return Ok(await _context.SaveChangesAsync());
        }
        
        [HttpPost]
        [Route("DeleteCategory")]
        public async Task<IActionResult> DeleteCategory(long id)
        {

            Category category = await _context.Categories.FindAsync(id);
            _context.Categories.Remove(category);
            
            return Ok(await _context.SaveChangesAsync());
        }

        [HttpPost]
        [Route("addExpense")]
        public async Task<IActionResult> AddExpense(IFormCollection data)
        {
            long id = long.Parse(data["id"]);
            double amount = double.Parse(data["amount"]);

            Category category = await _context.Categories.FindAsync(id);

            category.EstimatedTotal += amount;
            await _context.SaveChangesAsync();

            return Ok();
        }
    }
}