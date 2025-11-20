import { useEffect, useState } from "react";
import Project from "../project/Project.jsx";
import AddProject from "../add_project/AddProject.jsx";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProjectsThunk,
  updateProjectThunk,
  deleteProjectThunk,
  addProjectThunk,
} from "../../state/thunks/project_thunk.js";
import {
  selectProjects,
  selectCurrentProject,
  selectLoading,
  setCurrentProject,
  addProject,
  removeProject,
  updateProject,
  setErrorMessage,
  selectErrorMessage,
} from "../../state/reducers/project_slice.js";
import { useNavigate } from "react-router-dom";
import Navigation from "../navigation/Navigation.jsx";
import Modal from "@mui/material/Modal";
import CircularProgress from "@mui/material/CircularProgress";

function Feed() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const projects = useSelector(selectProjects);
  const currentProject = useSelector(selectCurrentProject);
  const errorMessage = useSelector(selectErrorMessage);
  const loading = useSelector(selectLoading);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const isLoggedIn = sessionStorage.getItem("user") !== null;
    if (!isLoggedIn) {
      navigate("/login");
    } else {
      dispatch(fetchProjectsThunk());
    }
  }, [dispatch]);

  const handleEditClick = (project) => {
    dispatch(setCurrentProject(project));
    setIsEditing(true);
    setModalOpen(true);
  };

  const handleDeleteClick = (project) => {
    dispatch(setCurrentProject(project));
    setDeleteConfirmationOpen(true);
  };

  const handleAddClick = () => {
    setModalOpen(true);
    setIsEditing(false);
    dispatch(setCurrentProject(null));
  };

  const handleInviteClick = (projectId) => {
    navigate(`/invite-a-contributor/${projectId}`);
  };

  const handleSave = async (project) => {
    try {
      if (project.id) {
        dispatch(updateProjectThunk(project));
        dispatch(updateProject(project));
        await dispatch(fetchProjectsThunk());
      } else {
        const result = await dispatch(addProjectThunk(project));
        dispatch(addProject(project));
        await dispatch(fetchProjectsThunk());

        if (result.payload) {
          await dispatch(setErrorMessage(result.payload));
          console.log("errorMessage:", result);
          return;
        }
      }

      setModalOpen(false);
      dispatch(setCurrentProject(null));
    } catch (error) {
      console.error("Failed to save/update project:", error.message);
    }
  };

  const handleDelete = async (project) => {
    try {
      await dispatch(deleteProjectThunk(project.id));
      await dispatch(removeProject(project.id));
      await dispatch(fetchProjectsThunk());
      await dispatch(setCurrentProject(null));
    } catch (error) {
      console.error("Failed to delete project:", error.message);
    }
  };

  return (
    <div>
      <Navigation />

      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-md mb-4"
        data-testid="add-project-button"
        onClick={handleAddClick}
      >
        Add Project
      </button>

      <div>
        {loading ? (
          <CircularProgress className="mt-2" role="progressbar" />
        ) : projects.length > 0 ? (
          projects.map((project) => (
            <Project
              key={`${project.id}`}
              project={project}
              handleEditClick={() => handleEditClick(project)}
              handleDeleteClick={() => handleDeleteClick(project)}
              handleInviteClick={() => handleInviteClick(project.id)}
            />
          ))
        ) : (
          <p className="text-white">No projects available!</p>
        )}
      </div>
      <div>
        {deleteConfirmationOpen && (
          <Modal
            open={deleteConfirmationOpen}
            onClose={() => setDeleteConfirmationOpen(false)}
          >
            <div className="bg-white p-6 rounded-md shadow-md fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <h2 className="text-lg font-semibold text-center mb-4">
                Confirm Deletion
              </h2>
              <p className="mb-4">
                Are you sure you want to delete the project "
                {currentProject.title}"?
              </p>
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
        )}
      </div>

      <div>
        <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
          <AddProject
            project={currentProject || {}}
            onSave={handleSave}
            editing={isEditing}
            errorMessage={errorMessage}
          />
        </Modal>
      </div>
    </div>
  );
}

export default Feed;
