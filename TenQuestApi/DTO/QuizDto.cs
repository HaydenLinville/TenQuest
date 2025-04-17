
using System.Text.Json.Serialization;
using TenQuestApi.Models;

namespace TenQuestApi.DTO

{

    public class QuizDto
    {
        public string Title { get; set; } = string.Empty;
        [JsonPropertyName("category")]
        public int Category { get; set; }
        public List<QuestionDto> Questions { get; set; } = new();


    }
}