function Project({ title, description, owner, contributors = [] }) {
  return (
    <div className="max-w-sm mx-auto bg-white rounded-xl shadow-lg overflow-hidden md:max-w-2xl transform hover:scale-[1.02] transition duration-3000 ease-in-out">
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {title || "Project Title"}
        </h2>

        <p className="mt-2 text-gray-700 text-sm">
          {description ||
            "Project description goes here. This is a brief overview of what the project is about."}
        </p>

        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex items-center mb-3">
            <span className="text-sx font-semibold uppercase tracking-wider text-indigo-600 mr-2">
              Owner:
            </span>
            <span className="text-sm font-medium text-gray-700">
              {owner || "Owner Name"}
            </span>
          </div>

          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600 block mb-2">
              Collaborators:
            </span>
            <div className="flex -space-x-2 overflow-hidden"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Project;
