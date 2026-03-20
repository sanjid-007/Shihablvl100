using Shihablvl100.Infrastructure.Data;
using Shihablvl100.Application.Interfaces;
using Shihablvl100.Infrastructure.Repositories;
using Shihablvl100.Application.Services;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDbContext<AppDbContext>(options => options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));
builder.Services.AddScoped<ICategoryRepository, CategoryRepository>();
builder.Services.AddScoped<IContentRepository, ContentRepository>();
builder.Services.AddScoped<CategoryService>();
builder.Services.AddScoped<ContentService>();
builder.Services.AddControllers();
var app = builder.Build();
app.MapControllers();
app.Run();