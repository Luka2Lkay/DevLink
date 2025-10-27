import { useEffect, useState } from "react";

function AddProject({ project = {}, onSave = () => { }, editing = false }) {
  const [isEditing, setIsEditing] = useState(editing);  // New state to track if we are in editing mode but not used currently
  const [title, setTitle] = useState(project.title || "");
  const [description, setDescription] = useState(project.description || "");
  const [owner, setOwner] = useState(project.owner || "");
  const [githubRepoUrl, setGithubRepoUrl] = useState(project.githubRepoUrl || "");

  useEffect(() => {
    setTitle(project.title || "");
    setDescription(project.description || "");
    setOwner(project.owner || "");
    setGithubRepoUrl(project.githubRepoUrl || "");
  }, [project]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedTitle = title.trim();
    const trimmedDescription = description.trim();
    const trimmedOwner = owner.trim();
    const trimmedGithubRepoUrl = githubRepoUrl.trim();

    if (!trimmedDescription || !trimmedTitle || !trimmedOwner || !trimmedGithubRepoUrl) {
      alert("Fileds cannot be empty.");
      return;
    }

    const payload = {
      ...project,
      title: trimmedTitle,
      description: trimmedDescription,
      owner: trimmedOwner,
      githubRepoUrl: trimmedGithubRepoUrl,
    };

    onSave(payload);

    if (!project.id) {
      setTitle("");
      setDescription("");
      setGithubRepoUrl("");
    } else {
setOwner("hello")
      setIsEditing(true); // This line is not currently necessary since we are not using isEditing state
    }
  };

  return (
    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm bg-gray-800 p-4">
      <h2 className="text-white text-center">{project.id && isEditing? "Edit Project" : "Add New Project"}</h2>
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
              type="text"
              data-testid="description-input"
              value={description}
              onChange={(e) => setDescription(e.target.value)}

              className="block w-full px-3 py-2 bg-white/5 text-base text-white outline-1 outline-offset-1 outline-white/10 rounded-md shadow-sm placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-500 focus:outline-offset-2 sm:text-sm/6"
            />
          </div>
        </div>
        
        <div>
          <label
            htmlFor="owner"
            className="text-left text-gray-100 block font-medium text-sm/6"
          >
            Owner
          </label>
          <div className="mt-2">
            <input
              id="owner"
              name="owner"
              type="text"
              data-testid="owner-input"
              value={owner}
              onChange={(e) => setOwner(e.target.value)}

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
      </form>
    </div>

  )
}
export default AddProject