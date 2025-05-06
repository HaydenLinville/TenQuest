
using System.Text.Json.Serialization;


namespace TenQuestApi.Models
{

    public class CreateQuestion
    {

        [JsonPropertyName("text")]
        public string Text { get; set; } = string.Empty;
        [JsonPropertyName("answers")]
        public List<AnswerCreate> Answers { get; set; } = new();
        public int CorrectAnswerIndex { get; set; }
        
    }
}