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
        var quiz = new Quiz()
        {
            Catagory = quizDto.Catagory,
            Title = quizDto.Title
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