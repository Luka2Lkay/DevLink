

function SingleCommit({author, date, message, sha, url}) {
  return (
   <div className="max-w-sm mx-auto bg-white rounded-xl shadow-lg overflow-hidden text-ellipsis md:max-w-2xl transform hover:scale-[1.02] transition duration-3000 ease-in-out mb-2">
    <div className="p-6">
        <p className="mt-2"><span className="text-semibold">Author</span>: {author}</p>
        <p className="mt-2"><span className="text-semibold">Date</span>: {date}</p>
        <p className="mt-2"><span className="text-semibold">Message</span>: {message}</p>
        <p className="mt-2"><span className="text-semibold">Sha</span>: {sha}</p>
        <p className="mt-2"><span className="text-semibold">Url</span>: {url}</p>
    </div>
    </div>
  )
}

export default SingleCommit