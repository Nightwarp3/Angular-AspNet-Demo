using DemoApi.BusinessObjects;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace DemoApi.Controllers
{
    /// <summary>
    /// Jwt Bearer Token protected controller to retrieve user information
    /// </summary>
    [Authorize]
    [Route("api/v1/User")]
    public class UserController : Controller
    {
        private readonly ILogger<UserController> _logger;

        public UserController(ILogger<UserController> logger)
        {
            _logger = logger;
        }

        /// <summary>
        /// Use this endpoint to verify the JWT token provided is valid, and retrieve the generated username (guid).
        /// </summary>
        /// <returns>Guid</returns>
        [HttpGet, Route("")]
        [ProducesResponseType(StatusCodes.Status200OK, Type=typeof(string))]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> UserName()
        {
            var requestGuid = Guid.NewGuid();
            try
            {
                _logger.LogDebug($"Call=User, Action=START GET, RequestGuid={requestGuid}");
                string result = User.Identity.Name;
                _logger.LogDebug($"Call=User, Action=FINISH GET, RequestGuid={requestGuid}");
                return Ok(result);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Call=User, Exception={ex}, RequestGuid={requestGuid}");
                return BadRequest(new GeneralException(requestGuid));
            }
        }
    }
}
