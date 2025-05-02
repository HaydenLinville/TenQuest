
using System.Text.Json.Serialization;

namespace TenQuestApi.Models
{

    public class QuestionDefault
    {
        // [JsonPropertyName("id")]
        // public int Id { get; set; }
        [JsonPropertyName("text")]
        public string Text { get; set; } = string.Empty;
        [JsonPropertyName("answers")]
        public List<AnswerCreate> Answers { get; set; } = new();
        [JsonPropertyName("correctAnswerIndex")]
        public int CorrectAnswerIndex { get; set; }
        [JsonPropertyName("hasBeenAsked")]
        public bool HasBeenAsked { get; set; }
    }
}