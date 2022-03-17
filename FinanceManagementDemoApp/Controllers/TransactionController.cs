﻿using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using FinanceManagementDemoApp.Data;
using FinanceManagementDemoApp.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FinanceManagementDemoApp.Controllers
{
    public class TransactionController : BaseApiController
    {
                private readonly ApplicationDbContext _context;

        public TransactionController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<Transaction>>> GetTransactions()
        {
            List<Transaction> transactions = await _context.Transactions
                .AsNoTracking()
                .ToListAsync();

            return transactions;
        }

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
            DateTime date = DateTime.Parse(data["date"]);
            string description = data["description"];
            double amount = Double.Parse(data["amount"]);
            long accountId = long.Parse(data["account"]);
            Account account = _context.Accounts.FindAsync(accountId).Result;
            long categoryId = long.Parse(data["category"]);
            Category category = _context.Categories.FindAsync(categoryId).Result;
            Transaction transaction = new Transaction(date, description, amount, account, category);
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
    }
}