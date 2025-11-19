import Navigation from "../navigation/Navigation";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchProjectCommitsThunk } from "../../state/thunks/project_thunk";
import { useParams } from "react-router-dom";

function Commits() {
  const dispatch = useDispatch();
  const {id}  = useParams();

  useEffect(() => {
    dispatch(fetchProjectCommitsThunk(id));
  }, []);

  return (
    <div>
      <Navigation />
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Commits Component</h1>
        <p>This is the Commits component placeholder.</p>
      </div>
    </div>
  );
}

export default Commits;
