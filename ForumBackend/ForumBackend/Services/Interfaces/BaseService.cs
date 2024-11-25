namespace ForumBackend.Services.Interfaces
{
    public abstract class BaseService<T> where T : class
    {
        protected abstract Task<IEnumerable<T>> GetAll();
        protected abstract Task<T?> Get(int id);
        protected abstract Task<T> Create(T entity);
        protected abstract Task Update(int id, T entity);
        protected abstract Task Delete(int id);
    }
}
