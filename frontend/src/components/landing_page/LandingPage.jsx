

function LandingPage() {
  return (
    <div className="bg-gray-900 h-full p-4">
      <nav>
        <div className="flex items-center justify-between">
          <img src="https://i.postimg.cc/wxSVR0jG/logo.png" className="rounded-sm" width="50" alt="logo" />
          <div className="justify-end text-white hover:text-blue-500"><a href="">Login</a></div>
        </div>

        <main className="border-red-500 m-10">
          <h1 className="text-3xl">Build Your Portfolio. Grow Your Network. Land Your First Dev Job.</h1>
        </main>
      </nav>
    </div>
  )
}

export default LandingPage