import { useEffect, useState } from "react";
import Project from "../project/Project";
import { useDispatch, useSelector } from "react-redux";
import { fetchProjects } from "../../state/thunk/project_thunk.js";
import { selectProjects } from "../../state/reducers/project_slice.js";
import { Link } from "react-router-dom";

function Feed() {
  const dispatch = useDispatch();

  const projects = useSelector(selectProjects);

  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);

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
          <Project key={project.id} project={project} />
        ))
      )
      }
    </div>
  );
}

export default Feed;
