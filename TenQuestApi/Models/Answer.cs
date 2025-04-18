using System.ComponentModel.DataAnnotations.Schema;

namespace TenQuestApi.Models
{
    public class Answer 
    {
        public int Id { get; set; }
        [ForeignKey("Question")]
        public int QuestionId { get; set; }
        public Questions Questions { get; set; } = null!;
        public string Text { get; set; } = string.Empty;
        

    }
}