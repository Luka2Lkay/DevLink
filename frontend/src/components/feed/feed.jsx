import { useEffect, useState } from "react";
import Project from "../project/Project";
import AddProject from "../add_project/AddProject.jsx";
import { useDispatch, useSelector } from "react-redux";
import { fetchProjectsThunk, updateProjectThunk, deleteProjectThunk, addProjectThunk } from "../../state/thunk/project_thunk.js";
import { selectProjects, selectCurrentProject, selectLoading, setCurrentProject, addProject, removeProject, updateProject } from "../../state/reducers/project_slice.js";
import { Link } from "react-router-dom";
import Modal from "@mui/material/Modal";
import CircularProgress from "@mui/material/CircularProgress";

function Feed() {
  const dispatch = useDispatch();

  const projects = useSelector(selectProjects);
  const currentProject = useSelector(selectCurrentProject);
  const loading = useSelector(selectLoading);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    dispatch(fetchProjectsThunk());
  }, [dispatch]);

  const handleEditClick = (project) => {
    dispatch(setCurrentProject(project));
    setIsEditing(true);
    setModalOpen(true);
  }

  const handleDeleteClick = (project) => {
    dispatch(setCurrentProject(project));
    setDeleteConfirmationOpen(true);
  }

  const handleAddClick = () => {
    setModalOpen(true);
    setIsEditing(false);
    dispatch(setCurrentProject(null));
  };

  const handleSave = async (project) => {
    try {
      if (project.id) {
        await dispatch(updateProjectThunk(project));
        await dispatch(updateProject(project));
        await dispatch(fetchProjectsThunk());

      } else {
        await dispatch(addProjectThunk(project));
        await dispatch(addProject(project))
        await dispatch(fetchProjectsThunk());
      }
      setModalOpen(false);
      dispatch(setCurrentProject(null));
    } catch (error) {
      console.error("Failed to update project:", error.message);
    }
  }

  const handleDelete = async (project) => {
    try {
      await dispatch(deleteProjectThunk(project.id));
      await dispatch(removeProject(project.id))
      await dispatch(fetchProjectsThunk());
      await dispatch(setCurrentProject(null));
    } catch (error) {
      console.error("Failed to delete project:", error.message);
    }
  }

  return (
    <div>

      <div className="flex justify-end text-red-500 mb-2">
        <Link to={"/"} onClick={() => sessionStorage.clear()}>Logout</Link>
      </div>

      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-md mb-4"
        data-testid="add-project-button"
        onClick={handleAddClick}>
        Add Project
      </button>

      <div>

        <div>
          {loading && projects.length === 0 && <CircularProgress className="mt-2" role="progressbar" />}
        </div>

        {projects.length !== 0 ? (
          projects.map((project, index) => (
            <Project key={`${project.id}-${index}`} project={project} handleEditClick={() => handleEditClick(project)} handleDeleteClick={() => handleDeleteClick(project)} />
          ))

        ) : (
          <p className="text-white">No projects available.</p>
        )
        }
      </div>
      <div>
        {
          deleteConfirmationOpen && (
            <Modal open={deleteConfirmationOpen} onClose={() => setDeleteConfirmationOpen(false)}>
              <div className="bg-white p-6 rounded-md shadow-md fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <h2 className="text-lg font-semibold text-center mb-4">Confirm Deletion</h2>
                <p className="mb-4">Are you sure you want to delete the project "{currentProject.title}"?</p>
                <div className="flex justify-center">
                  <button
                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md mr-2"
                    onClick={() => setDeleteConfirmationOpen(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded-md"
                    onClick={() => {
                      setDeleteConfirmationOpen(false);
                      handleDelete(currentProject);
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </Modal>
          )
        }
      </div>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <AddProject project={currentProject || {}} onSave={handleSave} editing={isEditing} />
      </Modal>
    </div>
  );
}

export default Feed;
