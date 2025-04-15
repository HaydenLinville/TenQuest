namespace TenQuestApi.Models
{
    public enum Category { PopCulture, History, Science, Literature, Geography, Music, VideoGames, FoodDrink, Sports }
    public class Quiz
    {
        public int Id { get; set; }
        public Category Catagory { get; set; }
        public string? Title { get; set; }
        public List<Questions>? Questions { get; set; }

    }
}