import Navigation from "../navigation/Navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCommits,
  selectLoading,
} from "../../state/reducers/commit_slice.js";
import { fetchProjectCommitsThunk } from "../../state/thunks/commit_thunk.js";
import { useParams } from "react-router-dom";
import SingleCommit from "../single_commit/SingleCommit";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";

function Commits() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  const commits = useSelector(selectCommits);
  const loading = useSelector(selectLoading);

  useEffect(() => {
    const isLoggedIn = sessionStorage.getItem("user");

    if (!isLoggedIn) {
      navigate("/login");
    } else {
      dispatch(fetchProjectCommitsThunk(id));
      console.log("Dispatched fetchProjectCommitsThunk for project ID:", id);
      console.log("Current commits state:", commits);
      console.log("Current loading state:", loading);
    }
  }, [dispatch]);

  return (
    <div>
      <Navigation />
      <div className="p-4">
        <h1 className="text-2xl text-white font-bold mb-4">Commits</h1>
        {/* 
        {loading ? (
          <CircularProgress role="progressbar" />
        ) : commits && commits.length > 0 ? (
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
        )} */}
      </div>
    </div>
  );
}

export default Commits;
