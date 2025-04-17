using Microsoft.AspNetCore.Mvc;
using TenQuestApi.Data;
using TenQuestApi.DTO;
using TenQuestApi.Models;

namespace TenQuestApi.Controllers;

[ApiController]
[Route("[controller]")]
public class QuizController : ControllerBase
{
    private readonly QuizDbContext _context;
    public QuizController(QuizDbContext context)
    {
        _context = context;

    }

    [HttpGet("GetQuizzes")]
    //IActionResult
    public IEnumerable<Quiz> GetQuizzes()
    {
        IEnumerable<Quiz> quizzes = _context.Quizzes.ToList<Quiz>();
        return quizzes;

    }

    [HttpPost("AddQuiz")]
    public IActionResult AddQuiz(QuizDto quizDto)
    {

        if (quizDto.Questions.Count != 10)
            return BadRequest("A quiz must contain exactly 10 questions.");

        foreach (var question in quizDto.Questions)
        {
            if (question.Answers.Count != 4)
                return BadRequest("Each question must have exactly 4 answers.");
            if (question.CorrectAnswerIndex < 0 || question.CorrectAnswerIndex > 3)
                return BadRequest("CorrectAnswerIndex must be between 0 and 3.");
        }


        var quiz = new Quiz()
        {
            Catagory = (Category)quizDto.Category,
            Title = quizDto.Title,
            Questions = [.. quizDto.Questions.Select(q => new Questions
            {
                Text = q.Text,
                Answers = [.. q.Answers.Select(a => new Answer
                {
                    Text = a
                })],
                CorrectAnswerIndex = q.CorrectAnswerIndex,
                HasBeenAsked = false
            })]
        };

        _context.Add(quiz);
        if (_context.SaveChanges() > 0)
        {
            return Ok();

        }
        throw new Exception("Failed to add Quiz");
    }
}

//public int Id { get; set; }
// public Category Catagory { get; set; }
// public string? Title { get; set; }