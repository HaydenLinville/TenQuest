
namespace TenQuestApi.DTO
{

    public class QuestionDto
    {
        public string Text { get; set; }  = string.Empty;
        public List<AnswerDto> Answers { get; set; }  = new();
        public int CorrectAnswerIndex { get; set; }
    }
}