import Navigation from "../navigation/Navigation";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchProjectCommitsThunk } from "../../state/thunks/project_thunk";
import { useParams } from "react-router-dom";
import SingleCommit from "../single_commit/SingleCommit";

function Commits() {
  const dispatch = useDispatch();
  const { id } = useParams();

  const [commits, setCommits] = useState([]);

  useEffect(() => {
    setCommits(dispatch(fetchProjectCommitsThunk(id)));
  }, [dispatch]);

  return (
    <div>
      <Navigation />
      <div className="p-4">
        <h1 className="text-2xl text-white font-bold mb-4">Commits</h1>
        {commits && commits.length > 0 ? (
          commits.map((commit) => (
            <SingleCommit
              author={commit.author}
              date={commit.date.split(":")[0]}
              message={commit.message}
              sha={commit.sha}
              url={commit.url}
              key={commit.sha}
            />
          ))
        ) : (
          <p className="text-white">No commits available for this project.</p>
        )}
      </div>
    </div>
  );
}

export default Commits;
