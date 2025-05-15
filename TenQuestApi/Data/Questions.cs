
using System.ComponentModel.DataAnnotations.Schema;

namespace TenQuestApi.Data
{
    public class Questions
    {
        public int Id { get; set; }
        public string Text { get; set; } = string.Empty;
        public bool HasBeenAsked { get; set; }
        [ForeignKey("Quiz")]
        public int QuizId { get; set; }
        public Quiz Quiz { get; set; } = null!;
        public List<Answer> Answers { get; set; } = new();
        public int? CorrectAnswerId { get; set; }


    }
}