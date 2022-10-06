namespace DemoApi.BusinessObjects
{
    /// <summary>
    /// Use this exception to omit the details of the error.
    /// </summary>
    public class GeneralException : Exception
    {
        /// <summary>
        /// Use this constructor to pass a guid that can be used to search the error in the application logs.
        /// </summary>
        /// <param name="guid">The guid that can be used to find the error in the application logs.</param>
        public GeneralException(Guid guid)
            : base($"An exception has occurred, you can find the details in the application log with this guid: {guid}")
        {
        }
    }
}
