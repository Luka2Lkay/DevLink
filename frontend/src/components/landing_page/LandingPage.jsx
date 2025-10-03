import { FaClipboardList } from "react-icons/fa6";
import { FcCollaboration } from "react-icons/fc";
import { FaGithub } from "react-icons/fa6";
import { IoIosPeople } from "react-icons/io";
import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <div>
      <nav className="mb-10">
        <div className="flex items-center justify-between">
          <img
            src="https://i.postimg.cc/wxSVR0jG/logo.png"
            className="rounded-sm w-10 sm:w-15"
            alt="logo"
          />
          <div className="justify-end">
            <Link to={"/login"} className="mr-5 text-base text-white hover:text-primary-variant hover:transition sm:text-xl duration-200 transition-colors ease-in-out font-semibold">
              Login
            </Link>
          </div>
        </div>
      </nav>

      <main>
        <article className="text-white">
          <h1 className="text-2xl font-semibold sm:text-3xl md:text-4xl lg:text-5xl">
            Build Your Portfolio. Grow Your Network. Land Your First Dev Job.
          </h1>
          <p className="text-lg p-2 text-light sm:text-xl md:text-2xl mt-5">
            Devlink is the all-in-one platform for early-career developers to
            showcase their work, collaborate on real projects, and connect with
            other developers.
          </p>
        </article>

        <article className="mt-10">
          <h2 className="text-2xl text-white">Key Features</h2>
          <ul className="grid sm:grid-cols-4 sm:p-2 text-left text-white mt-2 gap-5">
            <li>
              <span className="text-primary-variant">
                <strong>
                  <FaClipboardList size={30} />
                  Project Management, Simplified:
                </strong>
              </span>{" "}
              Organize your projects and ideas in one place. No more scattered
              files—just a clean, professional portfolio.
            </li>
            <li>
              <span className="text-primary-variant">
                <strong>
                  <FcCollaboration size={30} />
                  Real-Time Teamwork:
                </strong>
              </span>{" "}
              Work with other developers in a secure, shared environment.
              Practice your collaboration skills and build something bigger than
              yourself.
            </li>
            <li>
              <span className="text-primary-variant">
                <strong>
                  <FaGithub size={30} />
                  Automatic Proof of Work:
                </strong>
              </span>{" "}
              Connect your GitHub to instantly display your activity. Show
              employers you’re serious about your craft.
            </li>
            <li>
              <span className="text-primary-variant">
                <strong>
                  <IoIosPeople size={30} />
                  Find Your People:
                </strong>
              </span>{" "}
              Connect with a community of other early-career developers who are
              facing the same challenges. Share insights and support each other.
            </li>
          </ul>

          <button className="text-white mt-5 bg-primary p-2 rounded-lg cursor-pointer hover:bg-primary-variant">
            Start Building Your Future
          </button>
        </article>
      </main>

      <footer className="text-white mt-5">
        <small>&copy; Lukhanyo Matshebelele {new Date().getFullYear()}</small>
      </footer>
    </div>
  );
}

export default LandingPage;
