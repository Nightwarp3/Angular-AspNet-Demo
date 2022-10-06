namespace DemoApi.BusinessObjects.Options
{
    public class JwtOptions
    {
        public const string JwtSettings = "Jwt";

        public string Key { get; set; } = string.Empty;
        public string Issuer { get; set; } = string.Empty;
        public string Audience { get; set; } = string.Empty;
        public string Subject { get; set; } = string.Empty;
        public int Lifetime { get; set; } = 90;
    }
}
