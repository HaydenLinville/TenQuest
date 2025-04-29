using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using TenQuestApi.Data;
using TenQuestApi.Models;

namespace TenQuestApi.Services
{

    public class QuizServices
    {
        private readonly QuizDbContext _context;
        public QuizServices(){
            
        }
        public QuizServices(QuizDbContext context)
        {
            _context = context;

        }


        public FullQuiz GetQuizById(int id)
        {
            var enity = _context.Quizzes.Single(q => q.Id ==id);

            var quiz = new FullQuiz{
                id = enity.Id,
                Title = enity.Title,
                Category = (int) enity.Catagory,
                Questions = enity.Questions.Select(q => new QuestionFull{
                    Text = q.Text,
                    CorrectAnswerIndex = q.CorrectAnswerIndex,
                    HasBeenAsked = q.HasBeenAsked,
                    Answers = q.Answers.Select(a=> new AnswerDefault{
                        Answer = a.Text
                    }).ToList(),
                }).ToList()
            };
            return quiz;
        }



    }
}