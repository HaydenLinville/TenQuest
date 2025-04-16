
using TenQuestApi.Models;

namespace TenQuestApi.DTO

{

    public class QuizDto
    {
        public Category Catagory { get; set; } 
        public string Title { get; set; } = string.Empty;
        public List<QuestionDto> Questions { get; set; } = new();


    }
}