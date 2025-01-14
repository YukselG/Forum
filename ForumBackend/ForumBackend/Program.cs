using ForumBackend.Data;
using ForumBackend.Services.Implementations;
using ForumBackend.Services.Interfaces;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Text.Json.Serialization;
using ForumBackend.Models;
using dotenv.net;
using Microsoft.AspNetCore.Authorization;
using Microsoft.OpenApi.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using ForumBackend.Services.HelperServices;


var builder = WebApplication.CreateBuilder(args);

DotEnv.Load();

string dbUser = Environment.GetEnvironmentVariable("DB_USER");
string dbServer = Environment.GetEnvironmentVariable("DB_SERVER");
string dbName = Environment.GetEnvironmentVariable("DB_NAME");
string dbPassword = Environment.GetEnvironmentVariable("DB_PASSWORD");
// string key = Environment.GetEnvironmentVariable("JWT_SECRET");

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


// Activate Identity APIs
builder.Services.AddIdentityApiEndpoints<User>().AddRoles<Role>().AddEntityFrameworkStores<ForumContext>().AddUserManager<CustomUserManager>();
//builder.Services.AddIdentityCore<User>().AddRoles<User>().AddEntityFrameworkStores<ForumContext>();

/*
// Configuration of JWT Bearer authentication -- requires generating JWT tokens manually
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = "forum-backend",
        ValidAudience = "forum-frontend",
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(key))
    };

    options.Events = new JwtBearerEvents
    {
        OnAuthenticationFailed = context =>
        {
            // Sanitize the exception message by replacing invalid characters
            var sanitizedMessage = new string(context.Exception.Message.Where(c => !char.IsControl(c)).ToArray());

            // Add the sanitized message to the header
            context.Response.Headers.Add("Authentication-Failure", sanitizedMessage);
            return Task.CompletedTask;
        }
    };
});
*/

// Add authorization
builder.Services.AddAuthorization(options =>
{
    // "The fallback authorization policy requires all users to be authenticated, except for Razor Pages, controllers, or action methods with an authorization attribute. 
    // For example, Razor Pages, controllers, or action methods with [AllowAnonymous] or [Authorize(PolicyName="MyPolicy")] use the applied authorization attribute rather than the fallback authorization policy."
    options.FallbackPolicy = new AuthorizationPolicyBuilder().RequireAuthenticatedUser().Build();
});

// the below for circular references, probably use dtos instead. When returning DTO, an infinite serilization loop wont happen
/*builder.Services.AddControllers().AddJsonOptions(x =>
    x.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.Preserve);*/
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
{
    options.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Description = "Authorization header using the Identity Bearer scheme. Example: 'Bearer {token}'",
        Name = "Authorization",
        In = ParameterLocation.Header,
        Type = SecuritySchemeType.ApiKey
    });

    options.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                }
            },
            new string[] { }
        }
    });
});
// in-memory database for test purposes
//builder.Services.AddDbContext<ForumContext>(options => options.UseInMemoryDatabase("forumTest"));
builder.Services.AddDbContext<ForumContext>(options => options.UseSqlServer(connectionString));
builder.Services.AddScoped<ICategoriesService, CategoriesService>();
builder.Services.AddScoped<IPostsService, PostsService>();
builder.Services.AddScoped<ICommentsService, CommentsService>();
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<DatabaseSeederService>();


var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var seeder = scope.ServiceProvider.GetRequiredService<DatabaseSeederService>();
    await seeder.SeedRolesAsync();
}

app.MapIdentityApi<User>().AllowAnonymous();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors("AllowReactForumFrontend");

app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

app.Run();
