namespace TenQuestApi.Models
{

    public class UpdateQuestion
    {
        public int? Id { get; set; }
        public string Text { get; set; } = string.Empty;
        public List<UpdateAnswer> Answers { get; set; } = new();
        public int CorrectAnswerIndex { get; set; }
        public bool HasBeenAsked { get; set; }
    }
}