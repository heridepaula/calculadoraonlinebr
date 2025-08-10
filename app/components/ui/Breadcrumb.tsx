import { Link } from "@remix-run/react";
import { ReactNode } from "react";

interface BreadcrumbProps {
  children: ReactNode;
}

interface BreadcrumbItemProps {
  href?: string;
  children: ReactNode;
  isLast?: boolean;
}

const Breadcrumb = ({ children }: BreadcrumbProps) => {
  return (
    <nav aria-label="Navegação estrutural" className="mb-6">
      <ol className="flex items-center space-x-2 text-sm text-text-secondary-dark">
        {children}
      </ol>
    </nav>
  );
};

const BreadcrumbItem = ({ href, children, isLast = false }: BreadcrumbItemProps) => {
  return (
    <li className="flex items-center">
      {href && !isLast ? (
        <Link
          to={href}
          className="duration-200 hover:text-primary-blue-dark"
        >
          {children}
        </Link>
      ) : (
        <span className={isLast ? "font-medium text-text-primary-dark" : ""}>
          {children}
        </span>
      )}
      {!isLast && (
        <svg
          className="ml-2 h-4 w-4 text-text-secondary-dark"
          fill="currentColor"
          viewBox="0 0 20 20"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
            clipRule="evenodd"
          />
        </svg>
      )}
    </li>
  );
};

export { Breadcrumb, BreadcrumbItem };
