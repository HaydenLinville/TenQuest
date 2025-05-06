using System.ComponentModel.DataAnnotations.Schema;

namespace TenQuestApi.Data
{
    public class Answer
    {
        public int Id { get; set; }
        public string Text { get; set; } = string.Empty;
        [ForeignKey("Question")]
        public int QuestionId { get; set; }
        public Questions Question { get; set; } = null!;


    }
}