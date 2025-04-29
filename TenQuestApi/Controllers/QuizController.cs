using Azure;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TenQuestApi.Data;
using TenQuestApi.Models;
using TenQuestApi.Data;
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
    public ActionResult<FullQuiz> GetQuiz(int id)
    {
        var serv = CreateQuizService();
        var quiz = serv.GetQuizById(id);
        // var quiz = await _context.Quizzes.FindAsync(id);
        if (quiz != null)
        {
            return quiz;

        }
        else
        {
            return NotFound(id);
        }
    }

    [HttpPost("AddQuiz")]
    public IActionResult AddQuiz(QuizDefault quizDto)
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
                    Text = a.Answer
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
    [HttpPatch("{id}")]
    public async Task<IActionResult> PatchQuiz(string id, [FromBody] JsonPatchDocument<Quiz> patchDoc)
    {
        if (patchDoc == null)
        {
            return BadRequest();
        }
        var quizEntity = await _context.Quizzes.FindAsync(id);

        if (quizEntity == null)
        {
            return NotFound();
        }

        //var quizToPatch =

        patchDoc.ApplyTo(quizEntity, ModelState);
        if (!TryValidateModel(quizEntity))
        {
            return BadRequest(ModelState);
        }
        await _context.SaveChangesAsync();

        return Ok(quizEntity);
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
    private QuizServices CreateQuizService(){
        var service = new QuizServices();
        return service;
    }

}



//public int Id { get; set; }
// public Category Catagory { get; set; }
// public string? Title { get; set; }