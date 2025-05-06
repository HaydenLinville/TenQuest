using Azure;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TenQuestApi.Data;
using TenQuestApi.Models;
using TenQuestApi.Services;


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
    public async Task<ActionResult<IEnumerable<Quiz>>> GetQuizzes()
    {

        return await _context.Quizzes.ToListAsync();
        // IEnumerable<Quiz> quizzes = _context.Quizzes.ToList<Quiz>();
        // return quizzes;

    }
    [HttpGet("GetQuiz/{id}")]
    public async Task<ActionResult> GetQuiz(int id)
    {
        var serv = CreateQuizService();
        var quiz = await serv.GetQuizAsync(id);
        // var quiz = await _context.Quizzes.FindAsync(id);
        if (quiz != null)
        {
            return Ok(quiz);

        }
        else
        {
            return NotFound(id);
        }
    }


    [HttpPost("AddQuiz")]
    public async Task<IActionResult> AddQuiz(CreateQuiz createQuiz)
    {

        if (createQuiz.Questions.Count != 10)
            return BadRequest("A quiz must contain exactly 10 questions.");

        foreach (var question in createQuiz.Questions)
        {
            if (question.Answers.Count != 4)
                return BadRequest("Each question must have exactly 4 answers.");
        }
        var serv = CreateQuizService();
        var changesSaved = await serv.CreateQuiz(createQuiz);

        if (changesSaved)
        {
            return Ok();

        }
        throw new Exception("Failed to add Quiz");
    }


    [HttpPatch("UpdateQuiz")]
    public async Task<IActionResult> UpdateQuiz([FromBody] UpdateQuiz updatedQuiz)
    {
        if (updatedQuiz == null) return BadRequest("Quiz is null.");
        var serv = CreateQuizService();
        var result = await serv.UpdateQuizAsync(updatedQuiz);
        if (!result.Success)
        {
            return NotFound(result.Message);
        }
        return NoContent();
    }

    //FindAsync(id);
    // _context.Quizzes.Remove(quiz);
    // await _context.SaveChangesAsync();

    // return quiz;
    [HttpDelete("DeleteQuiz/{id}")]
    public async Task<ActionResult<Quiz>> DeleteQuiz(int id)
    {
        var quiz = await _context.Quizzes.Include(q => q.Questions).ThenInclude(q => q.Answers).FirstOrDefaultAsync(q => q.Id == id);
        if (quiz == null)
        {
            return NotFound();
        }
        // Delete all answers first
        foreach (var question in quiz.Questions)
        {
            _context.Answers.RemoveRange(question.Answers);
        }

        // Then delete all questions
        _context.Questions.RemoveRange(quiz.Questions);

        // Then delete the quiz
        _context.Quizzes.Remove(quiz);

        await _context.SaveChangesAsync();

        return NoContent();

    }
    private QuizServices CreateQuizService()
    {
        var service = new QuizServices(_context);
        return service;
    }

}



//public int Id { get; set; }
// public Category Catagory { get; set; }
// public string? Title { get; set; }