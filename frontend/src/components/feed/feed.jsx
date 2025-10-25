import { useEffect, useState } from "react";
import Project from "../project/Project";
import { useDispatch, useSelector } from "react-redux";
import { fetchProjects } from "../../state/thunk/project_thunk.js";
import { selectProjects } from "../../state/reducers/project_slice.js";

function Feed() {
  const dispatch = useDispatch();

  const projects = useSelector(selectProjects);

  useEffect(() => {
    dispatch(fetchProjects());

    console.log(projects);

  }, [dispatch]);

  return (
    <div>
      <h1 className="text-white">Dashboard</h1>

      {projects.length === 0 ? (
        <p className="text-white">No projects available.</p>
      ) : (
        projects.map((project) => (
          <Project key={project.id} title={project.title} owner={project.owner.name} description={project.description} collaborators={project.collaborators} />
        ))
      )
      }
    </div>
  );
}

export default Feed;
