import { useEffect, useState } from "react";
import Project from "../project/Project";
import AddProject from "../add_project/AddProject.jsx";
import { useDispatch, useSelector } from "react-redux";
import { fetchProjectsThunk, updateProjectThunk } from "../../state/thunk/project_thunk.js";
import { selectProjects, selectCurrentProject, setCurrentProject } from "../../state/reducers/project_slice.js";
import { Link } from "react-router-dom";

function Feed() {
  const dispatch = useDispatch();

  const projects = useSelector(selectProjects);
  const currentProject = useSelector(selectCurrentProject);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    dispatch(fetchProjectsThunk());
  }, [dispatch]);

  const handleEditClick = (project) => {
    dispatch(setCurrentProject(project));
    setShowForm(true);
  }

  const handleSave = async (payload) => {
    try {
      if (payload.id) {
        await dispatch(updateProjectThunk(payload));
        await dispatch(fetchProjectsThunk());
      } else {
        // New project, add logic
        // dispatch(addProjectThunk(payload));
      }
      setShowForm(false);
      dispatch(setCurrentProject(null));
    } catch (error) {
      console.error("Failed to update project:", error.message);
    }
  }

  return (
    <div>

      <div className="flex justify-end text-red-500 mb-2">
        <Link to={"/"} onClick={() => sessionStorage.clear()}>Logout</Link>
      </div>

      <p className="text-white mb-4">Welcome to your project dashboard! Here you can find all your projects and collaborate with your team.</p>

      {showForm && (
        <div className="mb-4 p-4 border border-gray-300 rounded-lg bg-white">
          <AddProject project={currentProject || {}} onSave={handleSave} />
        </div>)}

      {projects.length === 0 ? (
        <p className="text-white">No projects available.</p>
      ) : (
        projects.map((project) => (
          <Project key={project.id} project={project} handleClick={() => handleEditClick(project)} />
        ))
      )
      }
    </div>
  );
}

export default Feed;
