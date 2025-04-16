
namespace TenQuestApi.DTO
{

    public class QuestionDto
    {
        public string Text { get; set; }  = string.Empty;
        public List<string> Answers { get; set; }  = new();
        public int CorrectAnswerIndex { get; set; }
    }
}