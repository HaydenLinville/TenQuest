using System.Text.Json.Serialization;
using TenQuestApi.Models;

namespace TenQuestApi.Models

{

    public class FullQuiz
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public int Category { get; set; }
        public List<QuestionFull> Questions { get; set; } = new();


    }
}