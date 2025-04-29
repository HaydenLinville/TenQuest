
namespace TenQuestApi.Models
{

    public class QuestionDefault
    {
        public string Text { get; set; }  = string.Empty;
        public List<AnswerDefault> Answers { get; set; }  = new();
        public int CorrectAnswerIndex { get; set; }
    }
}