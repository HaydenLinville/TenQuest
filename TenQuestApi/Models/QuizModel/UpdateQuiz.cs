using TenQuestApi.Data;

namespace TenQuestApi.Models

{

    public class UpdateQuiz
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public Category Category { get; set; }
        public List<UpdateQuestion> Questions { get; set; } = new();


    }
}