using ForumBackend.Data;
using ForumBackend.Services.Implementations;
using ForumBackend.Services.Interfaces;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Text.Json.Serialization;
using ForumBackend.Models;
using dotenv.net;


var builder = WebApplication.CreateBuilder(args);

DotEnv.Load();

string dbUser = Environment.GetEnvironmentVariable("DB_USER");
string dbServer = Environment.GetEnvironmentVariable("DB_SERVER");
string dbName = Environment.GetEnvironmentVariable("DB_NAME");
string dbPassword = Environment.GetEnvironmentVariable("DB_PASSWORD");

string connectionString = $"Server={dbServer};Database={dbName};User ID={dbUser};Password={dbPassword};TrustServerCertificate=True;";

//builder.Configuration["ConnectionStrings:ForumDatabase"] = connectionString;

// Add services to the container.
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactForumFrontend",
        policy =>
        {
            policy.WithOrigins("http://localhost:3000").AllowAnyHeader();
        });
});

builder.Services.AddControllers();

// Add authorization
builder.Services.AddAuthorization();
// Activate Identity APIs
builder.Services.AddIdentityApiEndpoints<User>().AddEntityFrameworkStores<ForumContext>();
builder.Services.AddIdentityCore<User>().AddEntityFrameworkStores<ForumContext>();

// the below for circular references, probably use dtos instead. When returning DTO, an infinite serilization loop wont happen
/*builder.Services.AddControllers().AddJsonOptions(x =>
    x.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.Preserve);*/
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
// in-memory database for test purposes
//builder.Services.AddDbContext<ForumContext>(options => options.UseInMemoryDatabase("forumTest"));
builder.Services.AddDbContext<ForumContext>(options => options.UseSqlServer(connectionString));
builder.Services.AddScoped<ICategoriesService, CategoriesService>();
builder.Services.AddScoped<IPostsService, PostsService>();
builder.Services.AddScoped<ICommentsService, CommentsService>();
builder.Services.AddScoped<IUserService, UserService>();


var app = builder.Build();
app.MapIdentityApi<User>();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors("AllowReactForumFrontend");

app.UseAuthorization();

app.MapControllers();

app.Run();
