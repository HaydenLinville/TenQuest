namespace TenQuestApi.Models
{

    public class GetQuestion
    {
        public int Id { get; set; }
        public string Text { get; set; } = string.Empty;
        public List<GetAnswer> Answers { get; set; } = new();
        public GetAnswer CorrectAnswer { get; set; } = null!;
        public bool HasBeenAsked { get; set; }
    }
}