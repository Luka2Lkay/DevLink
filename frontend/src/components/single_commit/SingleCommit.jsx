

function SingleCommit({author, date, message, sha, url}) {
  return (
   <div className="max-w-sm mx-auto bg-white rounded-xl shadow-lg overflow-hidden md:max-w-2xl transform hover:scale-[1.02] transition duration-3000 ease-in-out mb-2">
    <div className="p-6">
        <p className="mt-2">Author: {author}</p>
        <p className="mt-2">Date: {date}</p>
        <p className="mt-2">Message: {message}</p>
        <p className="mt-2">Sha: {sha}</p>
        <p className="mt-2">Url: {url}</p>
    </div>
    </div>
  )
}

export default SingleCommit