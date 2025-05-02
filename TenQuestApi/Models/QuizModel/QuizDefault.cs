
using System.Text.Json.Serialization;
using TenQuestApi.Models;

namespace TenQuestApi.Models

{

    public class QuizDefault
    {
        // [JsonPropertyName("id")]
        // public int Id { get; set; }
        [JsonPropertyName("title")]
        public string Title { get; set; } = string.Empty;
        [JsonPropertyName("category")]
        public int Category { get; set; }
        [JsonPropertyName("questions")]
        public List<QuestionDefault> Questions { get; set; } = new();


    }
}