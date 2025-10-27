import { useEffect, useState } from "react";
import Project from "../project/Project";
import AddProject from "../add_project/AddProject.jsx";
import { useDispatch, useSelector } from "react-redux";
import { fetchProjectsThunk, updateProjectThunk, deleteProjectThunk } from "../../state/thunk/project_thunk.js";
import { selectProjects, selectCurrentProject, setCurrentProject } from "../../state/reducers/project_slice.js";
import { Link } from "react-router-dom";
import Modal from "@mui/material/Modal";

function Feed() {
  const dispatch = useDispatch();

  const projects = useSelector(selectProjects);
  const currentProject = useSelector(selectCurrentProject);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchProjectsThunk());
  }, [dispatch]);

  const handleEditClick = (project) => {
    dispatch(setCurrentProject(project));
    setModalOpen(true);
  }

  const handleDeleteClick = (project) => {
    dispatch(setCurrentProject(project));
    setDeleteConfirmationOpen(true);
  }

  const handleSave = async (project) => {
    try {
      if (project.id) {
        await dispatch(updateProjectThunk(project));
        await dispatch(fetchProjectsThunk());
        await dispatch(setCurrentProject(null));
      } else {
        // New project, add logic
        // dispatch(addProjectThunk(payload));
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

      <p className="text-white mb-4">Welcome to your project dashboard! Here you can find all your projects and collaborate with your team.</p>

      {projects.length === 0 ? (
        <p className="text-white">No projects available.</p>
      ) : (
        projects.map((project) => (
          <Project key={project.id} project={project} handleEditClick={() => handleEditClick(project)} handleDeleteClick={() => handleDeleteClick(project)} />
        ))
      )
      }

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

      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <AddProject project={currentProject || {}} onSave={handleSave} />
      </Modal>
    </div>
  );
}

export default Feed;
