using OrderManagement1.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OrderManagement1.Repository
{
    public interface IUserRepo
    {
        Task<IEnumerable<User>> GetUsers();
        Task<User> Login(string email, string password);
        Task<User> GetUserById(int id);
        Task<User> GetUserByEmail(string em);
        Task<User> UserSignUp(User u);
        Task<User> UpdateUser(User u);
        Task<User> UpdateUserWithEmail(User u);
        Task<User> DeleteUser(int id);
    }
}
