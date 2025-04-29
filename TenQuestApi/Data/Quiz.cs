namespace TenQuestApi.Data
{
    public enum Category { PopCulture, History, Science, Literature, Geography, Music, VideoGames, FoodDrink, Sports }
    public class Quiz
    {
        public int Id { get; set; }
        public Category Catagory { get; set; }
        public string Title { get; set; } = string.Empty;
        public List<Questions> Questions { get; set; } = new();

    }
}