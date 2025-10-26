import { useEffect, useState } from "react";

function AddProject({ project = {}, onSave = () => { } }) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(project.title || "");
  const [description, setDescription] = useState(project.description || "");

  useEffect(() => {
    setTitle(project.title || "");
    setDescription(project.description || "");
  }, [project]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedTitle = title.trim();
    const trimmedDescription = description.trim();

    if (!trimmedDescription || !trimmedTitle) {
      alert("Title and description cannot be empty.");
      return;
    }

    const payload = {
      ...project,
      title: trimmedTitle,
      description: trimmedDescription,
    };

    onSave(payload);

    if (!project.id) {
      setTitle("");
      setDescription("");
    } else {

      setIsEditing(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>{project.id ? (isEditing ? "Edit Project" : "Project") : "Add New Project"}</h2>
        <label htmlFor="title">Title</label>
        <input id="title" type="text" name="title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <br />
        <label htmlFor="description">description</label>
        <input id="description" type="text" name="description" value={description} onChange={(e) => setDescription(e.target.value)} />
        <br />
        <div className="flex">
          <button type="submit">Save Changes</button>
          <button type="button" className="text-red-500" onClick={() => {setIsEditing(false); setTitle(project.title || ""); setDescription(project.description || ""); }}>Cancel</button>
        </div>


        {/* <br /> */}

        {/* <div>
          {project.id && !isEditing ? (
            <>
              <button type="button" onClick={() => setIsEditing(true)}>Edit</button>
            </>
          ) : (
            <>
              <button type="submit">{project.id ? "Save Changes" : "Create Project"}</button>
              {project.id && (
                
              )}

            </>
          )}
        </div> */}
      </form>
    </div>

  )
}
export default AddProject