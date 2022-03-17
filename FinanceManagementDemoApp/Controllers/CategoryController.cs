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
            List<Category> Categories = await _context.Categories
                .AsNoTracking()
                .ToListAsync();

            return Categories;
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
            Category Category = new Category(name, description);
            _context.Categories.Add(Category);
            return Ok(await _context.SaveChangesAsync());
        }
        
        [HttpPost]
        [Route("EditCategory")]
        public async Task<IActionResult> EditCategory(IFormCollection data)
        {
            long id = long.Parse(data["id"]);
            string name = data["name"];
            string description = data["description"];
            Category Category = await _context.Categories.FindAsync(id);
            Category.Name = name;
            Category.Description = description;
            _context.Categories.Update(Category);
            
            return Ok(await _context.SaveChangesAsync());
        }
        
        [HttpPost]
        [Route("DeleteCategory")]
        public async Task<IActionResult> DeleteCategory(long id)
        {

            Category Category = await _context.Categories.FindAsync(id);
            _context.Categories.Remove(Category);
            
            return Ok(await _context.SaveChangesAsync());
        }
    }
}