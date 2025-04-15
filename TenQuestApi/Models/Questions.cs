
namespace TenQuestApi.Models
{
    public class Questions 
    {
        public int Id { get; set; }
        public string? Text { get; set; }
        public List<Answer>? Answers { get; set; } 
        public Answer? CorrectAnswer { get; set; }
        public bool HasBeenAsked { get; set; }


    }
}