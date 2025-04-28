
using System.ComponentModel.DataAnnotations.Schema;

namespace TenQuestApi.Models
{
    public class Questions
    {
        public int Id { get; set; } 
        public string Text { get; set; } = string.Empty;
        [ForeignKey("Quiz")]
        public int QuizId { get; set; }
        public Quiz Quiz { get; set; } = null!;
        public List<Answer> Answers { get; set; } = new();
        public int CorrectAnswerIndex { get; set; }
        public bool HasBeenAsked { get; set; }


    }
}