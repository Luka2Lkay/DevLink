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
    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm bg-gray-800 p-4">
      <h2 className="text-white text-center">{project.id ? "Edit Project" : "Add New Project"}</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="title"
            className="text-left text-gray-100 block font-medium text-sm/6"
          >
            Title
          </label>
          <div className="mt-2">
            <input
              id="title"
              name="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              data-testid="title-input"
              className="block w-full px-3 py-2 bg-white/5 text-base text-white outline-1 -outline-offset-1 outline-white/10 rounded-md shadow-sm placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-500 focus:-outline-offset-2 sm:text-sm/6"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="description"
            className="text-left text-gray-100 block font-medium text-sm/6"
          >
            Description
          </label>
          <div className="mt-2">
            <input
              id="description"
              name="description"
              type="description"
              data-testid="description-input"
              value={description}
              onChange={(e) => setDescription(e.target.value)}

              className="block w-full px-3 py-2 bg-white/5 text-base text-white outline-1 outline-offset-1 outline-white/10 rounded-md shadow-sm placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-500 focus:outline-offset-2 sm:text-sm/6"
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            data-testid="submit-button"
            className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-2 text-sm/6 text-white font-semibold hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 "
          >
            Save Changes
          </button>
        </div>
        {/* <form onSubmit={handleSubmit}>
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
        </div> */}


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