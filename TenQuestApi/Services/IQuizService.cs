
using TenQuestApi.Data;
using TenQuestApi.Models;

namespace TenQuestApi.Services
{

    public interface IQuizService
    {
        Task<(bool Success, string Message, GetQuiz? Quiz)> GetQuizAsync(int id);
        Task<(bool Success, string Message, Quiz? UpdatedQuiz)> UpdateQuizAsync(Quiz updatedQuiz);
    }
}