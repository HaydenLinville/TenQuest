
using System.Text.Json.Serialization;
using TenQuestApi.Models;

namespace TenQuestApi.Models

{

    public class QuizDefault
    {
        public string Title { get; set; } = string.Empty;
        [JsonPropertyName("category")]
        public int Category { get; set; }
        public List<QuestionDefault> Questions { get; set; } = new();


    }
}