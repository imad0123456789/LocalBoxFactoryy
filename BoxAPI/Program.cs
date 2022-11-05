using AutoMapper;
using BoxAPI.DTOs;
using Entities;
using Infrastructure;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

var config = new MapperConfiguration(conf =>
{
    conf.CreateMap<PostProductDTO, Box>();
});

var mapper = config.CreateMapper();
builder.Services.AddSingleton(mapper);
builder.Services.AddCors();
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
// connect DataBase
builder.Services.AddDbContext<BoxDbContext>(options => options.UseSqlite(
    "Data source = db.db"
)); 

//
builder.Services.AddScoped<BoxRepository>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
    app.UseCors(options =>
    {
        options.AllowAnyHeader();
        options.AllowAnyMethod();
        options.AllowCredentials();
    });
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
