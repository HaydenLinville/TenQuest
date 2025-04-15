using Microsoft.EntityFrameworkCore;
using TenQuestApi.Models;

namespace TenQuestApi.Data 
{

    public class QuizDbContext : DbContext
    {
        public QuizDbContext(DbContextOptions<QuizDbContext> options): base(options) {}
        public DbSet<Quiz> Quizzes{get; set;}
        // protected override void OnConfiguring(DbContextOptionsBuilder options)
        // {
        //     if(!options.IsConfigured){
        //         options.UseSqlServer("DefaultConnection", 
        //         options => options.EnableRetryOnFailure());
        //     }
        // }
 

        

    }

}