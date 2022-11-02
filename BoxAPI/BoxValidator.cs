using BoxAPI.DTOs;
using Entities;
using FluentValidation;

namespace BoxAPI;

public class BoxValidator : AbstractValidator<PostProductDTO>
{

    public BoxValidator()
    {
        RuleFor(p => p.Price).GreaterThan(0);
        RuleFor(p => p.Height).GreaterThan(0);
        RuleFor(p => p.Height).LessThan(20);
        
        RuleFor(p => p.Lenght).GreaterThan(0);
        RuleFor(p => p.Lenght).LessThan(20);
        
        RuleFor(p => p.Width).GreaterThan(0);
        RuleFor(p => p.Width).LessThan(20);
        
        RuleFor(p => p.Name).NotEmpty();
        RuleFor(p => p.Color).NotEmpty();
        RuleFor(p => p.Type).NotEmpty();
        
        
    }
}