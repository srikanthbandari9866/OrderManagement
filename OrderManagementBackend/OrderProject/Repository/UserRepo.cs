using Microsoft.EntityFrameworkCore;
using OrderManagement1.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OrderManagement1.Repository
{
    public class UserRepo : IUserRepo
    {
        private readonly OrderContext _orderContext = null;
        public UserRepo(OrderContext orderContext)
        {
            _orderContext = orderContext;
        }


        public async Task<IEnumerable<User>> GetUsers()
        {
            return await _orderContext.User.ToListAsync();
        }
        public async Task<User> Login(string email, string password)
        {
            return await _orderContext.User
                .FirstOrDefaultAsync(e => e.Email == email && e.Password == password);
        }
        public async Task<User> GetUserById(int id)
        {
            return await _orderContext.User
                .FirstOrDefaultAsync(e => e.UserId == id);
        }
        public async Task<User> GetUserByEmail(string em)
        {
            return await _orderContext.User
                .FirstOrDefaultAsync(e => e.Email == em);
        }
        public async Task<User> UserSignUp(User u)
        {
            var result = await _orderContext.User.AddAsync(u);
            await _orderContext.SaveChangesAsync();
            return result.Entity;
        }
        public async Task<User> UpdateUser(User u)
        {
            var user = await _orderContext.User
                .FirstOrDefaultAsync(e => e.UserId == u.UserId);
            if (user != null)
            {
                //user.UserName = u.UserName;
                //user.PhoneNumber = u.PhoneNumber;
                //user.Email = u.Email;
                user.Password = u.Password;
                //user.Balance = u.Balance;
                _orderContext.Entry(user).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
                await _orderContext.SaveChangesAsync();
                return user;
            }
            return null;
        }
        public async Task<User> UpdateUserWithEmail(User u)
        {
            var user = await _orderContext.User
                .FirstOrDefaultAsync(e => e.Email == u.Email);
            if (user != null)
            {
                //user.UserName = u.UserName;
                //user.PhoneNumber = u.PhoneNumber;
                //user.Email = u.Email;
                user.Password = u.Password;
                //user.Balance = u.Balance;
                _orderContext.Entry(user).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
                await _orderContext.SaveChangesAsync();
                return user;
            }
            return null;
        }
        public async Task<User> DeleteUser(int id)
        {
            var result = await _orderContext.User
                .FirstOrDefaultAsync(e => e.UserId == id);
            if (result != null)
            {
                _orderContext.User.Remove(result);
                await _orderContext.SaveChangesAsync();
            }
            return null;
        }
    }
}
