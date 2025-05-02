using System.Text.Json.Serialization;

namespace TenQuestApi.Models
{


    public class AnswerCreate
    {
        // [JsonPropertyName("id")]
        // public int Id { get; set; }
        [JsonPropertyName("answer")]
        public string Answer { get; set; } = string.Empty;
    }
}