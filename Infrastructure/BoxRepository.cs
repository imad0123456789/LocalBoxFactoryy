using Entities;

namespace Infrastructure;

public class BoxRepository
{
    private BoxDbContext _boxContext; // instance variable 

    public BoxRepository(BoxDbContext context)
    {
        _boxContext = context; 
    }

    public List<Box> GetAllBoxes()
    {
        return _boxContext.BoxTable.ToList();
    }

    public Box AddBox(Box box)
    {
        _boxContext.BoxTable.Add(box);
        _boxContext.SaveChanges();
        return box;
    }

    public Box UpdateBox(Box box)
    {
        _boxContext.BoxTable.Update(box);
        _boxContext.SaveChanges();
        return box; 
    }

    public Box DeleteBox(int id)
    {
        Box box = GetBoxId(id);
        _boxContext.BoxTable.Remove(box);
        _boxContext.SaveChanges();
        return box; 
        
    }

    
    public Box GetBoxId(int BoxId)
    {
        Box box = _boxContext.BoxTable.Find(BoxId);
        return box; 
        
    }
    public void CreateDB()
    {
        _boxContext.Database.EnsureDeleted();
        _boxContext.Database.EnsureCreated();
        
    }
}