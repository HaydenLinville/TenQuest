namespace TenQuestApi.Models
{

    public class QuestionFull
    {
        public string Text { get; set; } = string.Empty;
        public List<AnswerDefault> Answers { get; set; } = new();
        public int CorrectAnswerIndex { get; set; }
        public bool HasBeenAsked { get; set; }
    }
}