import { useEffect, useState } from "react";

function AddProject({
  project = {},
  onSave = () => {},
  editing = false,
  githubErrorMessage = "",
}) {
  const [isEditing, setIsEditing] = useState(editing);
  const [title, setTitle] = useState(project.title || "");
  const [description, setDescription] = useState(project.description || "");
  const [owner, setOwner] = useState(project.owner || "");
  const [githubRepoUrl, setGithubRepoUrl] = useState(
    project.githubRepoUrl || ""
  );
  const [descriptionErrorMessage, setDescriptionErrorMessage] = useState("");
  const [titleErrorMessage, setTitleErrorMessage] = useState("");
  const [githubErrorMessageState, setGithubErrorMessage] = useState("");

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("user"));

    setTitle(project.title || "");
    setDescription(project.description || "");
    setOwner(project.owner || user?.userId || "");
    setGithubRepoUrl(project.githubRepoUrl || "");
  }, [project]);

  const validate = () => {
    let isValid = true;

    setDescriptionErrorMessage("");
    setTitleErrorMessage("");

    if (!title.trim()) {
      setTitleErrorMessage("Title is required.");
      isValid = false;
    } else if (!description.trim()) {
      setDescriptionErrorMessage("Description is required.");
      isValid = false;
    } else if (!githubRepoUrl.trim()) {
      setGithubErrorMessage("GitHub Repository URL is required.");
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    const payload = {
      ...project,
      title: title.trim(),
      description: description.trim(),
      owner,
      githubRepoUrl: githubRepoUrl.trim(),
    };

    onSave(payload);

    if (!project.id) {
      setTitle("");
      setDescription("");
      setGithubRepoUrl("");
    } else {
      setIsEditing(true);
    }
  };

  return (
    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm bg-gray-800 p-4">
      <h2 className="text-white text-center">
        {project.id && isEditing ? "Edit Project" : "Add New Project"}
      </h2>
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
            <p className="text-red-500 text-sm">{titleErrorMessage}</p>
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
            <p className="text-red-500 text-sm">{descriptionErrorMessage}</p>
          </div>
        </div>

        <div className="hidden">
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
              value={owner._id || owner}
              onChange={(e) => setOwner(e.target.value)}
              className="block w-full px-3 py-2 bg-white/5 text-base text-white outline-1 outline-offset-1 outline-white/10 rounded-md shadow-sm placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-500 focus:outline-offset-2 sm:text-sm/6"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="githubRepoUrl"
            className="text-left text-gray-100 block font-medium text-sm/6"
          >
            Github Repository URL
          </label>
          <div className="mt-2">
            <input
              id="githubRepoUrl"
              name="githubRepoUrl"
              type="text"
              data-testid="githubRepoUrl-input"
              placeholder="example: git@github.com:user/repo"
              value={githubRepoUrl}
              onChange={(e) => setGithubRepoUrl(e.target.value)}
              className="block w-full px-3 py-2 bg-white/5 text-base placeholder-sm text-white outline-1 outline-offset-1 outline-white/10 rounded-md shadow-sm placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-500 focus:outline-offset-2 sm:text-sm/6"
            />
            <p className="text-red-500 text-sm">{githubErrorMessage || githubErrorMessageState}</p>
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
  );
}
export default AddProject;
