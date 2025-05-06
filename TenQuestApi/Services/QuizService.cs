using System.Threading.Tasks;
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


        public async Task<GetQuiz> GetQuizAsync(int id)
        {
            var enity = await _context.Quizzes.Include(q => q.Questions).ThenInclude(q => q.Answers).SingleOrDefaultAsync(q => q.Id == id);
            if (enity == null) return null;
            var quiz = new GetQuiz
            {
                Id = enity.Id,
                Title = enity.Title,
                Category = (int)enity.Catagory,
                Questions = enity.Questions.Select(q => new GetQuestion
                {
                    Id = q.Id,
                    Text = q.Text,
                    HasBeenAsked = q.HasBeenAsked,
                    CorrectAnswer = q.Answers.Where(a => a.Id == q.CorrectAnswerId).Select(a => new GetAnswer
                    {
                        Id = a.Id,
                        Answer = a.Text
                    }).FirstOrDefault(),
                    Answers = q.Answers.Select(a => new GetAnswer
                    {
                        Id = a.Id,
                        Answer = a.Text
                    }).ToList(),
                }).ToList()
            };
            return quiz;
        }
        public async Task<bool> CreateQuiz(CreateQuiz createQuiz)
        {
            var quiz = new Quiz()
            {

                Title = createQuiz.Title,
                Catagory = (Category)createQuiz.Category,
                Questions = new List<Questions>()
            };

            foreach (var q in createQuiz.Questions)
            {
                var question = new Questions
                {
                    Text = q.Text,
                    HasBeenAsked = false,
                    Answers = new List<Answer>()
                };
                // quiz.Questions.Add(question);

                foreach (var a in q.Answers)
                {
                    question.Answers.Add(new Answer
                    {
                        Text = a.Text
                    });
                }
                quiz.Questions.Add(question);
            }

            _context.Quizzes.Add(quiz);
            await _context.SaveChangesAsync();

            foreach (var quest in createQuiz.Questions.Select((q, i) => new { q, i }))
            {
                var question = quiz.Questions[quest.i];
                var correctAnswerIndex = quest.q.CorrectAnswerIndex;
                if (correctAnswerIndex >= 0 && correctAnswerIndex < question.Answers.Count)
                {
                    question.CorrectAnswerId = question.Answers[correctAnswerIndex].Id;
                }

            }
            var answer = await _context.SaveChangesAsync() > 0;
            if (answer)
            {
                return true;
            }
            return false;

            // Catagory = (Category)createQuiz.Category,
            // Title = createQuiz.Title,
            // Questions = [.. createQuiz.Questions.Select(q => {

            // var answers = q.Answers.Select(a=> new Answer{
            //     Text = a.Text,
            // }).ToList();
            // var correctAnswerId = answers.First().Id;
            // return new Questions{

            // Text = q.Text,
            // Answers = answers,
            // CorrectAnswerId = correctAnswerId

        }

        //    })]
        //             };
        // _context.Add(quiz);
        // return _context.SaveChanges() > 0;


        //         }


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

            existingQuiz.Title = updatedQuiz.Title;
            existingQuiz.Catagory = updatedQuiz.Category;

            foreach (var question in updatedQuiz.Questions)
            {
                var existingQuestion = existingQuiz.Questions.FirstOrDefault(q => q.Id == question.Id);

                if (existingQuestion != null)
                {
                    existingQuestion.Text = question.Text;
                    existingQuestion.HasBeenAsked = question.HasBeenAsked;
                    //existingQuestion.CorrectAnswerId = question.c

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