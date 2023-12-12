using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using OrderManagement1.Repository;
using OrderManagement1.Models;

namespace OrderManagement1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IUserRepo _userRepo;
        public UsersController(IUserRepo userRepo)
        {
            _userRepo = userRepo;
        }
        [HttpGet("login/{email}/{password}")]
        public async Task<ActionResult<User>> Logins(string email, string password)
        {
            try
            {
                var result = await _userRepo.Login(email, password);
                //if (result == null) return NotFound();

                return result;
            }
            catch (Exception)
            {

                return StatusCode(StatusCodes.Status500InternalServerError,
                    "Email or password are not matched");
            }
        }
        [HttpGet]
        public async Task<ActionResult> GetUsers()
        {
            try
            {
                return Ok(await _userRepo.GetUsers());
            }
            catch (Exception)
            {

                return StatusCode(StatusCodes.Status500InternalServerError,
                    "Error retrieving the data from the database");
            }
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetUsersById(int id)
        {
            try
            {
                var result = await _userRepo.GetUserById(id);

                if (result == null) return NotFound();

                return result;
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    "Error retrieving data from the database");
            }
        }
        [HttpGet("email/{em}")]
        public async Task<ActionResult<User>> GetUsersByEmail(string em)
        {
            try
            {
                var result = await _userRepo.GetUserByEmail(em);

                //if (result == null) return NotFound();

                return result;
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    "Error retrieving data from the database");
            }
        }
        [HttpPost]
        public async Task<ActionResult<User>> SignUp(User user)
        {
            try
            {
                if (user == null) return BadRequest();

                var res = await _userRepo.UserSignUp(user);
                return CreatedAtAction(nameof(GetUsers),
                    new { id = res.UserId }, res);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    "Error in creating new User");
            }
        }
        [HttpPut("{id}")]
        public async Task<ActionResult<User>> UpdateUsers(int id, User user)
        {
            try
            {
                if (id != user.UserId) return BadRequest("User Id mismatched");

                var result = await _userRepo.GetUserById(id);
                if (result == null) return NotFound($"User with id = {id} not found");

                return await _userRepo.UpdateUser(user);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    "Error updating the data");
            }
        }
        [HttpPut("email/{email}")]
        public async Task<ActionResult<User>> UpdateUsersWithEmail(string email, User user)
        {
            try
            {
                if (email != user.Email) return BadRequest("User Email mismatched");

                var result = await _userRepo.GetUserByEmail(email);
                if (result == null) return NotFound($"User with email = {email} not found");

                return await _userRepo.UpdateUser(user);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    "Error updating the data");
            }
        }
        [HttpDelete("{id}")]
        public async Task<ActionResult<User>> DeleteUsers(int id)
        {
            try
            {
                var result = await _userRepo.GetUserById(id);
                if (result == null) return NotFound($"User with Id = {id} not found");

                return await _userRepo.DeleteUser(id);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    "Error deleting the data");
            }
        }
    }
}