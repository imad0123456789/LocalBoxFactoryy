using AutoMapper;
using BoxAPI.DTOs;
using Entities;
using Infrastructure;
using Microsoft.AspNetCore.Mvc;

namespace BoxAPI.Controllers;

[ApiController]
[Route("[Controller]")]
public class BoxController : ControllerBase
{
    //Read and write in DataBase

    private BoxRepository _boxRepository;

    //private BoxValidator _boxValidator;
    private IMapper _mapper;

    public BoxController(BoxRepository repository, IMapper mapper)
    {
        _boxRepository = repository;
        // _boxValidator = new BoxValidator();
        _mapper = mapper;
    }


    [HttpGet]
    [Route("GetBox")]
    public List<Box> GetBoxes()
    {
        return _boxRepository.GetAllBoxes();
    }


    [HttpGet]
    [Route("GetBoxId")]
    public ActionResult<Box> GetBoxId(int boxId)
    {
        return _boxRepository.GetBoxId(boxId);
    }


    [HttpPost]
    [Route("CreateNewBox")]
    public IActionResult CreateNewBox(PostProductDTO dto)
    {
        BoxValidator validator = new BoxValidator();
        var validation = validator.Validate(dto);
        if (validation.IsValid)
        {
            Box box = _mapper.Map<Box>(dto);
            return Ok(_boxRepository.AddBox(box));
        }

        return BadRequest(validation.ToString());
    }

    [HttpPost]
    [Route("UpdateBox")]
    public IActionResult UpdateBox(PostProductDTO dto)
    {
        BoxValidator validator = new BoxValidator();
        var validation = validator.Validate(dto);
        if (validation.IsValid)
        {
            Box box = _mapper.Map<Box>(dto);
            return Ok(_boxRepository.UpdateBox(box));
        }

        return BadRequest(validation.ToString());
    }

    [HttpPost]
    [Route("DeleteBox")]
    public IActionResult DeleteBox(PostProductDTO dto, int boxId)
    {
        Box box = _mapper.Map<Box>(dto);
        return Ok(_boxRepository.DeleteBox(boxId));
    }


    [HttpGet]
    [Route("CreateDB")]
    public string CreateDB()
    {
        _boxRepository.CreateDB();
        return "Db has been created";
    }
}