using System.Text.Json.Serialization;

namespace TenQuestApi.Models
{


    public class AnswerCreate
    {

        [JsonPropertyName("answer")]
        public string Text { get; set; } = string.Empty;

    }
}