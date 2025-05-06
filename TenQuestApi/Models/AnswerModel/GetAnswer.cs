using System.Text.Json.Serialization;

namespace TenQuestApi.Models
{


    public class GetAnswer
    {
        public int Id { get; set; }

        public string Answer { get; set; } = string.Empty;
    }
}