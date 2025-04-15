using DemoApi.BusinessObjects;
using DemoApi.BusinessObjects.Options;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace DemoApi.Controllers
{
    /// <summary>
    /// Unprotected Controller to retrieve a valid bearer token to access other controllers
    /// </summary>
    [Route("api/v1/Authenticate")]
    public class AuthenticateController(
            ILogger<AuthenticateController> _logger,
            IOptions<JwtOptions> _options
        ) : Controller
    {

        [HttpGet, Route("")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(string))]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Authorize()
        {
            var requestGuid = Guid.NewGuid();
            try
            {
                _logger.LogDebug($"Call=Authorize, Action=START GET, RequestGuid={requestGuid}");

                var createdDate = DateTime.UtcNow;
                var claims = new[]
                {
                    new Claim(JwtRegisteredClaimNames.Sub, _options.Value.Subject),
                    new Claim(JwtRegisteredClaimNames.Iat, createdDate.Subtract(DateTime.UnixEpoch).TotalSeconds.ToString()),
                    new Claim(JwtRegisteredClaimNames.Exp, createdDate.AddDays(_options.Value.Lifetime).Subtract(DateTime.UnixEpoch).TotalSeconds.ToString()),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                    new Claim(ClaimsIdentity.DefaultNameClaimType, Guid.NewGuid().ToString()),
                };

                var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_options.Value.Key));
                var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
                var token = new JwtSecurityToken(_options.Value.Issuer, _options.Value.Audience, claims, signingCredentials: credentials);

                string result = new JwtSecurityTokenHandler().WriteToken(token);

                _logger.LogDebug($"Call=Authorize, Action=FINISH GET, RequestGuid={requestGuid}");

                return Ok(result);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Call=Authorize, Exception={ex}, RequestGuid={requestGuid}");
                return BadRequest(new GeneralException(requestGuid));
            }
        }
    }
}
