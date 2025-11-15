import { v4 as uuidv4 } from 'uuid';
import Collaborator from '../collaborator/Collaborator';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useState } from 'react';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

function Project({ project, handleEditClick = () => { }, handleDeleteClick = () => { }, handleInviteClick = () => { } }) {
  const [visible, setVisible] = useState("hidden");

  return (
    <div className="max-w-sm mx-auto bg-white rounded-xl shadow-lg overflow-hidden md:max-w-2xl transform hover:scale-[1.02] transition duration-3000 ease-in-out mb-2">
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {project.title || "Project Title"}
        </h2>

        <p className="mt-2 text-gray-700 text-sm">
          {project.description ||
            "Project description goes here. This is a brief overview of what the project is about."}
        </p>

        <div className="mt-4 pt-4 border-t border-gray-200">
          <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600">
            Owner:
          </span>
          <div className='mb-2'>
            <span className="text-sm font-medium text-gray-700">
              {project.owner.name || "Owner Name"}
            </span>
          </div>

          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600 block mb-2">
              Collaborators:
            </span>
            <div className="flex -space-x-2 overflow-hidden">
              {project.collaborators && project.collaborators.length === 0 ? (
                <span className="w-full text-sm text-gray-500 flex justify-center items-center">No collaborators</span>
              ) : (
                project.collaborators && project.collaborators.map((collaborator) => (
                  <Collaborator key={uuidv4()} initials={collaborator.name} />
                ))
              )}
            </div>
          </div>
          <div className='flex flex-col justify-end'>

            {project && sessionStorage.getItem("user") && (project.owner._id === JSON.parse(sessionStorage.getItem("user")).userId) && (
              <>
                <MoreVertIcon onClick={(() => visible === '' ? setVisible('hidden') : setVisible(''))} className="text-gray-600 float-right mb-2 mt-2 cursor-pointer" />
                <button
                  type="button"
                  onClick={handleEditClick}
                  className={`p-2 ${visible} rounded-md w-16 bg-white hover:bg-gray-50 cursor-pointer`}
                >
                  <EditIcon sx={{ fontSize: 20 }} className="text-gray-600 hover:text-blue-500" />
                </button>

                <button type="button" onClick={handleInviteClick} className={`p-2 ${visible} rounded-md w-16 bg-white hover:bg-gray-50 cursor-pointer`}>
                  <PersonAddIcon sx={{ fontSize: 20 }} className="text-gray-600 hover:text-blue-500" />
                </button>

                <button
                  type="button"
                  onClick={handleDeleteClick}
                  className={`p-2 ${visible} rounded-md w-16 bg-white hover:bg-gray-50 cursor-pointer`}
                >
                  <DeleteIcon sx={{ fontSize: 20 }} className="text-red-500 hover:text-red-700" />
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Project;
