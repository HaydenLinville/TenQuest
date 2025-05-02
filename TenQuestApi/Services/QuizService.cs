using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using TenQuestApi.Data;
using TenQuestApi.Models;

namespace TenQuestApi.Services
{

    public class QuizServices
    {
        private readonly QuizDbContext _context;

        public QuizServices(QuizDbContext context)
        {
            _context = context;

        }


        public async Task<FullQuiz> GetQuizAsync(int id)
        {
            var enity = await _context.Quizzes.Include(q => q.Questions).ThenInclude(q => q.Answers).SingleOrDefaultAsync(q => q.Id == id);
            if (enity == null) return null;
            var quiz = new FullQuiz
            {
                id = enity.Id,
                Title = enity.Title,
                Category = (int)enity.Catagory,
                Questions = enity.Questions.Select(q => new QuestionFull
                {
                    Id = q.Id,
                    Text = q.Text,
                    CorrectAnswerIndex = q.CorrectAnswerIndex,
                    HasBeenAsked = q.HasBeenAsked,
                    Answers = q.Answers.Select(a => new AnswerDefault
                    {
                        Id = a.Id,
                        Answer = a.Text
                    }).ToList(),
                }).ToList()
            };
            return quiz;
        }
    

        public async Task<(bool Success, string Message, Quiz UpdatedQuiz)> UpdateQuizAsync(UpdateQuiz updatedQuiz)
        {
            var existingQuiz = await _context.Quizzes
                .Include(q => q.Questions)
                    .ThenInclude(q => q.Answers)
                .FirstOrDefaultAsync(q => q.Id == updatedQuiz.Id);

            if (existingQuiz == null)
            {
                return (false, $"Quiz with ID {updatedQuiz.Id} not found.", null);
            }

            // Update top-level fields
            existingQuiz.Title = updatedQuiz.Title;
            existingQuiz.Catagory = updatedQuiz.Category;
            Console.WriteLine($"Found {existingQuiz.Questions.Count} Questions in DB.");

            foreach (var question in updatedQuiz.Questions)
            {
                Console.WriteLine($"QuestionId: {question.Id}");
                var existingQuestion = existingQuiz.Questions.FirstOrDefault(q => q.Id == question.Id);

                if (existingQuestion != null)
                {
                    existingQuestion.Text = question.Text;
                    existingQuestion.CorrectAnswerIndex = question.CorrectAnswerIndex;
                    existingQuestion.HasBeenAsked = question.HasBeenAsked;

                    foreach (var answer in question.Answers)
                    {
                        var existingAnswer = existingQuestion.Answers.FirstOrDefault(a => a.Id == answer.Id);
                        if (existingAnswer != null)
                        {
                            existingAnswer.Text = answer.Answer;
                        }
                    }
                }
            }

            await _context.SaveChangesAsync();
            return (true, "Updated successfully", existingQuiz);
        }

    }
}