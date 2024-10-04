// pages/NotFound.js
import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <div className=" text-center">
      <h1 className="text-2xl font-bold mb-4">404 - Page Not Found</h1>
      <p>The page you're looking for doesn't exist.</p>
      <Link className="text-blue-500" to="/">
        Go back to the homepage
      </Link>
    </div>
  );
}

export default NotFoundPage;
